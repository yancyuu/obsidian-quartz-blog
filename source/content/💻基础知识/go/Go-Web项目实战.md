---
tags:
  - basic-knowledge
  - kb/programming/go
  - kb/programming/go/web
  - go
  - rest-api
---

<!-- markdownlint-disable MD013 -->

# Go Web 项目实战

> 目标：使用 Go 标准库 `net/http` 创建任务清单 REST API，理解 Handler、Service、Repository、JSON、Context、数据库和错误映射。

## 一、创建项目

```bash
mkdir todo-api && cd todo-api
go mod init example.com/todo-api
mkdir -p cmd/api internal/todo migrations
```

建议结构：

```text
todo-api/
├── cmd/api/main.go
├── internal/todo/
│   ├── model.go
│   ├── service.go
│   ├── handler.go
│   └── postgres.go
├── migrations/001_create_todo.sql
├── go.mod
└── Dockerfile
```

`internal/` 下的包只能被其父目录树中的代码导入，适合放项目内部实现。

## 二、模型与接口

```go
// internal/todo/model.go
package todo

import (
    "context"
    "errors"
)

var ErrNotFound = errors.New("todo not found")

type Todo struct {
    ID        int64  `json:"id"`
    Title     string `json:"title"`
    Completed bool   `json:"completed"`
}

type Repository interface {
    Create(ctx context.Context, title string) (Todo, error)
    List(ctx context.Context) ([]Todo, error)
    Get(ctx context.Context, id int64) (Todo, error)
}
```

Repository 接口放在使用方附近。Service 不需要知道 PostgreSQL 的 SQL 细节。

## 三、Service

```go
// internal/todo/service.go
package todo

import (
    "context"
    "errors"
    "fmt"
    "strings"
)

var ErrInvalidTitle = errors.New("title must not be blank")

type Service struct {
    repo Repository
}

func NewService(repo Repository) *Service {
    return &Service{repo: repo}
}

func (s *Service) Create(ctx context.Context, title string) (Todo, error) {
    title = strings.TrimSpace(title)
    if title == "" {
        return Todo{}, ErrInvalidTitle
    }
    created, err := s.repo.Create(ctx, title)
    if err != nil {
        return Todo{}, fmt.Errorf("create todo: %w", err)
    }
    return created, nil
}

func (s *Service) List(ctx context.Context) ([]Todo, error) {
    items, err := s.repo.List(ctx)
    if err != nil {
        return nil, fmt.Errorf("list todos: %w", err)
    }
    return items, nil
}

func (s *Service) Get(ctx context.Context, id int64) (Todo, error) {
    item, err := s.repo.Get(ctx, id)
    if err != nil {
        return Todo{}, fmt.Errorf("get todo %d: %w", id, err)
    }
    return item, nil
}
```

## 四、HTTP Handler

Go 1.22+ 的 `ServeMux` 支持方法与路径参数：

```go
// internal/todo/handler.go
package todo

import (
    "encoding/json"
    "errors"
    "net/http"
    "strconv"
)

type Handler struct {
    service *Service
}

func NewHandler(service *Service) *Handler {
    return &Handler{service: service}
}

func (h *Handler) Register(mux *http.ServeMux) {
    mux.HandleFunc("POST /api/todos", h.create)
    mux.HandleFunc("GET /api/todos", h.list)
    mux.HandleFunc("GET /api/todos/{id}", h.get)
}

type createRequest struct {
    Title string `json:"title"`
}

type errorResponse struct {
    Code    string `json:"code"`
    Message string `json:"message"`
}

func (h *Handler) create(w http.ResponseWriter, r *http.Request) {
    var req createRequest
    decoder := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&req); err != nil {
        writeJSON(w, http.StatusBadRequest, errorResponse{"INVALID_JSON", "invalid request body"})
        return
    }

    created, err := h.service.Create(r.Context(), req.Title)
    if err != nil {
        if errors.Is(err, ErrInvalidTitle) {
            writeJSON(w, http.StatusBadRequest, errorResponse{"INVALID_TITLE", err.Error()})
            return
        }
        writeJSON(w, http.StatusInternalServerError, errorResponse{"INTERNAL", "internal error"})
        return
    }

    writeJSON(w, http.StatusCreated, created)
}

func (h *Handler) list(w http.ResponseWriter, r *http.Request) {
    items, err := h.service.List(r.Context())
    if err != nil {
        writeJSON(w, http.StatusInternalServerError, errorResponse{"INTERNAL", "internal error"})
        return
    }
    writeJSON(w, http.StatusOK, items)
}

func (h *Handler) get(w http.ResponseWriter, r *http.Request) {
    id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
    if err != nil || id <= 0 {
        writeJSON(w, http.StatusBadRequest, errorResponse{"INVALID_ID", "invalid id"})
        return
    }

    item, err := h.service.Get(r.Context(), id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            writeJSON(w, http.StatusNotFound, errorResponse{"TODO_NOT_FOUND", "todo not found"})
            return
        }
        writeJSON(w, http.StatusInternalServerError, errorResponse{"INTERNAL", "internal error"})
        return
    }
    writeJSON(w, http.StatusOK, item)
}

func writeJSON(w http.ResponseWriter, status int, value any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    _ = json.NewEncoder(w).Encode(value)
}
```

生产代码应记录编码失败，并通过中间件统一日志、Recover、Trace ID 和指标。

## 五、PostgreSQL Repository

