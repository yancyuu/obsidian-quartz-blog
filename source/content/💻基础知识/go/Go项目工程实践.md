---
tags:
  - basic-knowledge
  - kb/programming/go
  - kb/programming/go/engineering
  - go
  - testing
---

<!-- markdownlint-disable MD013 -->

# Go 项目工程实践

> 一句话定义：可维护的 Go 服务依靠小接口、显式依赖、Context 超时、结构化日志、Race 检测、性能剖析、健康检查和优雅退出，而不是复杂框架。

## 一、目录与包设计

```text
project/
├── cmd/api/                # 可执行程序入口
├── internal/               # 项目内部包
│   ├── todo/
│   ├── config/
│   └── platform/
├── migrations/
├── go.mod
├── go.sum
└── Dockerfile
```

原则：

- `main` 只负责读取配置、组装依赖、启动和退出；
- 包名短且表达职责，不用 `utils`、`common` 收集所有代码；
- 接口由使用方定义，先有替换需求再抽象；
- 避免循环依赖，通过职责拆分解决；
- 不为了“标准目录”创建空层级。

## 二、配置

项目初期可直接读取环境变量，但要集中校验：

```go
type Config struct {
    Address     string
    DatabaseURL string
}

func LoadConfig() (Config, error) {
    cfg := Config{
        Address:     envOrDefault("HTTP_ADDRESS", ":8080"),
        DatabaseURL: os.Getenv("DATABASE_URL"),
    }
    if cfg.DatabaseURL == "" {
        return Config{}, errors.New("DATABASE_URL is required")
    }
    return cfg, nil
}
```

不要在业务包中到处调用 `os.Getenv`。配置缺失应尽早失败，Secret 不写进日志。

## 三、Context 与超时

```go
func (s *Service) Create(ctx context.Context, title string) (Todo, error) {
    return s.repo.Create(ctx, title)
}
```

规则：

- `ctx` 通常是第一个参数；
- 不把 Context 存进长期结构体；
- HTTP 请求使用 `r.Context()`；
- 数据库和外部 HTTP 调用使用支持 Context 的 API；
- 调用者决定截止时间，底层遵守取消；
- 创建 `WithCancel/WithTimeout` 后调用 `cancel()`。

超时要分层：连接超时、响应头超时、单次尝试超时、总请求超时。无脑重试可能放大故障。

## 四、HTTP Client 必须复用

```go
client := &http.Client{
    Timeout: 5 * time.Second,
    Transport: &http.Transport{
        MaxIdleConns:        100,
        MaxIdleConnsPerHost: 20,
        IdleConnTimeout:     90 * time.Second,
    },
}
```

不要每个请求创建新 Client；这会失去连接复用。读取响应后记得关闭 Body：

```go
resp, err := client.Do(req)
if err != nil { return err }
defer resp.Body.Close()
```

## 五、结构化日志

标准库 `log/slog` 已足够开始项目：

```go
logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
logger.InfoContext(ctx, "todo created",
    "todo_id", todo.ID,
    "duration_ms", duration.Milliseconds(),
)
```

不要记录密码、Token、完整 Cookie 和敏感正文。错误在最能决定处理方式的边界记录一次，避免每层重复日志。

## 六、Table-driven Test

```go
func TestValidateTitle(t *testing.T) {
    tests := []struct {
        name    string
        title   string
        wantErr bool
    }{
        {"valid", "learn go", false},
        {"blank", "   ", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := validateTitle(tt.title)
            if (err != nil) != tt.wantErr {
                t.Fatalf("validateTitle() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}
```

HTTP 测试使用 `httptest`：

```go
req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
rec := httptest.NewRecorder()
handler.ServeHTTP(rec, req)

if rec.Code != http.StatusNoContent {
    t.Fatalf("status = %d", rec.Code)
}
```

常用命令：

```bash
go test ./...
go test -race ./...
go test -cover ./...
go test -bench=. -benchmem ./...
```

Race Detector 只能发现本次执行路径触发的数据竞争，不等于证明程序没有竞争。

## 七、并发设计检查表

启动 Goroutine 前回答：

