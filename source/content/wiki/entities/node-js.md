---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/异步如何实现的_40ec97]]"]
tags: [product]
aliases:
  - "Node"
  - "NodeJS"
  - "Node.js 运行时"
---


# Node.js

## 基本信息
- Type: product
- Source: [[sources/异步如何实现的_40ec97|异步如何实现的]]

## 描述
Node.js 是一个基于 V8 引擎的 JavaScript 运行时，在源文章中被用于对比说明 CPU 密集任务为何会阻塞[[concepts/事件循环|事件循环]]。文章指出 Node.js 通过 `worker_threads` 来解决 CPU 密集任务阻塞主线程的问题，这与 Python 使用 `multiprocessing`/`run_in_executor` 的思路一致——本质都是将 CPU 活移出主线程。Node.js 的事件循环模型（libuv）也是文章中提到的 IO 外包机制的一个实例：`readFile` 和网络请求等 IO 操作会被外包给 libuv/OS，主线程立即返回而不等待，体现了[[concepts/非抢占式调度|非抢占式调度]]和[[concepts/协程|协程]]的核心思想。

## 相关实体
（暂无相关实体）

## 相关概念
- [[concepts/事件循环|事件循环]]
- [[concepts/非抢占式调度|非抢占式调度]]
- [[concepts/协程|协程]]

## 来源提及
- "解决：Node 用 `worker_threads`、Python 用 `multiprocessing`/`run_in_executor`——本质都是「把 CPU 活挪出主线程」" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "IO 不阻塞：`readFile`/网络请求把活**外包给 libuv/OS**，主线程立即返回不等" — [[sources/异步如何实现的_40ec97|异步如何实现的]]