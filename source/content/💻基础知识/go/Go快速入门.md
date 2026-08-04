---
tags:
  - basic-knowledge
  - kb/programming/go
  - kb/programming/go/basics
  - go
---

# Go 快速入门

> 一句话定义：Go 是静态类型、编译型语言，强调简单语法、组合、显式错误和内建并发，适合 API、基础设施、CLI 和高并发网络服务。

## 一、准备环境

```bash
go version
mkdir todo-api && cd todo-api
go mod init example.com/todo-api
```

最小程序：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello Go")
}
```

```bash
go run .
go test ./...
go build ./...
go fmt ./...
go vet ./...
```

## 二、变量、函数与零值

```go
var count int          // 0
var name string        // ""
var active bool        // false
price := 19.9          // 函数内类型推断

func add(a, b int) int {
    return a + b
}
```

Go 倾向让零值可用，但要记住：

- nil slice 可读取和 `append`；
- nil map 可读取，写入会 panic；
- nil channel 的发送和接收会永久阻塞；
- 指针、接口、函数、Map、Slice、Channel 的零值是 `nil`。

## 三、数组、Slice 与 Map

### 3.1 Slice

Slice 可理解为“底层数组的一段视图”：

```text
pointer + len + cap
```

```go
items := []string{"a", "b"}
items = append(items, "c")
part := items[:2]
```

多个 slice 可能共享底层数组。`append` 容量不足时会分配新数组，因此不要依赖追加前后的共享关系。

复制使用 `copy`：

```go
cloned := make([]string, len(items))
copy(cloned, items)
```

### 3.2 Map

```go
users := map[int64]string{1: "Alice"}
name, ok := users[1]
if !ok {
    fmt.Println("not found")
}
delete(users, 1)
```

普通 map 不是并发安全容器。并发访问应通过单一 Goroutine、`sync.Mutex`、`sync.RWMutex` 或特定场景下的 `sync.Map` 管理。

## 四、结构体、方法和指针

```go
type Todo struct {
    ID        int64  `json:"id"`
    Title     string `json:"title"`
    Completed bool   `json:"completed"`
}

func (t *Todo) Complete() {
    t.Completed = true
}
```

选择接收者：

- 需要修改对象或结构体较大：指针接收者；
- 小型、不可变值类型：可以使用值接收者；
- 同一类型的方法尽量保持一致，不随意混用。

Go 只有值传递。传指针时复制的也是地址值。

## 五、接口与组合

接口由使用方定义，类型无需显式声明“实现了接口”：

```go
type TodoRepository interface {
    Save(ctx context.Context, todo Todo) (Todo, error)
    FindByID(ctx context.Context, id int64) (Todo, error)
}
```

```go
type TodoService struct {
    repo TodoRepository
}

func NewTodoService(repo TodoRepository) *TodoService {
    return &TodoService{repo: repo}
}
```

Go 倾向组合而不是深继承：

```go
type AuditFields struct {
    CreatedAt time.Time
    UpdatedAt time.Time
}

type Todo struct {
    AuditFields
    ID    int64
    Title string
}
```

接口应小而明确。不要一开始创建包含几十个方法的“万能 Repository”。

## 六、错误处理

```go
var ErrTodoNotFound = errors.New("todo not found")

func (s *TodoService) Get(ctx context.Context, id int64) (Todo, error) {
    todo, err := s.repo.FindByID(ctx, id)
    if err != nil {
        return Todo{}, fmt.Errorf("find todo %d: %w", id, err)
    }
    return todo, nil
}
```

判断错误链：

```go
if errors.Is(err, ErrTodoNotFound) {
    // 映射为 HTTP 404
}
```

规则：

- 处理或返回错误，不要静默忽略；
- 使用 `%w` 保留错误链；
- 给错误增加动作与对象上下文；
- 不通过错误字符串判断类型；
- panic 用于不可恢复的程序错误，不是普通业务分支。

## 七、defer 与资源释放

```go
rows, err := db.QueryContext(ctx, query)
if err != nil {
    return nil, err
}
defer rows.Close()
```

`defer` 在函数返回前按后进先出执行，适合关闭文件、连接结果集、解锁和记录耗时。资源成功获取后尽快注册 `defer`。

## 八、Goroutine、Channel 与 Context 够用版

```go
resultCh := make(chan Result, 1)

go func() {
    resultCh <- doWork()
}()

select {
case result := <-resultCh:
    fmt.Println(result)
case <-time.After(2 * time.Second):
    fmt.Println("timeout")
}
```

真实项目优先使用 `context.WithTimeout`：

```go
ctx, cancel := context.WithTimeout(parent, 2*time.Second)
defer cancel()

result, err := client.Call(ctx)
```

原则：

- `Context` 放第一个参数，不存进结构体；
- 创建取消函数后及时 `defer cancel()`；
- 启动 Goroutine 前先明确它如何结束；
- Channel 用来协调和转移所有权，Mutex 用来保护共享状态；
- 不要在库函数中随意创建永不退出的后台 Goroutine。

## 九、泛型够用版

```go
type Number interface {
    ~int | ~int64 | ~float64
}

func Sum[T Number](values []T) T {
    var total T
    for _, value := range values {
        total += value
    }
    return total
}
```

泛型适合容器、算法和重复的类型安全操作。业务流程只为少写几行而引入复杂约束，通常得不偿失。

## 十、面试怎么答

### `new` 与 `make` 的区别？

`new(T)` 分配零值并返回 `*T`；`make` 只初始化 slice、map、channel，返回类型本身。

### Slice 作为参数会发生什么？

传递的是 slice 描述符副本，但可能仍指向同一底层数组。修改已有元素可能影响调用方；`append` 是否影响取决于是否重新分配。

### Interface 为什么会出现“看起来 nil，但不等于 nil”？

接口值包含动态类型和动态值。只有两者都为空时接口才等于 `nil`；装入一个值为 nil 的具体指针后，动态类型仍存在。

## 十一、常见坑

- 循环或后台任务启动 Goroutine，却没有退出条件；
- 并发写普通 map；
- 忽略 `rows.Close()` 和 `rows.Err()`；
- 把 `Context` 存到长期对象中；
- 错误只返回 `err`，没有操作上下文；
- 把切片当成独立数组，忽略共享底层存储；
- 对接口返回带类型的 nil 指针；
- 滥用 Channel，导致流程比 Mutex 更难理解。

## 相关笔记

- [Go知识索引](Go知识索引.md)
- [Go-Web项目实战](Go-Web项目实战.md)
- [Go项目工程实践](Go项目工程实践.md)
- [进程、线程、协程](../计算机原理/进程、线程、协程.md)

## 参考

- [A Tour of Go](https://go.dev/tour/)
- [Effective Go](https://go.dev/doc/effective_go)
- [Go Memory Model](https://go.dev/ref/mem)
- [Go Blog · Context](https://go.dev/blog/context)
