---
type: entity
created: 2026-06-21
updated: 2026-07-28
sources:
  - "[[sources/2025-0426🧘以人为中心的agent_d84722]]"
  - "[[sources/应用开发规范_3bea14]]"
  - "[[sources/“可逃逸架构”设计模式_4e2181]]"
tags:
  - "organization"
aliases:
  - "LangChain"
  - "LangChain AI"
---

## 描述
LangChain 是一个广泛使用的 AI 应用开发框架，提供 Chain、Agent 等核心抽象来构建大模型应用。在技术栈实践中，它常与 LangGraph、asyncio 等配合使用，用于编排大模型调用和工具链集成。然而，LangChain 也常被视为框架锁定的典型案例——许多团队将业务逻辑深度耦合在其 Chain 结构中，导致切换框架或模型时面临巨大的重构成本，这被列为 AI 项目中最大的技术债之一。在可逃逸架构的理念下，LangChain 等框架应仅作为"胶水"层调用独立的核心逻辑函数，而非承载业务本身。

## 相关实体
- [[entities/glean|Glean]]
- [[entities/agntcy|AGNTCY]]
- [[entities/langgraph|LangGraph]]
- [[entities/ai_sdk|ai_sdk]]
- [[entities/agno|Agno]]

## 相关概念
- [[concepts/mcp|MCP]]
- [[concepts/工具图谱|工具图谱]]
- [[concepts/多智能体协作|多智能体协作]]
- [[concepts/agent|Agent]]
- [[concepts/异步io|异步IO]]
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/协议优于框架|协议优于框架]]
- [[concepts/核心逻辑剥离|核心逻辑剥离]]

## 来源提及

> **Source: [[sources/2025-0426🧘以人为中心的agent_d84722|2025-0426🧘以人为中心的agent]]**
> - "LangChain 推出 Agent Protocol"
> - "Glean 提供 MCP 工具服务器"

> **Source: [[sources/应用开发规范_3bea14|应用开发规范]]**
> - "技术栈：sanic，asyncio，langgraph，langchain"
> - "ai_sdk/                 # ai-SDK：如大模型、向量搜索、AI能力封装"

> **Source: [[sources/“可逃逸架构”设计模式_4e2181|"可逃逸架构"设计模式]]**
> - "因为业务逻辑耦合在 LangChain 的 Chain 里，因为 Prompt 严重依赖 128k 的超长上下文。"
> - "Agent 框架（无论是 LangChain 还是 Agno）仅仅作为'胶水'来调用这些函数。"
> - "如果明天放弃 LangChain 改用 Python 原生代码写 Agent，你的 Tools 代码需要重写吗？"