---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/应用开发规范_3bea14]]"
  - "[[sources/agent-app代码结构_c030b6]]"
  - "[[sources/cursor提示词_bf3f6f]]"
tags:
  - "product"
aliases:
  - "Sanic框架"
  - "Sanic Web Framework"
---

## Description
Sanic 是一个基于 Python 的高性能异步 Web 框架，在本代码规范中被指定为后端项目的核心[[concepts/技术栈|技术栈]]之一，与 asyncio 配合使用以实现高并发的请求处理。在 Agent 应用架构中，Sanic 作为 API 入口选项之一与 [[entities/fastapi|FastAPI]] 并列出现，位于应用入口与配置层，负责处理 HTTP 请求的接收和分发。规范要求在 Sanic 中使用 Blueprint 为每个模块（如 KB、Policy、User）定义 RPC 风格的 HTTP+JSON 路由，确保路由的模块化和可维护性。此外，规范要求通过 Sanic 的 Exception Middleware 统一捕获所有异常，避免向前端抛出未处理的系统异常，从而保证服务的健壮性和安全性。

在 Python Web 开发专家指南中，Sanic 作为核心技术栈被推荐，要求使用声明式路由定义和明确的返回类型注释，并通过生命周期事件（如 `before_server_start` 和 `after_server_stop`）来管理应用的启动和关闭。该指南还强调需配合中间件进行日志记录、错误监控和性能优化，通过异步函数处理 I/O 绑定任务、缓存策略和延迟加载来优化性能，并依赖 Sanic 的请求上下文系统管理状态和共享资源。Sanic 常与 [[entities/ai_sdk|ai_sdk]]、[[entities/common_sdk|common_sdk]] 等内部 SDK 协同工作，并集成 [[entities/langchain|langchain]] 和 [[entities/langgraph|langgraph]] 构建完整的 AI 应用后端。

## 相关实体
- [[entities/common_sdk|common_sdk]]
- [[entities/ai_sdk|ai_sdk]]
- [[entities/langchain|langchain]]
- [[entities/langgraph|langgraph]]
- [[entities/fastapi|FastAPI]]
- [[entities/tortoise-orm|Tortoise ORM]]
- [[entities/pydantic|Pydantic]]
- [[entities/redis|Redis]]

## 相关概念
- [[concepts/异步io|异步IO]]
- [[concepts/asyncawait|async/await]]
- [[concepts/应用入口与配置|应用入口与配置]]
- [[concepts/函数式编程|函数式编程]]
- [[concepts/声明式路由|声明式路由]]

## 来源提及

> **来源: [[sources/应用开发规范_3bea14|应用开发规范]]**
> - "技术栈：sanic，asyncio，langgraph，langchain"
> - "在 service/http/ 目录下，为每个模块（如 KB、Policy、User）用 Sanic Blueprint 定义 RPC 风格的路由："
> - "在 **Sanic 的 Exception Middleware**统一捕获所有异常，避免向前端抛出未处理的系统异常。"

> **来源: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]**
> - "api/FastAPI/Sanic入口"

> **来源: [[sources/cursor提示词_bf3f6f|cursor提示词]]**
> - "使用 Sanic 的生命周期事件 `@app.listener('before_server_start')` 和 `@app.listener('after_server_stop')` 来管理启动和关闭事件。"
> - "通过异步函数处理 I/O 绑定任务、缓存策略和延迟加载来优化性能。"
> - "依赖 Sanic 的请求上下文系统管理状态和共享资源。"