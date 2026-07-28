---
type: entity
created: 2026-06-21
updated: 2026-07-28
sources:
  - "[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"
  - "[[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f]]"
  - "[[sources/“可逃逸架构”设计模式_4e2181]]"
tags:
  - "product"
aliases:
  - "Pydantic-AI"
  - "PydanticAI"
---

## 描述

Pydantic-AI 是一个基于 Python 类型验证库 Pydantic 构建的 AI Agent 框架，强调结构化数据输出和类型安全。它被视为开发 Agent 的轻量级框架，在类型安全、开发效率和可维护性方面表现突出，适合企业级应用。在可逃逸架构设计模式中，Pydantic-AI 与 Agno 并列作为 [[entities/langgraph|LangGraph]] 的替代方案，体现了编排框架的可替换性原则——当需要从 LangGraph 迁移到 Pydantic-AI 时，应能在 24 小时内完成且业务核心逻辑代码零修改。同时，在后端状态管理规范中，要求 Agent 的 `response_model` 必须强制指定 Pydantic 对象，严禁依赖 Prompt 让 AI 返回纯文本后用正则解析，以确保数据交互的结构化和可靠性。

## 相关实体

- [[entities/dify|Dify]]
- [[entities/langgraph|LangGraph]]
- [[entities/pydantic|Pydantic]]
- [[entities/agno|Agno]]

## 相关概念

- [[concepts/agentic-rag|Agentic RAG]]
- [[concepts/有限状态机|有限状态机]]
- [[concepts/模块化先于服务化|模块化先于服务化]]
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/模块解耦|模块解耦]]

## 来源提及

> **Source: [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]**
> - "生产就绪|Pydantic-AI|类型安全、开发效率、可维护|相对新兴|企业级应用"
> - "Pydantic-AI|类型安全、开发效率、可维护"

> **Source: [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]**
> - "不过目前用了padantic-ai，觉得可以代替手搓，成为开发Agent的必备轻量级AI框架。"
> - "自定义状态机方案（或者用轻量级的框架，pydantic ai就不错）反而更灵活、响应更快。"

> **Source: [[sources/“可逃逸架构”设计模式_4e2181|"可逃逸架构"设计模式]]**
> - "当我们需要把底层模型从 GPT-4 换成 DeepSeek，或者把编排框架从 LangGraph 换成 PydanticAI 时，必须在 24 小时内完成迁移，且业务核心逻辑代码 0 修改。"
> - "Agent 的 response_model 必须强制指定 Pydantic 对象，严禁依赖 Prompt 让 AI 返回纯文本然后用正则去解析。"