1. 谁拥有它？
2. 什么时候退出？
3. 如何收到取消信号？
4. 错误返回给谁？
5. Channel 由谁关闭？
6. 如果消费者变慢，会阻塞、丢弃还是施加背压？

常见规则：

- 发送方负责关闭 Channel；接收方通常不关闭；
- 不关闭 Channel 也不一定泄漏，只有接收方依赖关闭信号时才必须关闭；
- `sync.WaitGroup` 等待任务结束，但不传播错误；
- 有错误与取消需求时可用 `errgroup.WithContext`；
- 共享计数使用 Mutex 或 Atomic，优先选更容易证明正确的方案。

## 八、优雅退出

```go
ctx, stop := signal.NotifyContext(context.Background(),
    os.Interrupt, syscall.SIGTERM,
)
defer stop()

go func() {
    if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        logger.Error("http server failed", "error", err)
        stop()
    }
}()

<-ctx.Done()

shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
if err := server.Shutdown(shutdownCtx); err != nil {
    logger.Error("graceful shutdown failed", "error", err)
}
```

退出顺序通常是：停止接流量 → 等待在途请求 → 停后台任务 → 关闭数据库和消息连接 → 进程退出。

## 九、pprof 与性能

排查顺序：先确认指标和瓶颈，再采样：

```go
import _ "net/http/pprof"

go func() {
    _ = http.ListenAndServe("127.0.0.1:6060", nil)
}()
```

```bash
go tool pprof http://127.0.0.1:6060/debug/pprof/profile?seconds=30
go tool pprof http://127.0.0.1:6060/debug/pprof/heap
go tool pprof http://127.0.0.1:6060/debug/pprof/goroutine
```

生产上不要把 pprof 无鉴权暴露到公网。关注：CPU 热点、分配热点、Goroutine 泄漏、锁竞争和阻塞。

## 十、数据库连接池

```go
db.SetMaxOpenConns(20)
db.SetMaxIdleConns(10)
db.SetConnMaxLifetime(30 * time.Minute)
db.SetConnMaxIdleTime(5 * time.Minute)
```

连接数按数据库容量和服务副本数共同规划。例如 10 个副本各开 50 个连接，数据库会看到最多约 500 个连接。还要监控：等待连接次数、等待时间、连接使用率和慢查询。

## 十一、Docker 化

```dockerfile
FROM golang:1.24 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /out/api /api
EXPOSE 8080
ENTRYPOINT ["/api"]
```

> 构建镜像的 Go 版本应与项目 `go.mod` 对齐；示例版本不是“永远最新”的承诺。

## 十二、上线检查表

- [ ] `go fmt ./...`、`go vet ./...`、`go test ./...` 通过；
- [ ] 关键并发测试运行 `go test -race ./...`；
- [ ] HTTP Server 和 Client 都配置超时；
- [ ] Goroutine 有清晰退出路径；
- [ ] 数据库连接池按副本数规划；
- [ ] 请求体有大小限制；
- [ ] 健康检查区分 Liveness 与 Readiness；
- [ ] 日志、指标、Trace 能关联；
- [ ] pprof 不暴露公网；
- [ ] 收到 SIGTERM 能在期限内优雅退出。

## 十三、常见排障顺序

```text
错误率与延迟
→ Trace 和下游依赖
→ Goroutine 数量与堆栈
→ CPU / Heap / Allocation pprof
→ Mutex / Block Profile
→ GC 与内存限制
→ 最近发布和配置变化
```

## 相关笔记

- [Go知识索引](Go知识索引.md)
- [Go-Web项目实战](Go-Web项目实战.md)
- [可观测性与线上排障](../运维/可观测性与线上排障.md)
- [CI-CD与发布策略](../运维/CI-CD与发布策略.md)

## 参考

- [Go Blog · Pipelines and Cancellation](https://go.dev/blog/pipelines)
- [Go Race Detector](https://go.dev/doc/articles/race_detector)
- [Diagnostics](https://go.dev/doc/diagnostics)
- [net/http Server.Shutdown](https://pkg.go.dev/net/http#Server.Shutdown)
- [Managing Connections](https://go.dev/doc/database/manage-connections)
