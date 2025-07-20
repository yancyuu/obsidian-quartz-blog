

1. 私有属性添加getter和setter⽅法
2. 使⽤property升级getter和setter⽅法

**使⽤property取代getter和setter⽅法**

> @property 成为属性函数，可以对属性赋值时做必要的检查，并保证代码的清晰短⼩，主要有2个作⽤
> 
> 
> 将⽅法转换为只读
> 
> 重新实现⼀个属性的设置和读取⽅法,可做边界判定
> 

### `property` 的优点

1. **封装性**: 使用 `property` 可以将对象的属性隐藏起来，只暴露必要的接口，增强了封装性。
2. **易用性**: 对于调用者来说，使用 `property` 的属性就像使用普通的属性一样，无需调用方法。
3. **可维护性**: 如果某个属性的内部实现需要更改，使用 `property` 可以在不改变 API 的情况下进行更改。
4. **数据验证**: 可以在 `setter` 方法中添加数据验证逻辑，确保数据的有效性。

### `property` 的缺点

1. **性能**: 使用 `property` 通常会比直接访问属性慢，因为涉及到额外的方法调用。
2. **可读性**: 过度使用 `property` 可能会使代码变得难以理解和维护。
3. **不灵活**: `property` 主要用于简单的属性访问逻辑，对于更复杂的操作，使用方法可能更为灵活。

### 代码示例

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        """获取半径"""
        return self._radius

    @radius.setter
    def radius(self, value):
        """设置半径，并进行数据验证"""
        if value < 0:
            raise ValueError("半径不能为负数")
        self._radius = value

    @property
    def diameter(self):
        """获取直径"""
        return self._radius * 2

    @property
    def area(self):
        """获取面积"""
        return 3.14159 * self._radius ** 2

# 使用示例
c = Circle(5)
print(c.radius)  # 输出: 5
print(c.diameter)  # 输出: 10
print(c.area)  # 输出: 78.53975

# 修改半径
c.radius = 10
print(c.radius)  # 输出: 10
print(c.diameter)  # 输出: 20
print(c.area)  # 输出: 314.159

# 尝试设置一个无效的半径
try:
    c.radius = -1
except ValueError as e:
    print(e)  # 输出: 半径不能为负数

```

在这个示例中，`Circle` 类有一个 `_radius` 私有属性和几个与之相关的 `property`。这样，我们可以轻松地获取和设置圆的半径、直径和面积，同时还能在 `setter` 方法中进行数据验证。