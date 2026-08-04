---
tags:
  - basic-knowledge
  - kb/programming/java
  - kb/programming/java/basics
  - java
---

# Java 快速入门

> 一句话定义：Java 是静态类型、编译为 JVM 字节码的语言。项目开发先掌握类型、类、集合、异常、接口和 Maven，其他机制在遇到实际问题时再深入。

## 一、准备环境

推荐使用 Java 21 LTS，并确认：

```bash
java -version
javac -version
mvn -version
```

最小程序：

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}
```

```bash
javac Main.java
java Main
```

实际项目通常交给 Maven 编译，不手动执行 `javac`。

## 二、必须掌握的语法

### 2.1 变量、基本类型与包装类型

```java
int count = 3;
long total = 100L;
double price = 19.9;
boolean active = true;
String name = "todo";
```

| 基本类型  | 包装类型  | 注意点                              |
| --------- | --------- | ----------------------------------- |
| `int`     | `Integer` | 包装类型可以为 `null`，拆箱可能 NPE |
| `long`    | `Long`    | 字面量常加 `L`                      |
| `double`  | `Double`  | 金额不要直接用浮点数                |
| `boolean` | `Boolean` | 三态字段要明确 `null` 语义          |

金额使用 `BigDecimal`：

```java
BigDecimal amount = new BigDecimal("19.90");
BigDecimal total = amount.multiply(BigDecimal.valueOf(3));
```

### 2.2 控制流

```java
if (count > 0) {
    System.out.println("has items");
}

for (int i = 0; i < count; i++) {
    System.out.println(i);
}

for (String item : List.of("a", "b")) {
    System.out.println(item);
}
```

现代 Java 的 `switch` 可以返回值：

```java
String label = switch (status) {
    case "OPEN" -> "进行中";
    case "DONE" -> "已完成";
    default -> "未知";
};
```

## 三、类、record 与接口

### 3.1 普通类

```java
public class Todo {
    private final long id;
    private String title;
    private boolean completed;

    public Todo(long id, String title) {
        this.id = id;
        this.title = title;
    }

    public void complete() {
        this.completed = true;
    }

    public long getId() { return id; }
    public String getTitle() { return title; }
    public boolean isCompleted() { return completed; }
}
```

### 3.2 record

只承载数据的 DTO 优先考虑 `record`：

```java
public record CreateTodoRequest(String title) {}
public record TodoResponse(long id, String title, boolean completed) {}
```

`record` 自动生成构造器、访问器、`equals`、`hashCode` 和 `toString`。它适合不可变数据载体，不适合所有领域实体。

### 3.3 接口与依赖倒置

```java
public interface TodoRepository {
    Todo save(Todo todo);
    Optional<Todo> findById(long id);
}
```

Service 依赖接口而不是具体数据库实现，测试时可以替换成内存实现。

## 四、集合：项目中每天都会用

| 类型    | 常见实现     | 用途               |
| ------- | ------------ | ------------------ |
| `List`  | `ArrayList`  | 有序、允许重复     |
| `Set`   | `HashSet`    | 去重、快速判断存在 |
| `Map`   | `HashMap`    | Key-Value 查询     |
| `Queue` | `ArrayDeque` | 队列或栈           |

```java
List<String> names = new ArrayList<>();
names.add("Alice");

Map<Long, Todo> todos = new HashMap<>();
todos.put(todo.getId(), todo);
Todo found = todos.get(1L);
```

常用 Stream：

```java
List<String> doneTitles = todos.values().stream()
    .filter(Todo::isCompleted)
    .map(Todo::getTitle)
    .sorted()
    .toList();
```

不要为了“函数式”写过长 Stream。包含复杂分支、状态修改或难调试逻辑时，普通循环更清楚。

## 五、空值与异常

### 5.1 Optional

`Optional` 适合作为“查询可能不存在”的返回值：

```java
Todo todo = repository.findById(id)
    .orElseThrow(() -> new TodoNotFoundException(id));
```

不建议把 `Optional` 用作实体字段、DTO 字段或方法参数。

### 5.2 异常

```java
public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(long id) {
        super("todo not found: " + id);
    }
}
```

项目原则：

- 底层异常保留原始 `cause`；
- 不要 `catch (Exception)` 后吞掉；
- 可恢复错误在合适边界处理；
- Web 层统一把异常映射成稳定的错误响应。

## 六、泛型与 Lambda 够用版

```java
public static <T> T requireNonNull(T value, String name) {
    if (value == null) {
        throw new IllegalArgumentException(name + " must not be null");
    }
    return value;
}

Predicate<Todo> completed = Todo::isCompleted;
Function<Todo, String> toTitle = Todo::getTitle;
```

泛型提供编译期类型安全。先会使用 `List<T>`、`Map<K,V>` 和简单泛型方法，再学习通配符 `? extends T` / `? super T`。

## 七、Maven 最小认知

典型结构：

```text
project/
├── pom.xml
└── src/
    ├── main/java/
    ├── main/resources/
    └── test/java/
```

常用命令：

```bash
mvn test
mvn package
mvn spring-boot:run
java -jar target/app.jar
```

Maven 的核心是：依赖、插件和生命周期。不要手动复制 Jar 到项目里。

## 八、面试怎么答

### Java 是值传递还是引用传递？

Java 只有值传递。传对象时复制的是引用值，所以方法能修改同一对象，但给参数重新赋值不会改变调用方变量。

### `==`、`equals`、`hashCode` 的区别？

`==` 对引用类型比较对象身份；`equals` 表示逻辑相等；相等对象必须拥有相同 `hashCode`，否则在 `HashMap`、`HashSet` 中会出现错误行为。

### `ArrayList` 与 `LinkedList` 怎么选？

大多数场景选 `ArrayList`：缓存友好、随机访问快、尾部追加高效。只有明确需要大量中间节点插入删除且已经持有节点位置时，链表才可能合适。

## 九、常见坑

- 用 `==` 比较字符串；
- `Integer` 自动拆箱时遇到 `null`；
- 用 `double` 表示金额；
- 重写 `equals` 忘记重写 `hashCode`；
- 把可变对象作为 `HashMap` Key 后又修改参与哈希的字段；
- 捕获异常但不记录上下文；
- 在共享可变集合上并发读写。

## 相关笔记

- [Java知识索引](Java知识索引.md)
- [Spring-Boot项目实战](Spring-Boot项目实战.md)
- [Java项目工程实践](Java项目工程实践.md)
- [进程、线程、协程](../计算机原理/进程、线程、协程.md)

## 参考

- [Java Language Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Java Collections Framework](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/doc-files/coll-overview.html)
- [Maven in Five Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
