---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [project]
aliases:
  - "coding_agent模块"
  - "代码代理"
---


# coding_agent

## 基本信息
- Type: project
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]

## 描述
coding_agent 是 Agent 应用架构中位于 `agents/` 目录下的一个具体业务代理模块，专门用于代码编写和代码相关任务的执行。该模块拥有独立的 `agent.py` 核心逻辑文件，是业务代理层的典型组成部分。它与 [[entities/research_agent|research_agent]] 并列存在，共同展示了该架构对多类型业务 Agent 的支持能力。作为 [[concepts/业务闭环|业务闭环]] 中的具体执行单元，coding_agent 将 [[concepts/核心逻辑剥离|核心逻辑]] 封装在模块内部，实现了业务代理的独立性与可扩展性。

## 相关实体
- [[entities/research_agent|research_agent]]

## 相关概念
- [[concepts/业务闭环|业务闭环]]
- [[concepts/核心逻辑剥离|核心逻辑剥离]]

## 来源提及
- "agents/ 具体业务代理" — [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]
- "coding_agent/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]
- "agent.py" — [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]