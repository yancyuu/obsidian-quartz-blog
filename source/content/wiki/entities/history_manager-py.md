---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [product]
aliases:
  - "历史管理器"
  - "Redis历史"
---


# history_manager.py

## 基本信息
- **类型**: product（产品/组件）
- **来源**: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述
`history_manager.py` 是 Agent 应用架构中 `memory-context/` 目录下的核心文件，在架构图中标注为"Redis历史"。该文件负责管理 Agent 对话的持久化历史记录，以 [[entities/redis|Redis]] 作为存储后端，实现对话状态的可靠持久化。它在整个 Agent 架构中承担着上下文管理和状态保存的双重职责，确保 Agent 能够在多轮对话中保持上下文的连贯性。作为实现长时记忆功能的关键组件，它为 [[concepts/历史上下文检索|历史上下文检索]] 提供了底层数据支撑。

## 相关实体
- [[entities/redis|Redis]] — 该组件使用的存储后端

## 相关概念
- [[concepts/状态持久化|状态持久化]] — 该文件实现的核心能力
- [[concepts/长时记忆|长时记忆]] — 该组件支撑的功能目标
- [[concepts/历史上下文检索|历史上下文检索]] — 依赖该组件提供的数据基础

## 来源提及
- "memory-context/ ^BxdAqxFw" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "history_manager.py" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "Redis历史 ^c9sxft9v" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]