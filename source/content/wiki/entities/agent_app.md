---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [project]
aliases:
  - "Agent应用"
  - "agent_app项目"
---


# agent_app

## 基本信息
- Type: project
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述
agent_app 是该 Excalidraw 架构图中展示的一个完整的 Agent 应用项目的顶层结构。该项目采用模块化设计，包含 agents（具体业务代理）、modules（通用功能模块）、core-agent（核心 Agent 模块）以及 orchestration（编排模块）等主要目录。整体架构遵循[[concepts/核心逻辑剥离|核心逻辑剥离]]原则，将 Tools 定义在 [[entities/modules|modules]] 中，Agent 只引用 Schema，从而实现核心逻辑与工具实现的解耦。每个 Agent 包含自己的 Prompt/Tool/Logic，形成[[concepts/业务闭环|业务闭环]]。该项目的入口层使用 FastAPI/Sanic，配置通过 settings.py 和 .env 管理。

## 相关实体
- [[entities/core-agent|core-agent]]
- [[entities/modules|modules]]
- [[entities/agents|agents]]

## 相关概念
- [[concepts/核心逻辑剥离|核心逻辑剥离]]
- [[concepts/业务闭环|业务闭环]]
- [[concepts/可逃逸设计|可逃逸设计]]
- [[concepts/模块解耦|模块解耦]]

## 来源提及
- "agent_app" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "业务闭环: 每个 Agent 包含自己的Prompt/Tool/Logic" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "可逃逸设计: Tools定义在 modules 中Agent 只引用 Schema" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]