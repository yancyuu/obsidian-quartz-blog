---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/异步如何实现的_40ec97]]"
  - "[[sources/cursor提示词_bf3f6f]]"
tags:
  - "method"
aliases:
  - "异步输入输出"
  - "Asynchronous IO"
---

## Description
异步 IO 是一种 IO 处理模型，程序发起 IO 操作后不需要等待其完成，而是立即转去执行其他任务。当底层 IO 操作完成后，通过事件通知机制告知程序处理结果。与同步 IO 相比，它避免了 CPU 在等待 IO 期间的空转。其本质可概括为单线程、事件循环和 IO 多路复用的结合体。在实际工程实践中，异步 IO 要求对所有数据库调用和外部 API 请求使用异步操作以最小化阻塞，通过 `async def` 定义异步函数来处理 I/O 绑定任务、缓存策略和延迟加载。这一方法论与 Sanic 框架和 Tortoise ORM 的异步特性深度结合，是构建高性能 Web 应用的关键技术路径。

## Related Concepts
- [[concepts/事件循环|事件循环]]
- [[concepts/协程|协程]]
- [[concepts/IO多路复用|IO多路复用]]
- [[concepts/延迟加载|延迟加载]]

## Related Entities
- [[entities/asyncio|asyncio]]
- [[entities/sanic|Sanic]]
- [[entities/tortoise-orm|Tortoise ORM]]

## Mentions in Source

> **Source: [[sources/异步如何实现的_40ec97|异步如何实现的]]**
> - "同步 IO：发起 IO 后**阻塞等待**，CPU 空转"
> - "异步 IO：发起 IO 后**不等待**，切去执行其他就绪任务，IO 完成后再回来处理"
> - "核心：**IO 等待时不浪费 CPU**，让事件循环去执行其他就绪协程。"

> **Source: [[sources/cursor提示词_bf3f6f|cursor提示词]]**
> - "对纯函数使用 `def`，对异步操作使用 `async def`。"
> - "最小化阻塞 I/O 操作；对所有数据库调用和外部 API 请求使用异步操作。"
> - "通过异步函数处理 I/O 绑定任务、缓存策略和延迟加载来优化性能。"