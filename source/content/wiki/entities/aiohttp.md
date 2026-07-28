---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/异步如何实现的_40ec97]]"]
tags: [product]
aliases:
  - "aiohttp"
  - "Async HTTP Client/Server"
  - "aiohttp框架"
---


# aiohttp

## 基本信息
- Type: product
- Source: [[sources/异步如何实现的_40ec97|异步如何实现的_40ec97]]

## 描述

aiohttp 是一个基于 Python [[concepts/进程调度|asyncio]] 的异步 HTTP 客户端/服务端框架，广泛应用于需要高并发网络请求的场景。它提供了完整的异步 HTTP 客户端和服务端功能，能够在[[concepts/进程调度|协程]]中非阻塞地处理网络 I/O，从而避免阻塞事件循环。在 Python 异步生态中，aiohttp 是替代同步阻塞库（如 `requests`）的推荐方案之一，与 `asyncpg`、`asyncio.sleep` 等异步库共同构成了完整的异步编程工具链。其设计充分利用了 [[concepts/进程调度|IO 多路复用]]机制，使单个事件循环能够高效管理大量并发连接。

## 相关实体

（暂无直接关联的实体页面）

## 相关概念

- [[concepts/进程调度|事件循环]]
- [[concepts/进程调度|协程]]
- [[concepts/进程调度|IO 多路复用]]

## 来源提及

- "用异步库（aiohttp、asyncpg、`asyncio.sleep`）" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "协程里用**同步阻塞 IO**（`requests`、`time.sleep`、阻塞 DB 驱动）| 阻塞整个事件循环，所有协程卡住 | 用异步库（aiohttp、asyncpg、`asyncio.sleep`）" — [[sources/异步如何实现的_40ec97|异步如何实现的]]

---