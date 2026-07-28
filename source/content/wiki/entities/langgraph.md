---
type: entity
created: 2026-06-21
updated: 2026-07-28
sources:
  - "[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"
  - "[[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]"
  - "[[sources/应用开发规范_3bea14]]"
  - "[[sources/“可逃逸架构”设计模式_4e2181]]"
  - "[[sources/agent-app代码结构_c030b6]]"
tags:
  - "product"
aliases:
  - "LangGraph"
  - "LangGraph Framework"
---

## Description

LangGraph 是一个用于构建 Agent 工作流和编排图的框架，擅长处理复杂工作流和状态管理，常与 LangChain 配合使用。在 Agentic RAG 架构选型中，LangGraph 被列为适合复杂业务逻辑场景的编排工具，但其学习曲线陡峭、调试复杂。在实际企业级 Agent 重构中，团队评估了 LangGraph 但最终选择自研轻量级 FSM（有限状态机），因为 LangGraph 不支持热更新（通常需重启服务），且其"太重"的特性使其不适合金融交易、订单流转等强业务逻辑场景。

在 agent-app 代码结构中，LangGraph 被封装在 orchestration 模块的 `state_graph.py` 中，作为编排层的核心组件，负责管理 Agent 的状态流转和多步骤工作流编排，与意图路由模块协同工作以实现智能分发。在「可逃逸架构」设计模式中，LangGraph 被视为典型的需要被「逃逸」的框架——业务逻辑不能深度耦合在其 Node 和 Graph 结构中，以便随时迁移到 Agno、PydanticAI 等更轻量的方案。消防演习测试要求团队能在 24 小时内完成从 LangGraph 到其他框架的迁移，且业务核心逻辑零修改。

## 相关实体
- [[entities/Dify|Dify]]
- [[entities/Pydantic-AI|Pydantic-AI]]
- [[entities/GPT-4|GPT-4]]
- [[entities/LangChain|LangChain]]
- [[entities/Python|Python]]
- [[entities/Agno|Agno]]

## 相关概念
- [[concepts/Agentic-RAG|Agentic RAG]]
- [[concepts/有限状态机|有限状态机]]
- [[concepts/灰度与回滚|灰度与回滚]]
- [[concepts/异步io|异步IO]]
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/协议优于框架|协议优于框架]]
- [[concepts/核心逻辑剥离|核心逻辑剥离]]
- [[concepts/路由架构与按需加载|意图路由]]
- [[concepts/显式节点图|显式节点图]]

## 来源提及

> **Source: [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]**
> - "功能扩展|LangGraph|复杂工作流、状态管理|学习曲线陡峭、调试复杂|复杂业务逻辑"
> - "LangGraph|复杂工作流、状态管理"

> **Source: [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02-我们将企业级-agent-降低85%的血泪重构史]]**
> - "在流程编排选型上，我们评估了 LangGraph，但最终选择**自研轻量级 FSM（有限状态机）**。"
> - "**热更新**|**支持**（配置存储于 Redis，动态生效）|不支持（通常需重启服务）"
> - "**适用场景**|金融交易、订单流转等强业务逻辑|开放式创意写作、弱逻辑对话"

> **Source: [[sources/应用开发规范_3bea14|应用开发规范]]**
> - "技术栈：sanic，asyncio，langgraph，langchain"
> - "├── agent/              # 智能体模块（如有多个 Agent 组件）"

> **Source: [[sources/"可逃逸架构"设计模式_4e2181|"可逃逸架构"设计模式]]**
> - "因为业务逻辑耦合在 LangChain 的 Chain 里，因为 Prompt 严重依赖 128k 的超长上下文。"
> - "把编排框架从 LangGraph 换成 PydanticAI 时，必须在 24 小时内完成迁移，且业务核心逻辑 0 修改。"
> - "如果删掉 `import langgraph`，你的业务计算逻辑还能单独跑通单元测试吗？"
> - "现在的 LangGraph 太重了，我要你把目前的业务逻辑迁移到简单的 Agno 或者 Python 原生代码里。"

> **Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]**
> - "state_graph.py<br>LangGraph封装"
> - "orchestration/"