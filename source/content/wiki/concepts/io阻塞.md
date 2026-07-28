---
type: concept
created: 2026-06-24
updated: 2026-07-28
sources:
  - "[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"
  - "[[sources/异步如何实现的_40ec97]]"
tags:
  - "phenomenon"
aliases:
  - "I/O Blocking"
  - "输入输出阻塞"
---

## Description

I/O 阻塞是一个横跨 Agent 系统架构与异步编程底层原理的核心问题。在 Agent 系统中，每次文件读取都是一次昂贵的 I/O 操作和 Token 生成过程，"按需加载"策略虽节省了上下文空间，却引入了等待延迟，被列为 Agent 开发者需要像操作系统调度员一样处理的三大核心问题之一。在异步编程模型中，同步 I/O 操作（如 `requests` 库、`time.sleep`、阻塞式数据库驱动）会阻塞整个事件循环，导致所有协程被卡住，必须替换为异步库（如 `aiohttp`、`asyncio.sleep`）来避免此问题。此外，CPU 密集型计算（如 `while` 循环、大运算、大对象 `JSON.parse`）本身必须由主线程执行，无法外包，同样会造成线程独占和事件循环卡死。这两个层面的 I/O 阻塞问题具有深刻的类比性，开发者都需要在资源调度与执行效率之间寻找平衡。

## 关键特征

- 每次文件读取都是一次昂贵的 I/O 操作，伴随 Token 生成过程，耗时显著
- 是"按需加载"策略的直接副作用——为节省上下文空间而延迟加载，却引入了等待延迟
- 直接影响用户体验，用户在 Agent 读取外部资源期间被迫等待
- 在同步 I/O 模型中，发起 I/O 后阻塞等待，CPU 空转
- 在协程中使用同步阻塞 I/O（`requests`、`time.sleep`、阻塞 DB 驱动）会阻塞整个事件循环，所有协程卡住
- CPU 阻塞（`while`、大运算、`JSON.parse` 大对象）必须主线程亲自执行，无法外包，导致独占线程和事件循环卡死
- 与操作系统中的 I/O 阻塞问题具有类比性，开发者需要像 OS 调度员一样进行权衡和处理

## 应用

- Agent 系统架构设计中，需要在上下文管理与 I/O 延迟之间寻找平衡点
- SOP 文件加载策略的优化与决策
- Agent 运行时资源调度与用户体验管理
- 异步编程中，必须将同步阻塞 I/O 替换为异步库（如 `aiohttp`、`asyncio.sleep`）以避免事件循环阻塞

## Related Concepts

- [[concepts/Agent内存管理|Agent内存管理]]
- [[concepts/进程调度|进程调度]]
- [[concepts/上下文欺骗循环|上下文欺骗循环]]
- [[concepts/事件循环|事件循环]]
- [[concepts/协程|协程]]
- [[concepts/异步io|异步IO]]
- [[concepts/io-多路复用|I/O多路复用]]
- [[concepts/gil|GIL]]

## Related Entities

- [[entities/asyncio|asyncio]]

## 来源提及

> **来源：[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]**
> - "**I/O Blocking:** 读取 SOP 文件会不会让用户等太久？"

> **来源：[[sources/异步如何实现的_40ec97|异步如何实现的_40ec97]]**
> - "同步 IO：发起 IO 后**阻塞等待**，CPU 空转"
> - "协程里用**同步阻塞 IO**（`requests`、`time.sleep`、阻塞 DB 驱动）后果：阻塞整个事件循环，所有协程卡住"
> - "**CPU 阻塞**：CPU 计算（`while`、大运算、`JSON.parse` 大对象）**本身就是代码，必须主线程亲自执行**，无法外包 → 独占线程 → 事件循环卡死"