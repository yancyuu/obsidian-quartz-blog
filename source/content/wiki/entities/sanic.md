---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/应用开发规范_3bea14]]"
  - "[[sources/agent-app代码结构_c030b6]]"
tags:
  - "product"
aliases:
  - "Sanic框架"
  - "Sanic Web Framework"
---

## 描述
Sanic 是一个基于 Python 的高性能异步 Web 框架，在本代码规范中被指定为后端项目的核心[[concepts/技术栈|技术栈]]之一，与 asyncio 配合使用以实现高并发的请求处理。在 Agent 应用架构中，Sanic 作为 API 入口选项之一与 [[entities/fastapi|FastAPI]] 并列出现，位于应用入口与配置层，负责处理 HTTP 请求的接收和分发。规范要求在 Sanic 中使用 Blueprint 为每个模块（如 KB、Policy、User）定义 RPC 风格的 HTTP+JSON 路由，确保路由的模块化和可维护性。此外，规范要求通过 Sanic 的 Exception Middleware 统一捕获所有异常，避免向前端抛出未处理的系统异常，从而保证服务的健壮性和安全性。Sanic 常与 [[entities/ai_sdk|ai_sdk]]、[[entities/common_sdk|common_sdk]] 等内部 SDK 协同工作，并集成 [[entities/langchain|langchain]] 和 [[entities/langgraph|langgraph]] 构建完整的 AI 应用后端。

## 相关实体
- [[entities/common_sdk|common_sdk]]
- [[entities/ai_sdk|ai_sdk]]
- [[entities/langchain|langchain]]
- [[entities/langgraph|langgraph]]
- [[entities/fastapi|FastAPI]]

## 相关概念
- [[concepts/异步io|异步IO]]
- [[concepts/asyncawait|async/await]]
- [[concepts/应用入口与配置|应用入口与配置]]

## 来源提及

> **来源: [[sources/应用开发规范_3bea14|应用开发规范]]**
> - "技术栈：sanic，asyncio，langgraph，langchain"
> - "在 service/http/ 目录下，为每个模块（如 KB、Policy、User）用 Sanic Blueprint 定义 RPC 风格的路由："
> - "在 **Sanic 的 Exception Middleware**统一捕获所有异常，避免向前端抛出未处理的系统异常。"

> **来源: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]**
> - "api/FastAPI/Sanic入口"