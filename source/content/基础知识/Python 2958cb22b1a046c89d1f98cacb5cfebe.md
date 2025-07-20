# Python

Owner: yancy yu
Tags: Interview

---

## Python 面试准备教程

### 1. 基础知识

### 1.1 Python 的解释器

- CPython: 官方版本，用 C 语言编写。
- Jython: 运行在 Java 平台。
- IronPython: 针对 .NET 和 C#。
- PyPy: 使用 JIT 编译器，执行速度更快。

### 1.2 Python 2 和 Python 3 的区别

- `print` 语句 vs `print()` 函数。
- `range` 和 `xrange`。
- 整数除法。

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

[GC垃圾回收](GC%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%2059c012c1e68d483487c7c20977c71cd4.md)

[内建属性&函数](%E5%86%85%E5%BB%BA%E5%B1%9E%E6%80%A7&%E5%87%BD%E6%95%B0%20d23e11b413f64615b939ec13eea9bc1f.md)

[pdb调试](pdb%E8%B0%83%E8%AF%95%208d8a671ae3314cb4a4d649f0e1675903.md)

[闭包](%E9%97%AD%E5%8C%85%20d3195f51332e42bc9423dd419f73272f.md)

[类Class常用的问题](%E7%B1%BBClass%E5%B8%B8%E7%94%A8%E7%9A%84%E9%97%AE%E9%A2%98%201cd4332b8c50477486e255a8dd8f416a.md)

[属性property的优缺点](%E5%B1%9E%E6%80%A7property%E7%9A%84%E4%BC%98%E7%BC%BA%E7%82%B9%201368bcb0cb6c47aebe2c92def4ac48e6.md)

[__init__和__new__的区别](__init__和__new__的区别.md)

[GIL](GIL%2034c19fa4b92e4714832144da202425f8.md)

[迭代器](%E8%BF%AD%E4%BB%A3%E5%99%A8%20b767a96483f94fe392823254e4ad88f0.md)

[MVC](MVC%209d9a74f066474a64b33cb63750b6df5f.md)

[生成器](%E7%94%9F%E6%88%90%E5%99%A8%2081c11f407b5a404196243d68dc9f695d.md)