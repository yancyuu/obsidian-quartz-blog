---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [product]
aliases:
  - "Agent主文件"
  - "agent核心文件"
---


# agent.py

## 基本信息
- Type: product
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述
agent.py 是每个具体业务 Agent（如 coding_agent、research_agent）目录下的核心文件，承载该 Agent 的核心业务逻辑。每个 agent.py 与同目录下的 [[entities/tools-py|tools.py]]（工具绑定）、[[entities/prompts-py|prompts.py]]（专用 Prompt）和专用测试共同构成一个完整的业务闭环。这种每个 Agent 自包含 Prompt/Tool/Logic 的设计模式，使得各个 Agent 可以独立开发、测试和部署，体现了[[concepts/核心逻辑剥离|核心逻辑剥离]]的工程思想，实现了模块间的解耦与高内聚。

## 相关实体
- [[entities/coding-agent|coding_agent]]
- [[entities/research-agent|research_agent]]
- [[entities/tools-py|tools.py]]
- [[entities/prompts-py|prompts.py]]

## 相关概念
- [[concepts/核心逻辑剥离|核心逻辑剥离]]
- [[concepts/路由架构与按需加载|路由架构与按需加载]]

## 来源提及
- "agent.py" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "agent.py 核心逻辑" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "业务闭环: 每个 Agent 包含自己的Prompt/Tool/Logic" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]