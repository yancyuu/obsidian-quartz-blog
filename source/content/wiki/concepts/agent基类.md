---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [method]
aliases:
  - "base_agent.py"
  - "Base Agent Class"
  - "Agent Base Class"
---


# Agent基类

## 定义
Agent 基类定义在 core-agent 模块的 base_agent.py 中，是所有具体业务 Agent 的父类。它封装了 Agent 的通用行为和能力，包括与 LLM 的交互、工具调用流程、记忆管理等基础功能。具体的业务 Agent（如 coding_agent、research_agent）通过继承基类来复用这些通用能力，同时实现自己的特定逻辑。

## 关键特征
- **通用能力封装**：将与 LLM 交互、工具调用、记忆管理等公共逻辑统一封装在基类中，避免重复实现。
- **继承式复用**：具体业务 Agent 通过继承基类自动获得通用能力，只需聚焦于自身特定逻辑的实现。
- **模块化定位**：位于 core-agent 模块中，作为整个 Agent 应用架构的核心基础设施层。
- **关注点分离**：基类处理"怎么做"（执行流程），子类决定"做什么"（业务逻辑），实现清晰的职责划分。

## 应用
- 开发新的业务 Agent（如 coding_agent、research_agent）时，继承 Agent 基类即可快速获得 LLM 调用与工具执行能力，无需从零搭建。
- 在团队协作中，基类作为统一约定，确保所有 Agent 实现一致的交互协议和行为规范，降低维护成本。

## 相关概念
- [[concepts/模块化先于服务化|模块化先于服务化]]
- [[concepts/核心逻辑剥离|核心逻辑剥离]]

## 相关实体
*暂无相关实体*

## 来源提及
- "base_agent.py / Agent基类" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "core-agent/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]