安装 PostgreSQL Driver：

```bash
go get github.com/jackc/pgx/v5/stdlib
```

迁移脚本：

```sql
-- migrations/001_create_todo.sql
CREATE TABLE todo (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

本地可先直接执行：

```bash
psql "$DATABASE_URL" -f migrations/001_create_todo.sql
```

正式项目应接入 `golang-migrate`、Goose 等迁移工具，并在发布流程中记录迁移版本，不要让应用启动时无条件修改生产 Schema。

实现：

```go
// internal/todo/postgres.go
package todo

import (
    "context"
    "database/sql"
    "errors"
    "fmt"
)

type PostgresRepository struct {
    db *sql.DB
}

func NewPostgresRepository(db *sql.DB) *PostgresRepository {
    return &PostgresRepository{db: db}
}

func (r *PostgresRepository) Create(ctx context.Context, title string) (Todo, error) {
    const query = `
        INSERT INTO todo(title)
        VALUES ($1)
        RETURNING id, title, completed`

    var item Todo
    err := r.db.QueryRowContext(ctx, query, title).Scan(
        &item.ID, &item.Title, &item.Completed,
    )
    if err != nil {
        return Todo{}, fmt.Errorf("insert todo: %w", err)
    }
    return item, nil
}

func (r *PostgresRepository) List(ctx context.Context) ([]Todo, error) {
    rows, err := r.db.QueryContext(ctx, `
        SELECT id, title, completed
        FROM todo
        ORDER BY id DESC
        LIMIT 100`)
    if err != nil {
        return nil, fmt.Errorf("query todos: %w", err)
    }
    defer rows.Close()

    items := make([]Todo, 0)
    for rows.Next() {
        var item Todo
        if err := rows.Scan(&item.ID, &item.Title, &item.Completed); err != nil {
            return nil, fmt.Errorf("scan todo: %w", err)
        }
        items = append(items, item)
    }
    if err := rows.Err(); err != nil {
        return nil, fmt.Errorf("iterate todos: %w", err)
    }
    return items, nil
}

func (r *PostgresRepository) Get(ctx context.Context, id int64) (Todo, error) {
    var item Todo
    err := r.db.QueryRowContext(ctx, `
        SELECT id, title, completed FROM todo WHERE id = $1`, id,
    ).Scan(&item.ID, &item.Title, &item.Completed)
    if errors.Is(err, sql.ErrNoRows) {
        return Todo{}, ErrNotFound
    }
    if err != nil {
        return Todo{}, fmt.Errorf("query todo: %w", err)
    }
    return item, nil
}
```

`sql.DB` 是并发安全的连接池句柄，不是单个连接。必须设置最大连接数、空闲连接数和生命周期，并使它们与数据库容量匹配。

## 六、启动服务

```go
// cmd/api/main.go
package main

import (
    "context"
    "database/sql"
    "log/slog"
    "net/http"
    "os"
    "time"

    _ "github.com/jackc/pgx/v5/stdlib"
    "example.com/todo-api/internal/todo"
)

func main() {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        slog.Error("DATABASE_URL is required")
        os.Exit(1)
    }

    db, err := sql.Open("pgx", dsn)
    if err != nil {
        slog.Error("open database", "error", err)
        os.Exit(1)
    }
    defer db.Close()

    db.SetMaxOpenConns(20)
    db.SetMaxIdleConns(10)
    db.SetConnMaxLifetime(30 * time.Minute)

    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()
    if err := db.PingContext(ctx); err != nil {
        slog.Error("ping database", "error", err)
        os.Exit(1)
    }

    repo := todo.NewPostgresRepository(db)
    service := todo.NewService(repo)
    handler := todo.NewHandler(service)

    mux := http.NewServeMux()
    handler.Register(mux)
    mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
        w.WriteHeader(http.StatusNoContent)
    })

    server := &http.Server{
        Addr:              ":8080",
        Handler:           mux,
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout:       10 * time.Second,
        WriteTimeout:      15 * time.Second,
        IdleTimeout:       60 * time.Second,
    }

    slog.Info("server started", "address", server.Addr)
    if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        slog.Error("server stopped", "error", err)
        os.Exit(1)
    }
}
```

完整项目还要按 [Go项目工程实践](Go项目工程实践.md) 增加信号处理和优雅退出。

## 七、接口测试

```bash
DATABASE_URL='postgres://todo:todo@localhost:5432/todo?sslmode=disable' go run ./cmd/api

curl -X POST http://localhost:8080/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"title":"learn go"}'

curl http://localhost:8080/api/todos
```

## 八、下一步练习

1. 增加更新、删除和分页；
2. 为 Repository 写 PostgreSQL 集成测试；
3. 增加请求日志、Trace ID 和指标；
4. 增加用户身份与资源归属检查；
5. 为写接口增加幂等键或唯一业务键。

## 相关笔记

- [Go快速入门](Go快速入门.md)
- [Go项目工程实践](Go项目工程实践.md)
- [API设计与幂等](../计算机原理/API设计与幂等.md)
- [PostgreSQL连接池与事务](../postgresql/PostgreSQL连接池与事务.md)

## 参考

- [net/http](https://pkg.go.dev/net/http)
- [database/sql](https://pkg.go.dev/database/sql)
- [Go Wiki · SQLInterface](https://go.dev/wiki/SQLInterface)
- [pgx](https://github.com/jackc/pgx)
