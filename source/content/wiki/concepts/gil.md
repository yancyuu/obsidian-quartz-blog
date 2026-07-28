---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/异步如何实现的_40ec97]]"
tags:
  - "term"
aliases:
  - "全局解释器锁"
  - "Global Interpreter Lock"
---

## Description
GIL 是 Python（具体为 CPython 实现）中一把全局性的解释器锁，确保同一时刻仅有一个线程执行 Python 字节码。这一机制从根本上简化了引用计数式内存管理的线程安全问题，但也意味着多线程在 CPU 密集型场景下无法实现真正的多核并行。在 IO 密集型任务中，线程执行阻塞式 IO 时 GIL 会被释放，因此多线程和 asyncio 均能有效工作。值得注意的是，[[concepts/协程|协程]]运行在单线程[[concepts/事件循环|事件循环]]之上，天然规避了 GIL 竞争问题；但代价是协程内不能直接运行 CPU 密集型代码，否则会阻塞唯一的主线程，导致事件循环停滞，需要借助多进程方案来规避。

## 关键特征
- **单线程执行**：在任何时刻，GIL 只允许一个线程执行 Python 字节码，其他线程必须等待。
- **IO 操作不受限**：当线程执行阻塞式 IO 操作时，GIL 会被释放，允许其他线程运行，因此在 IO 密集型场景下多线程仍然有效。
- **多进程绕过**：由于每个进程拥有独立的解释器和 GIL，通过多进程（而非多线程）可以实现真正的 CPU 并行。
- **asyncio 规避竞争**：基于单线程事件循环的并发模型天然不存在 GIL 竞争问题，但在处理 CPU 密集型任务时仍受限于单线程性能。

## 应用
- **IO 密集型任务**：网络爬虫、文件读写、数据库访问等场景中，多线程或 asyncio 可以有效利用 GIL 在阻塞期间释放的特性。
- **CPU 密集型任务**：科学计算、大规模数据处理等场景需要通过 `multiprocessing` 等多进程方案绕过 GIL，实现多核并行。
- **异步编程（asyncio）**：由于 asyncio 在单线程中通过事件循环调度协程，天然规避了 GIL 竞争，非常适合高并发网络 IO 场景；但若协程内出现 CPU 密集型计算，会直接阻塞主线程导致事件循环停滞。

## Related Concepts
- [[concepts/事件循环|事件循环]]
- [[concepts/协程|协程]]
- [[concepts/io-多路复用|IO多路复用]]

## Related Entities
- [[entities/Python|Python]]
- [[entities/asyncio|asyncio]]

## Mentions in Source

> **来源：[[sources/异步如何实现的_40ec97|异步如何实现的]]**
> - "asyncio **单线程**运行，**不存在 GIL 竞争**（只有一个线程）"
> - "asyncio 和 GIL 冲突吗？A：不冲突。asyncio 单线程，没有 GIL 竞争问题；但 CPU 密集仍受单线程限制，需配合多进程。"
> - "asyncio 单线程，规避 GIL 竞争，但不能跑 CPU 密集"
> - "Q：asyncio 和 GIL 冲突吗？A：不冲突。asyncio 单线程，没有 GIL 竞争问题；但 CPU 密集仍受单线程限制，需配合多进程。"