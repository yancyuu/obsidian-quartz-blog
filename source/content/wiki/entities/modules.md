---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [project]
aliases:
  - "modules模块"
  - "通用功能模块"
---


# modules

## 基本信息
- Type: project
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述
`modules/` 是 Agent 应用架构图中的通用功能模块目录，是[[concepts/路由架构与按需加载|路由架构与按需加载]]中 Worker 层的核心实现位置。该目录包含 `orchestration/`（编排模块）、`memory-context/`（记忆与上下文模块）、`tools-actions/`（工具与动作模块）以及 `schemas/`（通用 Schema 定义）等子模块。工具定义集中在此模块中，而 Agent 仅引用 Schema，从而实现了[[concepts/函数与工具区分|工具层与 Agent 逻辑的解耦]]。这种设计使得工具可以独立演化和替换，体现了[[concepts/临时组件|可逃逸设计]]的核心理念。

## 相关实体
（暂无直接关联的实体页面）

## 相关概念
- [[concepts/路由架构与按需加载|路由架构与按需加载]] — modules 中的 orchestration 模块负责 L1 路由后的任务编排
- [[concepts/函数与工具区分|函数与工具区分]] — tools-actions 子模块体现了函数与工具分离的设计原则
- [[concepts/json-schema|json-schema]] — schemas 子模块集中定义通用 Schema，Agent 仅引用 Schema 实现解耦
- [[concepts/临时组件|临时组件]] — modules 中的工具模块作为可替换组件，体现可逃逸架构理念
- [[concepts/核心逻辑剥离|核心逻辑剥离]] — 工具定义集中在 modules 中而 Agent 只引用 Schema，是核心逻辑与框架解耦的实践

## 来源提及
- "modules/ 通用功能模块 ^egrJd9PL" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "orchestration/ ^kRUPsbYL" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "memory-context/ ^BxdAqxFw" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "tools-actions/ ^NG0EIIrp" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "schemas/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "通用Schema定义 ^WbnJss5M" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]