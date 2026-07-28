---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/异步如何实现的_40ec97]]"]
tags: [project]
aliases:
  - "asyncio库"
  - "Python asyncio"
---


# asyncio

## 基本信息
- Type: project
- Source: [[sources/异步如何实现的_40ec97|异步如何实现的]]

## 描述
asyncio 是 Python 标准库中用于编写并发代码的核心模块，采用 async/await 语法进行协程编程。它基于单线程运行模型，通过[[concepts/进程调度|事件循环]]不断轮询就绪的 IO 事件，配合操作系统底层的 IO 多路复用机制（如 epoll / kqueue）实现高并发能力。由于始终在单线程内执行，asyncio 不存在传统多线程编程中的 [[concepts/非transformer架构|GIL]] 竞争问题。在 Python 3.7+ 中，官方推荐使用 `asyncio.run()` 作为统一入口，旧版的 `get_event_loop` 写法已被标记为过时。asyncio 是 Python 异步生态（如 aiohttp、FastAPI 等）的底层基石。

## 相关实体
- [[entities/Python|Python]]

## 相关概念
- [[concepts/进程调度|事件循环]]
- [[concepts/进程调度|协程]]
- [[concepts/进程调度|IO多路复用]]
- [[concepts/非transformer架构|GIL]]

## 来源提及
- "异步 IO 的「并发」**不是多线程**，而是：**一个线程 + 一个事件循环 + IO 多路复用**。" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "事件循环（Event Loop）是 asyncio 的大脑，循环执行" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "asyncio **单线程**运行，**不存在 GIL 竞争**（只有一个线程）" — [[sources/异步如何实现的_40ec97|异步如何实现的]]