---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f]]"]
tags: [standard]
aliases:
  - "Agent-to-Agent"
  - "Agent2Agent"
---


# A2A

## 定义
A2A（Agent-to-Agent）是 Google 发布的智能体间通信协议，使用 HTTP + SSE + JSON-RPC 实现智能体之间的异步协作。它规范了 Agent 能力描述（AgentCard）、任务分发（send/sendSubscribe）、流式返回消息或工件（Artifact）以及长期任务处理等标准交互机制。

## 关键特征
- 基于 HTTP + SSE + JSON-RPC 实现智能体间异步协作通信
- 通过 AgentCard 标准化描述 Agent 的能力与元数据
- 支持任务分发（send / sendSubscribe）与流式返回
- 擅长处理"非结构化长任务"，如用户对话衍生子任务后由多 Agent 协作完成
- 不适合企业主链路场景：调用链复杂、状态追踪困难、Agent 可用性未必稳定，且缺乏负载治理机制

## 应用
- 多智能体协作完成开放式、非结构化的长周期任务
- 用户对话驱动的子任务拆解与多 Agent 协同回复
- 通过 [[concepts/mcp|mcp]] 将 A2A 调用转译为工具调用，实现日志追踪与权限审计的工程实践

## 相关概念
- [[concepts/mcp|mcp]]

## 相关实体
- [[entities/fastmcp|fastmcp]]

## 来源提及
- "最近，Google 发布的 A2A（Agent-to-Agent）协议，以及 Anthropic 主导的 MCP（Model Context Protocol）引起了业界广泛关注" — [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]
- "A2A 使用 HTTP + SSE + JSON-RPC 实现智能体之间异步协作" — [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]
- "A2A 擅长处理'非结构化长任务'，如：用户对话 → 衍生子任务 → 多Agent协作完成回复" — [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]