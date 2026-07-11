---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0312-💆copilot和agent的区别_750b52]]"]
tags: [term]
aliases:
  - "智能体"
  - "自治智能体"
---


# Agent

## 定义
Agent（智能体）是一种类似自治体的 AI 范式，具备感知-推理-决策-执行的完整闭环。其核心定位是"数字员工"或"自动执行体"，目标是代替人类完成任务甚至自主发现任务。与 Copilot 的被动辅助模式不同，Agent 采取主动执行型的工作方式——用户只需提供目标，Agent 即可自主实现。

## 关键特征
- **自主运行**：支持定时触发、事件触发及反向调用等多种自主启动方式，无需人工逐步干预。
- **完整闭环**：具备感知-推理-决策-执行动作的完整流程闭环，能够端到端地处理复杂任务。
- **任务流程管理**：强调多工具协同与任务流程编排，通常配备 planner / router / task scheduler 等核心组件。
- **记忆与状态持久化**：可具备短期记忆与长期记忆，支持状态的持久化保存，使跨会话的连续任务执行成为可能。
- **强自治性**：能够自主感知环境并做出决策，具有高度的独立执行能力。

## 应用
- **自动化业务流程**：作为"数字员工"接管重复性或规则明确的企业业务流程。
- **多工具协同执行**：在复杂任务场景中，自主调度多种 API、数据库及外部工具完成端到端任务。
- **主动式任务处理**：基于定时或事件触发机制，持续监控环境变化并主动响应，如自动化运维、数据监控告警等。

## 相关概念
- [[concepts/function-call|function-call]] — Function Calling
- [[concepts/react|react]] — ReAct框架
- [[concepts/multi-agent-rag|multi-agent-rag]] — 多智能体RAG
- [[concepts/agentic-rag|agentic-rag]] — 智能体RAG

## 相关实体
- [[entities/autogpt|autogpt]] — AutoGPT
- [[entities/langgraph-agent|langgraph-agent]] — LangGraph Agent

## 来源提及
- "类似自治体，具备感知 - 推理 - 决策 - 执行动作完整闭环" — [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312 💆Copilot和Agent的区别]]
- "人 <- Agent：你给我目标，我帮你实现 ✅ 主动执行型" — [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312 💆Copilot和Agent的区别]]
- "Agent 是具备一定自主性的任务执行者。" — [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312 💆Copilot和Agent的区别]]