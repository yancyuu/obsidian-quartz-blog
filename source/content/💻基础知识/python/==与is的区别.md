---
tags:
  - basic-knowledge
  - kb/programming/python
  - kb/programming/python/basics
  - equality
  - identity
  - is
  - small-intern
---

# == 与 is 的区别

> `==` 比较值，`is` 比较身份（内存地址）。看似简单，但 Python 的**小整数缓存/字符串驻留**常出陷阱题。

## 相关笔记

- [Python基础](Python基础.md)：数据类型与可变性
- [python垃圾回收](python垃圾回收.md)：引用计数与对象生命周期

---

## 一、核心区别

| 运算符 | 比较什么                         | 等价于           |
| ------ | -------------------------------- | ---------------- |
| `==`   | **值**是否相等（调用 `__eq__`）  | `a.__eq__(b)`    |
| `is`   | **身份**是否相同（是否同一对象） | `id(a) == id(b)` |

```python
a = [1,2,3]
b = [1,2,3]
a == b    # True，值相等
a is b    # False，不是同一个对象
```

---

## 二、何时用 is

- 判空：`if x is None`（**不要写 `== None`**，`==` 可能被 `__eq__` 重载）
- 判断单例：`True`/`False`/`None` 用 `is`

> PEP 8 建议：与单例比较**一律用 `is`/`is not`**。

---

## 三、陷阱：小整数缓存 & 字符串驻留

CPython 对**小整数（-5 ~ 256）**和**短字符串**做了缓存/驻留，导致 `is` 可能「意外」成立：

```python
a = 256; b = 256
a is b    # True（小整数缓存）

c = 257; d = 257
c is d    # 交互模式下可能 False（超出缓存范围）
```

```python
s1 = "hi"; s2 = "hi"
s1 is s2   # True（字符串驻留，符合标识符规则的短串）

s3 = "hi!"; s4 = "hi!"
s3 is s4   # 可能 False（含!不符合标识符规则，未必驻留）
```

> 这就是为什么**比较值永远用 `==`，`is` 只用于身份判断**。依赖 `is` 比较值是 bug 温床。

---

## 四、面试速答

> **Q：== 和 is 区别？**
> A：`==` 比较值（调用 `__eq__`），`is` 比较身份（`id()` 是否相同，是否同一对象）。

> **Q：`a = 256; b = 256; a is b` 是 True 还是 False？**
> A：True。CPython 缓存了 -5~256 的小整数，a、b 指向同一缓存对象。但 `257` 时交互模式可能 False。所以**不要用 is 比较值**。

> **Q：判断 None 用 == 还是 is？**
> A：用 `is None`。PEP 8 要求与单例（None/True/False）比较一律用 `is`，因为 `==` 可能被 `__eq__` 重载改变语义。

---

## 参考

- [Python 官方 · 对象身份与相等](https://docs.python.org/3/reference/expressions.html#is)
- [Python 小整数缓存](https://docs.python.org/3/c-api/long.html#c.PyLong_FromLong)
- [PEP 8 · 与 None 比较用 is](https://peps.python.org/pep-0008/)
