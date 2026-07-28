---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/异步如何实现的_40ec97]]"
tags:
  - "method"
aliases:
  - "IO Multiplexing"
  - "I/O多路复用"
  - "IO多路复用"
  - "epoll/kqueue"
---

## Description
IO 多路复用是操作系统的底层机制，允许单个线程同时监听成千上万个文件描述符（fd）的 IO 就绪状态。epoll（Linux）和 kqueue（macOS/FreeBSD）是操作系统提供的具体实现，它们被 Python 事件循环底层调用，用于高效地监听大量文件描述符的网络或文件 IO 就绪状态。进程仅在实际发生 IO 事件（可读/可写/异常）时才收到通知，避免无意义轮询，在 IO 等待期间释放 CPU 资源。它是实现单线程高并发异步网络框架的基础，也是事件循环（Event Loop）实现 IO 等待的操作系统级基石。Python 通过 selectors 模块自动选择最优的底层实现（Linux 下使用 epoll，macOS/BSD 下使用 kqueue，Windows 下使用 IOCP）。

## Related Concepts
- [[concepts/事件循环|事件循环]]
- [[concepts/协程|协程]]
- [[concepts/进程调度|进程调度]]

## Related Entities
*暂无相关实体*

## Mentions in Source

> **Source: [[sources/异步如何实现的_40ec97|异步如何实现的_40ec97]]**
> - "异步 IO 的「并发」**不是多线程**，而是：**一个线程 + 一个事件循环 + IO 多路复用**。"
> - "调用 **IO 多路复用（epoll/kqueue）** 等待 IO 就绪"
> - "事件循环的「等待 IO」靠的是操作系统的 [select、poll、epoll](select、poll、epoll.md)，一个线程就能监听成千上万个 fd。"