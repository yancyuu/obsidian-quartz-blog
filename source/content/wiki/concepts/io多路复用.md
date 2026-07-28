---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/异步如何实现的_40ec97]]"]
tags: [method]
aliases:
  - "IO Multiplexing"
  - "I/O多路复用"
---


# IO多路复用

## 定义
IO 多路复用是一种允许单个线程同时监控多个文件描述符（fd）的网络 IO 模型。在 asyncio 中，它使事件循环能够在不阻塞的情况下等待多个 IO 操作中的任意一个完成。底层依赖于操作系统提供的机制如 Linux 的 epoll 或 BSD 的 kqueue。这使得单线程能够高效管理上万个并发连接。

## 关键特征
- **单线程高并发**：一个线程即可监听成千上万个文件描述符（fd），无需为每个连接创建独立线程。
- **非阻塞等待**：线程不会在单个 IO 操作上阻塞，而是等待任意 IO 就绪后统一处理。
- **操作系统级支持**：底层依赖系统调用实现，常见机制包括 `select`、`poll`、`epoll`（Linux）和 `kqueue`（BSD/macOS）。
- **事件驱动协作**：与事件循环紧密配合，IO 就绪后触发回调，驱动协程恢复执行。

## 应用
- **异步编程框架**：如 Python 的 asyncio，通过事件循环 + IO 多路复用实现高并发协程调度。
- **高性能网络服务器**：如 Nginx、Redis，利用 epoll/kqueue 在单线程下处理海量客户端连接。
- **实时通信系统**：WebSocket、长连接推送等需要同时维持大量活跃连接的场景。

## 相关概念
- [[concepts/事件循环|事件循环]]

## 相关实体
- [[entities/epoll|epoll]]
- [[entities/asyncio|asyncio]]

## 来源提及
- "异步 IO 的「并发」**不是多线程**，而是：**一个线程 + 一个事件循环 + IO 多路复用**。" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "调用 **IO 多路复用（epoll/kqueue）** 等待 IO 就绪" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "事件循环的「等待 IO」靠的是操作系统的 select、poll、epoll，一个线程就能监听成千上万个 fd。" — [[sources/异步如何实现的_40ec97|异步如何实现的]]