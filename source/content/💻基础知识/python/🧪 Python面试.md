---
tags:
  - basic-knowledge
  - backend
  - python
  - interview
  - interview-prep
  - learning-note
---

## 1️⃣ `type` 与元类（Metaclass）

**问题**：Python 中 `type` 与 `object` 是什么关系？如何使用元类自定义类的创建行为？为什么这样设计？

**答案**：

- `object` 是所有类的基类，`type` 是所有类的元类（类的类）。
    
- 所有类本质上都是 `type` 的实例，例如 `type(MyClass)` 是 `type`。
    
- `type` 既是一个类，也是一个元类，`type(object)` 返回 `<class 'type'>`。
    

**为什么这么做？**

- 这样设计是为了实现“万物皆对象”的统一模型，同时允许用户自定义类的创建逻辑。
    
- 使用元类可以在类创建前动态注入属性、方法或做校验。
    

**例子：**

```
class Meta(type):
    def __new__(cls, name, bases, dct):
        dct['hello'] = lambda self: f"Hello from {name}"
        return super().__new__(cls, name, bases, dct)

class A(metaclass=Meta):
    pass

assert hasattr(A, 'hello')

```
---

## 2️⃣ 可变类型 vs 不可变类型

**问题**：哪些类型是可变的？为什么有这种区分？在函数参数传递时有何影响？

**答案**：

- 不可变类型：`int`, `float`, `str`, `tuple`, `frozenset`
    
- 可变类型：`list`, `dict`, `set`, `bytearray`
    

**函数传参影响：**

- Python 中参数是通过对象引用传递（传对象的地址），但：
    
    - **不可变类型**：函数内部重新赋值会创建新对象（对外无影响）
        
    - **可变类型**：在函数内部修改会影响原对象
        

**为什么这么做？**

- 不可变对象可以安全地缓存、做为字典的 key、哈希使用，性能更高。
    
- 可变对象用于构建复杂结构（如列表、缓存等）更高效。
    

```
def foo(x):
    x += x  # 对不可变类型：生成新对象；对可变类型：原地修改
a = 1
foo(a); print(a)  # 1
b = [1]
foo(b); print(b)  # [1, 1]

```

## 3️⃣ `__init__` 和 `__new__`

**问题**：`__init__` 和 `__new__` 有什么区别？为什么 Python 要设计这两个阶段？

**答案**：

- `__new__` 是真正创建对象的方法，返回一个类的实例。
    
- `__init__` 是初始化该实例的方法，不返回对象。
    

```

class MyClass:     
	def __new__(cls, *args, **kwargs):         
		print("In __new__")         
		instance = super().__new__(cls)         
		return instance      
		
	def __init__(self, value):         
		print("In __init__")         
		self.value = value`
```

**为什么这么做？**

- 将“创建”和“初始化”分离是为了支持定制对象创建过程，例如：
    
    - 实现单例模式
        
    - 控制是否创建对象（如返回缓存）
        

---

## 4️⃣ 装饰器与闭包

**问题**：Python 装饰器是如何实现的？为什么要使用闭包？如何保持原函数元信息？

**答案**：
装饰器本质是一个高阶函数，接受函数返回新函数。使用闭包是为了在不修改原函数的情况下增加功能。**Python 的闭包（closure）本质上是函数对象+其创建时的自由变量环境的绑定**。自由变量（free variable）是指在内部函数中使用，但并非在该函数内定义的变量。**这些变量会被“捕获”并封存在闭包的`__closure__`属性中**，从而在函数外部也不会丢失。

```
import functools

def my_decorator(arg):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            print(f"Calling with {arg}")
            return fn(*args, **kwargs)
        return wrapper
    return decorator

```
**为什么这么做？**

- 闭包可以携带外部参数（如 `arg`）不丢失。
    
- 使用 `functools.wraps` 保留原函数名、注释等元信息，利于调试和文档生成。
    

---

## 5️⃣ 深拷贝 vs 浅拷贝

**问题**：Python 中 `copy.copy()` 和 `copy.deepcopy()` 有何区别？为什么区分？

**答案**：

- `copy.copy()` 只复制最外层对象（浅拷贝）
    
- `copy.deepcopy()` 递归复制所有嵌套对象（深拷贝）
    
```
import copy
a = [[1, 2], [3, 4]]
b = copy.copy(a)      # a 和 b 的子列表共享引用
c = copy.deepcopy(a)  # 完全独立的结构

```

**为什么这么做？**

- 提供灵活性，浅拷贝更高效，深拷贝适合需要完全隔离数据的场景。
    

---

## 6️⃣ 小整数池（Integer Caching）

**问题**：解释什么是小整数池？为什么 `a = 256; b = 256; a is b` 为 True 而 `a = 257; b = 257; a is b` 为 False？

**答案**：

Python 对常用小整数（范围 `[-5, 256]`）做了缓存（interning），提升频繁操作的效率。

```
a = 256
b = 256
print(a is b)  # True

a = 257
b = 257
print(a is b)  # False

