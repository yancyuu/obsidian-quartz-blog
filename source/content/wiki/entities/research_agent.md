---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [project]
aliases:
  - "research_agent模块"
  - "研究代理"
---


# research_agent

## 基本信息
- Type: project
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述
research_agent 是 Agent 应用架构中位于 `agents/` 目录下的一个具体业务代理模块，与 [[entities/coding_agent|coding_agent]] 并列存在。该模块专门面向信息检索和研究类任务场景，展示了一种通用的 Agent 实现范式。其内部结构与同级代理保持一致，包含核心逻辑文件 `agent.py`，以及配套的 `tools.py`（[[concepts/工具绑定|工具绑定]]）、`prompts.py` 和 `tests/` 测试目录，形成了完整的[[concepts/业务闭环|业务闭环]]。该模块的存在证明了此 Agent 应用架构在不同业务场景下的通用性和可扩展性——只需复用相同的目录骨架，即可快速搭建面向特定领域的代理模块，同时保持[[concepts/核心逻辑|核心逻辑]]的独立性和可维护性。

## 相关实体
- [[entities/coding_agent|coding_agent]]

## 相关概念
- [[concepts/业务闭环|业务闭环]]
- [[concepts/核心逻辑|核心逻辑]]
- [[concepts/工具绑定|工具绑定]]

## 来源提及
- "agents/ 具体业务代理" — [[架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]
- "research_agent/" — [[架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]
- "agent.py" — [[架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]