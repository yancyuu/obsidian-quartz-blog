---
type: entity
created: 2026-06-21
updated: 2026-06-22
sources:
  - "[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"
  - "[[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]"
tags:
  - "product"
aliases:
  - "LangGraph"
  - "LangGraph Framework"
---

## 描述
LangGraph 是用于构建复杂 LLM 工作流的框架，在来源文档的架构演进路径中被定位为"功能扩展"阶段的技术栈。其核心优势在于支持复杂工作流编排和状态管理，适用于需要复杂业务逻辑的场景。然而，该框架存在学习曲线陡峭、调试复杂等痛点。在企业级 Agent 重构实践中，团队评估了 LangGraph 作为流程编排方案，但最终选择自研轻量级 FSM 来替代它。评估发现 LangGraph 在确定性方面为中等（依赖图结构，灵活性高但易失控），可观测性中等（调试需要专用工具链），且不支持热更新（通常需重启服务）。团队认为 LangGraph 更适合开放式创意写作、弱逻辑对话等场景，而非金融交易、订单流转等强业务逻辑。与 [[entities/Dify|Dify]] 和 [[entities/Pydantic-AI|Pydantic-AI]] 同为 Agent 架构建选中的候选方案。

## 相关实体
- [[entities/Dify|Dify]]
- [[entities/Pydantic-AI|Pydantic-AI]]
- [[entities/GPT-4|GPT-4]]

## 相关概念
- [[concepts/Agentic-RAG|Agentic RAG]]
- [[concepts/有限状态机|有限状态机]]
- [[concepts/灰度与回滚|灰度与回滚]]

## 来源提及

> **Source: [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]**
> - "功能扩展|LangGraph|复杂工作流、状态管理|学习曲线陡峭、调试复杂|复杂业务逻辑"
> - "LangGraph|复杂工作流、状态管理"

> **Source: [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02-我们将企业级-agent-降低85%的血泪重构史]]**
> - "在流程编排选型上，我们评估了 LangGraph，但最终选择**自研轻量级 FSM（有限状态机）**。"
> - "**热更新**|**支持**（配置存储于 Redis，动态生效）|不支持（通常需重启服务）"
> - "**适用场景**|金融交易、订单流转等强业务逻辑|开放式创意写作、弱逻辑对话"