```
**为什么这么做？**

- 小整数使用频繁（比如循环计数、索引），共享对象可节省内存和提升性能。

---

## 7️⃣ GIL（全局解释器锁）

**问题**：什么是 GIL？为什么 Python 有 GIL？它对多线程有何影响？

**答案**：

- GIL 是 Global Interpreter Lock，Python 解释器在任意时刻只允许一个线程执行字节码。
    
- 存在于 CPython，目的是简化内存管理（尤其是引用计数）。
    

**影响：**

- 多线程在 CPU 密集型任务下无法并行执行，只适合 I/O 密集场景。
    

**为什么这么做？**

- 避免多线程同时修改对象引用计数造成崩溃，是历史设计权衡（现在可用多进程或使用 PyPy/Jython 解决）。
    

---

## 8️⃣ 魔法函数协议

**问题**：解释下列魔法方法的作用：`__iter__`、`__next__`、`__getitem__`、`__call__`。

**答案**：

- `__iter__`：让对象可迭代，返回一个迭代器（如自己或其他对象）。
    
- `__next__`：定义迭代器的“下一项”行为。
    
- `__getitem__`：支持 `obj[key]` 语法。
    
- `__call__`：使对象可调用（像函数一样）。
    

**为什么这么做？**

- Python 遵循协议导向设计，魔法函数允许自定义对象行为，对接语言特性（如 `for in`、`[]`、`()`）。


## 9️⃣ 进程、线程、协程

**问题**  
比较进程、线程和协程的区别与使用场景。

**答案**

|特性|进程|线程|协程|
|---|---|---|---|
|调度单位|操作系统|操作系统|用户态|
|资源隔离|完全隔离|共享内存|共享内存|
|创建销毁开销|高|中|低|
|并发场景|CPU 密集型多核并行|I/O 密集型|大规模高并发 I/O，千级上下文|

---

## 🔟 Glue 语言互操作（调用 C 与 Java）

**问题**  
Python 如何调用 C 代码？如何调用 Java 方法？

**答案**

- **调用 C**：
    
    - `ctypes`：纯 Python，直接加载动态链接库；
        
    - `cffi`：更接近 C 语法，性能更优；
        
    - Python C-API：编写扩展模块。
        
- **调用 Java**：
    
    - `JPype` / `py4j`：在 JVM 中启动 Python 进程或通过 socket 通信；
        
    - `Jython`：直接运行在 JVM 上，无需桥接。
        

---

## 1️1. 异步编程与主流框架

### 异步编程核心概念

**问题**  
解释事件循环、Task、Future、协程（Coroutine）、`await`/`async` 的关系。

**答案**

- **事件循环**：调度协程执行的核心，负责 I/O 多路复用与回调；
    
- **Coroutine**：用 `async def` 定义的可挂起函数；
    
- **Task**：事件循环中已注册的协程，封装在 Future 中以便调度；
    
- **Future**：代表尚未完成的异步操作；
    
- **`await`**：挂起当前协程，直至 Future 完成。
    

---

## 12. `asyncio` 实现细节

**问题**  
`asyncio` 如何在底层实现 I/O 多路复用？如何与线程/进程协作？

**答案**

- 使用 `selectors` 模块封装 `epoll`/`kqueue`/`select`；
    
- 可在协程中使用 `run_in_executor` 将阻塞操作交给线程或进程池执行。
    

---

## 13. Gunicorn 工作模型

**问题**  
解释 Gunicorn 的 Master-Worker 架构，各 Worker 类型（sync、gevent、uvicorn.workers 等）有何区别？

**答案**

- **Master**：监听 socket，管理 Worker 生命周期；
    
- **Worker**：实际处理请求，有多种类型：
    
    - **sync**：同步阻塞；
        
    - **gevent**：基于协程，需猴子补丁；
        
    - **uvicorn.workers.UvicornWorker**：基于 `asyncio`，支持 HTTP/2、WebSocket。
        
- **为何如此**：不同 Worker 适配不同 I/O 模型，满足高并发或简单部署需求。
    

---

## 14. Sanic 核心原理

**问题**  
Sanic 如何实现超高吞吐？路由、请求上下文及中间件的设计要点？

**答案**

- **I/O 模型**：基于 `uvloop`（libuv 驱动），极致非阻塞；
    
- **路由**：使用 Radix 树做前缀匹配，高效分发；
    
- **请求上下文**：采用 `contextvars` 保持协程安全；
    
- **中间件**：在事件循环中串行/并行执行，尽量保持纯异步避免阻塞。
    

---

## 15. FastAPI 深度解析

**问题**  
FastAPI 的高性能来源于何处？如何实现自动文档与依赖注入？

**答案**

- **性能**：基于 Starlette + Pydantic，底层用 `uvicorn` + `uvloop`；
    
- **依赖注入**：利用 Python 类型注解与 `inspect.signature`，自动解析函数参数来源（请求、路径、查询、Body）；
    
- **自动文档**：在启动时收集路由与数据模型，生成 OpenAPI schema 并暴露 Swagger UI。
    

---

## 16. Flask 与 WSGI

**问题**  
Flask 如何实现请求分发？WSGI 应用调用链是怎样的？如何保证线程/进程安全？

**答案**

- **路由**：Werkzeug 的路由映射，基于 Werkzeug Map；
    
- **WSGI 链**：`environ` → Flask 应用 → 返回 `(status, headers, body)` → WSGI 服务器；
    
- **线程/进程安全**：全局 `app` 对象仅保存配置，运行时使用请求上下文栈（`LocalStack`）隔离不同请求。

WSGI 是同步协议，只支持 HTTP，适合传统 Web 应用（如 Flask、Django）。ASGI 是异步协议，支持 HTTP/2、WebSocket 等，适合高并发和实时应用（如 FastAPI、Sanic）。ASGI 支持异步协程，更现代、灵活。选择依据是是否需要异步和多协议支持。

---

## 17. 数据处理库(Pandas 核心对象与性能优化)

**问题**  
Pandas `DataFrame` 底层如何存储数据？为什么要用向量化操作？怎样避免常见性能陷阱？

**答案**

- **底层存储**：由多个 `Series`（即 NumPy ndarray）按列存储；
    
- **向量化**：一次性对整个数组操作，避免 Python 层循环，极大提升性能；
    
- **优化技巧**：
    
    - 尽量使用内置 `apply`、广播；
        
    - 避免逐行操作；
        
    - 合理使用 `Categorical` 缩减内存；
        
    - 对大数据切片时用 `loc`/`iloc` 避开复制。