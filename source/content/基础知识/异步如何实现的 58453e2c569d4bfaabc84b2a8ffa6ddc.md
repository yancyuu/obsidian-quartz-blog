# 异步如何实现的

Owner: yancy yu

在 Python 中，异步编程通常通过 `asyncio` 库来实现。这个库提供了事件循环和协程的支持，使得你可以非阻塞性地执行 I/O 操作或其他异步任务。

### 基础概念

- **事件循环（Event Loop）**: 负责管理和调度异步任务。
- **协程（Coroutine）**: 使用 `async` 和 `await` 关键字定义的特殊函数，用于执行异步操作。

### 代码示例

### 1. 简单的异步函数

```python
import asyncio

async def hello_world():
    print("Hello")
    await asyncio.sleep(1)
    print("World")

# 获取事件循环
loop = asyncio.get_event_loop()
# 运行协程
loop.run_until_complete(hello_world())

```

### 2. 并发执行多个异步函数

```python
import asyncio

async def foo():
    print("Foo start")
    await asyncio.sleep(2)
    print("Foo end")

async def bar():
    print("Bar start")
    await asyncio.sleep(1)
    print("Bar end")

# 获取事件循环
loop = asyncio.get_event_loop()
# 并发运行多个协程
loop.run_until_complete(asyncio.gather(foo(), bar()))

```

### 3. 使用 `async with` 进行异步 I/O

```python
import aiohttp
import asyncio

async def fetch_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

# 获取事件循环
loop = asyncio.get_event_loop()
# 获取网页内容
result = loop.run_until_complete(fetch_url("<https://www.example.com>"))

```

### 4. 使用 `async for` 进行异步迭代

```python
import asyncio

async def ticker(delay, to):
    """Yield numbers from 0 to `to` every `delay` seconds."""
    for i in range(to):
        yield i
        await asyncio.sleep(delay)

async def main():
    async for i in ticker(1, 5):
        print(i)

# 获取事件循环
loop = asyncio.get_event_loop()
# 运行主协程
loop.run_until_complete(main())

```

这些只是一些基础的例子，`asyncio` 库提供了更多高级功能，如任务（Task）、信号量（Semaphore）、队列（Queue）等，用于构建复杂的异步应用。

注意：从 Python 3.7 开始，你也可以使用 `asyncio.run(main())` 的方式来简化事件循环的获取和运行，但这只适用于简单的脚本或应用。在复杂的应用中，通常还是需要手动管理事件循环。