---
type: entity
created: 2026-06-25
updated: 2026-07-28
sources:
  - "[[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0]]"
  - "[[sources/异步如何实现的_40ec97]]"
tags:
  - "product"
aliases:
  - "Python Interpreter"
  - "代码执行环境"
  - "Python"
---

## 描述
Python 是一种广泛使用的高级编程语言，其解释器（3.7+ 版本）在该 Agent 架构图中[[concepts/工具层|工具层]]的核心组件之一，负责为 Agent 系统提供代码执行能力。它允许[[concepts/代码文本生成Agent|代码/文本生成 Agent]]编写的代码被实际运行和验证，是实现代码生成与校验闭环的关键基础设施。Python 解释器与[[entities/web-search|Web Search]]、[[entities/企业erp系统|企业ERP系统]]等一起构成了 Agent 系统的外部能力集合，被中控大脑在[[concepts/任务规划器|任务规划器]]的协调下统一调度和管理。此外，Python 独有的全局解释器锁（GIL）对并发模型产生了深远影响，asyncio 通过单线程事件循环规避 GIL 竞争，而 CPU 密集任务则需通过多进程来解决。

## 相关实体
- [[entities/web-search|Web Search]]
- [[entities/企业erp系统|企业ERP系统]]
- [[entities/asyncio|asyncio]]

## 相关概念
- [[concepts/工具层|工具层]]
- [[concepts/代码文本生成Agent|代码文本生成Agent]]
- [[concepts/任务规划器|任务规划器]]
- [[concepts/全局解释器锁gil|全局解释器锁（GIL）]]
- [[concepts/协程|协程]]
- [[concepts/事件循环|事件循环]]

## 来源提及

> **Source: [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]**
> - "工具层：外星神器的触手"
> - "Python解释器"

> **Source: [[sources/异步如何实现的_40ec97|异步如何实现的]]**
> - "本文用现代 API。"
> - "asyncio vs 多线程 vs 多进程"
> - "解决：Node 用 `worker_threads`、Python 用 `multiprocessing`/`run_in_executor`——本质都是「把 CPU 活挪出主线程」"