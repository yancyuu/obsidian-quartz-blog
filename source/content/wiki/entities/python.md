---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/异步如何实现的_40ec97]]"
  - "[[sources/应用开发规范_3bea14]]"
  - "[[sources/agent-app代码结构_c030b6]]"
tags:
  - "product"
aliases:
  - "Python"
  - "Python语言"
  - "CPython"
---

## 描述
Python 是一种广泛使用的高级编程语言。在本文语境下，它是 [[entities/asyncio|asyncio]] 异步框架的宿主语言。文章讨论了 Python 3.7+ 引入的现代异步 API，并特别分析了 Python 独有的 [[concepts/GIL|GIL]]（全局解释器锁）如何与 asyncio [[concepts/协程|协程]] 相互作用。在 Python 3.7+ 版本中，官方推荐使用 `asyncio.run()` 替代废弃的 `get_event_loop` 写法，而对于 CPU 密集型任务，则建议通过 `loop.run_in_executor()` 将其分发到线程池或进程池中执行，以规避 GIL 带来的并发限制。在后端应用开发规范中，项目指定使用 Python 3.11 及以上版本，整个项目的结构设计、[[concepts/asyncawait|async/await]] 异步编程规范以及 [[concepts/异步io|异步 IO]] 模型均基于 Python 生态构建，Controller 层遵循"接受纯 Python 参数 → 执行业务 → 返回纯 Python 结构"的设计原则。在 Agent 应用架构中，Python 同样是整个系统的编程语言基础——从配置文件 `settings.py`、ORM 框架到 Agent 核心逻辑（`agent.py`）的实现，以及架构中出现的 [[entities/pydantic-ai|Pydantic]]、FastAPI、Sanic、LangGraph 等组件，均为 Python 生态中的主流框架，体现了 [[concepts/pydantic-first|pydantic-first]] 的设计理念。

## 相关实体
- [[entities/asyncio|asyncio]]
- [[entities/pydantic-ai|pydantic-ai]]
- [[entities/common_sdk|common_sdk]]
- [[entities/ai_sdk|ai_sdk]]
- [[entities/fastapi|FastAPI]]
- [[entities/pydantic|Pydantic]]

## 相关概念
- [[concepts/gil|GIL]]
- [[concepts/协程|协程]]
- [[concepts/asyncawait|async/await]]
- [[concepts/异步io|异步 IO]]
- [[concepts/pydantic-first|pydantic-first]]

## 来源提及

> **Source: [[sources/异步如何实现的_40ec97|异步如何实现的]]**
> - "老资料里 `get_event_loop` 的写法已废弃，本文用现代 API。"
> - "现代 Python 一律用 `asyncio.run()`"
> - "CPU 密集部分用 `loop.run_in_executor()` 丢到**线程池/进程池**"

> **Source: [[sources/应用开发规范_3bea14|应用开发规范]]**
> - "python = \"^3.11\""
> - "Controller 层只关心"接受纯 Python 参数 → 执行业务 → 返回纯 Python结构"。"
> - "FROM swr.cn-east-3.myhuaweicloud.com/ai-prd/python:3.11-slim AS req-generator"

> **Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]**
> - "config/settings.py & .env"
> - "agent.py"