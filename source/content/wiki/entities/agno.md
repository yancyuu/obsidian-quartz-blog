---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [product]
aliases:
  - "Phidata"
  - "Agno框架"
---


# Agno

## 基本信息
- Type: product
- Source: [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式_4e2181]]

## 描述
Agno（原 Phidata）是一个轻量级的 AI Agent 编排框架，在[[concepts/可逃逸架构|可逃逸架构]]设计模式中被提及。在"框架大逃杀"压力测试场景中，Agno 被要求作为[[entities/langgraph|LangGraph]]的替代方案，团队需在限时内将业务逻辑从 LangGraph 迁移到 Agno 或 Python 原生代码中，以验证架构是否遵循了[[concepts/模块解耦|模块解耦]]原则并避免了框架锁定。Agno 与[[entities/pydantic-ai|Pydantic AI]]、[[entities/langchain|LangChain]]同属 AI 生态中快速迭代的新兴 Agent 编排框架。

## 相关实体
- [[entities/langgraph|LangGraph]]
- [[entities/pydantic-ai|Pydantic AI]]
- [[entities/langchain|LangChain]]

## 相关概念
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/模块解耦|模块解耦]]
- [[concepts/agent编排框架|Agent编排框架]]

## 来源提及
- "Agent 框架（无论是 LangChain 还是 Agno）仅仅作为'胶水'来调用这些函数。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式_4e2181]]
- "当我们需要把底层模型从 GPT-4 换成 DeepSeek，或者把编排框架从 LangGraph 换成 PydanticAI 时，必须在 24 小时内完成迁移，且业务核心逻辑代码 0 修改。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式_4e2181]]
- "现在的 LangGraph 太重了，我要你把目前的业务逻辑迁移到简单的 Agno 或者 Python 原生代码里。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式_4e2181]]