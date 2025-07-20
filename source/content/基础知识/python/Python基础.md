
---

## Python 面试准备教程

### 1. 基础知识

### 1.1 Python 的解释器

- CPython: 官方版本，用 C 语言编写。
- Jython: 运行在 Java 平台。
- IronPython: 针对 .NET 和 C#。
- PyPy: 使用 JIT 编译器，执行速度更快。

### 1.2 Python 2 和 Python 3 的区别

```python
print` 语句 vs `print()` 函数。
- `range` 和 `xrange`。
- 整数除法。
```

### 1.3 GIL（全局解释器锁）

- 限制多线程并发执行，影响性能。
- 可以使用多进程或其他方法绕过。

### 1.4 单例模式

```python
class Singleton:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance

```

### 1.5 装饰器

- 用于修改函数或类的行为。

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

```

---

### 2. 数据结构

### 2.1 列表和元组

- 列表可变，元组不可变。

### 2.2 栈/队列的实现

- 使用 `list` 或 `collections.deque`。

### 2.3 字典推导

```python
{x: x**2 for x in (2, 4, 6)}

```

### 2.4 合并两个有序列表

- 使用 `merge` 方法。

---

### 3. 算法

### 3.1 反转字符串

```python
s[::-1]

```

### 3.2 找出列表中的最大/最小元素

- 使用 `max()` 和 `min()`。

### 3.3 二分查找

- 使用递归或循环。

### 3.4 找出数组中重复的元素

- 使用 `set` 或者排序。

---

### 4. Web 开发

### 4.1 WSGI

- Web Server Gateway Interface，连接 Web 服务器和应用程序的接口。

### 4.2 Flask 和 Django

- Flask 更轻量级，Django 更全面。

### 4.3 表单处理

- 使用 `request.form`。

### 4.4 ORM

- Object-Relational Mapping，如 SQLAlchemy。

---

### 5. 数据库

### 5.1 连接数据库

- 使用 `pymysql` 或 `pymongo`。

### 5.2 SQL 注入

- 使用参数化查询。

### 5.3 数据库迁移

- 使用 Alembic 或 Django 的 migration。

---

### 6. 测试

### 6.1 单元测试

- 使用 `unittest`。

### 6.2 Mock 对象

- 使用 `unittest.mock`。

### 6.3 TDD（测试驱动开发）

- 先写测试，再写代码。

---

这个教程只是一个大致的框架，每个主题都可以深入学习。希望这能帮助你成功通过 Python 面试！祝你好运！

[GC垃圾回收](GC垃圾回收.md)

[内建属性&函数](内建属性&函数.md)

[pdb调试](pdb调试.md)

[闭包](闭包.md)

[类Class常用的问题](类Class常用的问题.md)

[属性property的优缺点](属性property的优缺点.md)

[__init__和__new__的区别](__init__和__new__的区别.md)

[GIL](GIL.md)

[迭代器](迭代器.md)

[MVC](MVC.md)

[生成器](生成器.md)

[^1]: 
