
Owner: yancy yu

`__new__` 和 `__init__` 都是 Python 类的特殊方法，但它们有不同的用途和调用时机。

### `__new__`

1. **作用**: 负责创建一个新的实例对象。
2. **调用时机**: 当你调用 `ClassName()` 以创建新对象时，`__new__` 方法首先被调用。
3. **参数**: 第一个参数是类本身（通常命名为 `cls`），后面可以跟其他参数。
4. **返回值**: 必须返回一个实例对象，该对象会传递给 `__init__` 方法的第一个参数。
5. **继承**: 如果你需要覆盖这个方法，通常需要调用 `super().__new__(cls, ...)`。

### `__init__`

1. **作用**: 负责初始化一个已创建的实例。
2. **调用时机**: 在 `__new__` 方法创建一个实例并返回后，`__init__` 被调用。
3. **参数**: 第一个参数是新创建的实例（通常命名为 `self`），后面可以跟其他参数。
4. **返回值**: 通常没有返回值（或者说返回 `None`）。
5. **继承**: 如果你需要覆盖这个方法，通常需要调用 `super().__init__(...)`。

### 代码示例

```python
class MyClass:
    def __new__(cls, *args, **kwargs):
        print("Executing __new__")
        instance = super(MyClass, cls).__new__(cls)
        return instance

    def __init__(self, *args, **kwargs):
        print("Executing __init__")
        self.value = args[0]

# 创建实例
obj = MyClass(42)

# 输出
# Executing __new__
# Executing __init__

# 检查属性
print(obj.value)  # 输出: 42

```

### 总结

- `__new__` 主要用于控制对象的创建过程，比如实现单例模式。
- `__init__` 主要用于设置对象属性或执行对象创建后的初始化操作。

通常情况下，你只需要重写 `__init__` 方法来设置实例属性。但如果你需要更细粒度的控制，比如改变实例创建的方式，那么你可能需要重写 `__new__` 方法。