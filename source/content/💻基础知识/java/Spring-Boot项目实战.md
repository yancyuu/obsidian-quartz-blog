---
tags:
  - basic-knowledge
  - kb/programming/java
  - kb/programming/java/spring-boot
  - spring-boot
  - rest-api
---

# Spring Boot 项目实战

> 目标：完成一个可运行的任务清单 REST API，理解 Controller、Service、Repository、校验、异常处理和数据库迁移的职责。

## 一、创建项目

打开 [Spring Initializr](https://start.spring.io/)，建议选择：

- Project：Maven；
- Language：Java；
- Java：21；
- 第一阶段 Dependencies：Spring Web、Validation、Actuator、Spring Boot Test。

先不要加入 JPA、PostgreSQL Driver 和 Flyway，否则在还没有数据库配置时，数据源自动配置可能导致内存版项目无法启动。生成后运行：

```bash
./mvnw spring-boot:run
curl http://localhost:8080/actuator/health
```

## 二、目录结构

```text
src/main/java/com/example/todo/
├── TodoApplication.java
├── todo/
│   ├── TodoController.java
│   ├── TodoService.java
│   ├── TodoRepository.java
│   ├── TodoEntity.java
│   └── TodoDto.java
└── common/
    └── GlobalExceptionHandler.java
```

分层原则：

| 层         | 职责               | 不应该做           |
| ---------- | ------------------ | ------------------ |
| Controller | HTTP、参数、状态码 | 写复杂业务和 SQL   |
| Service    | 业务规则、事务边界 | 依赖 HTTP 请求对象 |
| Repository | 数据访问           | 决定业务流程       |
| DTO        | API 输入输出       | 直接暴露数据库实体 |

## 三、先做内存版 API

### 3.1 DTO

```java
package com.example.todo.todo;

import jakarta.validation.constraints.NotBlank;

public final class TodoDto {
    private TodoDto() {}

    public record CreateRequest(
        @NotBlank(message = "title must not be blank") String title
    ) {}

    public record Response(long id, String title, boolean completed) {}
}
```

### 3.2 Service

```java
package com.example.todo.todo;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

@Service
public class TodoService {
    private final AtomicLong ids = new AtomicLong();
    private final Map<Long, TodoDto.Response> store = new ConcurrentHashMap<>();

    public TodoDto.Response create(String title) {
        long id = ids.incrementAndGet();
        var todo = new TodoDto.Response(id, title, false);
        store.put(id, todo);
        return todo;
    }

    public List<TodoDto.Response> list() {
        return store.values().stream().toList();
    }

    public TodoDto.Response get(long id) {
        var todo = store.get(id);
        if (todo == null) {
            throw new TodoNotFoundException(id);
        }
        return todo;
    }
}
```

### 3.3 Controller

```java
package com.example.todo.todo;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TodoDto.Response> create(
        @Valid @RequestBody TodoDto.CreateRequest request
    ) {
        var created = service.create(request.title());
        return ResponseEntity
            .created(URI.create("/api/todos/" + created.id()))
            .body(created);
    }

    @GetMapping
    public List<TodoDto.Response> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public TodoDto.Response get(@PathVariable long id) {
        return service.get(id);
    }
}
```

测试：

```bash
curl -X POST http://localhost:8080/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"title":"learn java"}'

curl http://localhost:8080/api/todos
```

## 四、统一错误响应

```java
package com.example.todo.todo;

public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(long id) {
        super("todo not found: " + id);
    }
}
```

```java
package com.example.todo.common;

import java.time.Instant;
import java.util.Map;

import com.example.todo.todo.TodoNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(TodoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> notFound(TodoNotFoundException ex) {
        return Map.of(
            "code", "TODO_NOT_FOUND",
            "message", ex.getMessage(),
            "timestamp", Instant.now().toString()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> invalid(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
            .findFirst()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .orElse("invalid request");
        return Map.of("code", "INVALID_ARGUMENT", "message", message);
    }
}
```

不要把异常堆栈和数据库错误原文直接返回给客户端。

## 五、接入 PostgreSQL

内存版 API 跑通后，再在 `pom.xml` 中加入 Spring Data JPA、PostgreSQL Driver 和 Flyway Migration。最简单的方法是重新使用 Spring Initializr 勾选这三个依赖，并把生成的依赖项合并到当前项目。

加入数据库依赖后，应先启动 PostgreSQL并配置连接，再启动应用。

### 5.1 配置

```yaml
# src/main/resources/application.yml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/todo}
    username: ${DB_USER:todo}
    password: ${DB_PASSWORD:todo}
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: validate
  flyway:
    enabled: true

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
```

生产环境不要把密码写死在 Git 中。

### 5.2 数据库迁移

```sql
-- src/main/resources/db/migration/V1__create_todo.sql
CREATE TABLE todo (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.3 Entity 与 Repository

```java
package com.example.todo.todo;

import jakarta.persistence.*;

@Entity
@Table(name = "todo")
public class TodoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false)
    private boolean completed;

    protected TodoEntity() {}

    public TodoEntity(String title) {
        this.title = title;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public boolean isCompleted() { return completed; }
}
```

```java
package com.example.todo.todo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {}
```

Service 改为依赖 `TodoRepository`，并把 Entity 转为 Response DTO。写操作需要明确事务边界：

```java
@Transactional
public TodoDto.Response create(String title) {
    TodoEntity saved = repository.save(new TodoEntity(title));
    return toResponse(saved);
}
```

## 六、必须写的测试

Controller 切片测试：

```java
@WebMvcTest(TodoController.class)
class TodoControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean TodoService service;

    @Test
    void rejectsBlankTitle() throws Exception {
        mvc.perform(post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"\"}"))
            .andExpect(status().isBadRequest());
    }
}
```

`@MockitoBean` 适用于较新的 Spring Framework / Spring Boot；旧版项目可能使用已经弃用的 `@MockBean`。以 Spring Initializr 生成项目中的测试依赖版本为准。

至少覆盖：正常创建、参数非法、资源不存在、数据库约束冲突。涉及 PostgreSQL 特性时，优先用 Testcontainers 做真实数据库集成测试，不要只依赖 H2 模拟。

## 七、`@Transactional` 高频坑

- 同一个对象内部自调用，可能绕过 Spring 代理；
- 默认主要对未捕获的运行时异常回滚；
- 事务中调用慢外部服务会长时间占用连接和锁；
- `open-in-view=false` 后要在事务内完成需要的关联加载；
- 不要为了“保险”给所有读方法加大事务。

## 八、下一步练习

1. 增加 `PUT /api/todos/{id}` 和 `DELETE`；
2. 列表增加分页与完成状态筛选；
3. 增加 `updated_at` 和乐观锁版本字段；
4. 使用 Testcontainers 跑 PostgreSQL 集成测试；
5. 增加用户身份后保证只能操作自己的任务。

## 相关笔记

- [Java快速入门](Java快速入门.md)
- [Java项目工程实践](Java项目工程实践.md)
- [API设计与幂等](../计算机原理/API设计与幂等.md)
- [PostgreSQL索引与锁](../postgresql/PostgreSQL索引与锁.md)

## 参考

- [Spring Boot Reference](https://docs.spring.io/spring-boot/reference/)
- [Spring Web MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/reference/)
- [Spring Transaction Management](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)
- [Flyway Documentation](https://documentation.red-gate.com/flyway)
