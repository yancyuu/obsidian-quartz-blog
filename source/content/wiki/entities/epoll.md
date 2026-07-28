---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/异步如何实现的_40ec97]]"]
tags: [other]
aliases:
  - "epoll机制"
  - "epoll IO多路复用"
---


# epoll

## 基本信息
- Type: other
- Source: [[sources/异步如何实现的_40ec97|异步如何实现的]]

## 描述

epoll 是 Linux 内核中的一种可扩展的 IO 多路复用机制，是现代高性能网络编程的核心基础设施之一。在异步编程模型中，epoll 充当[[concepts/事件循环|事件循环]]的底层支撑技术，使单个线程能够同时监听成千上万个文件描述符（fd）的 IO 就绪状态。当协程发起网络请求并因[[concepts/IO阻塞|IO阻塞]]而暂停时，事件循环依靠 epoll 来等待数据就绪，并在数据可用时唤醒相应的协程继续执行。与早期的 select 和 poll 相比，epoll 采用事件驱动回调机制，避免了线性扫描全部文件描述符的开销，从而在高并发场景下具有显著性能优势。Python 的 [[entities/asyncio|asyncio]] 框架在不同平台上会自动选择对应的底层 IO 多路复用实现（Linux 上使用 epoll，BSD/macOS 上使用 kqueue），为上层提供统一的异步[[concepts/IO多路复用|IO多路复用]]抽象。

## 相关实体
- [[entities/asyncio|asyncio]]

## 相关概念
- [[concepts/事件循环|事件循环]]
- [[concepts/IO多路复用|IO多路复用]]
- [[concepts/IO阻塞|IO阻塞]]

## 来源提及
- "调用 **IO 多路复用（epoll/kqueue）** 等待 IO 就绪" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "事件循环的「等待 IO」靠的是操作系统的 select、poll、epoll，一个线程就能监听成千上万个 fd。" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "事件循环用 epoll 监听 IO 就绪后恢复对应协程。" — [[sources/异步如何实现的_40ec97|异步如何实现的]]