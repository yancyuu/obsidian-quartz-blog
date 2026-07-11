---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0426🧘以人为中心的agent_d84722]]"]
tags: [standard]
aliases:
  - "智能体协议"
  - "Agent通信协议"
---


# Agent Protocol

## 定义
Agent Protocol 是由 [[entities/langchain|LangChain]] 推出的智能体通信协议，旨在标准化 Agent 系统之间的通信方式。其核心理念是将 n 个 Agent 与 m 个工具之间的连接复杂度从 n×m 的网状拓扑简化为 n+m 的星型拓扑，从而大幅降低智能体生态系统中系统集成的工程复杂度。

## 关键特征
- **复杂度降维**：将 n 个 Agent 与 m 个工具的连接复杂度从 n×m 简化为 n+m，消除网状耦合，实现即插即用式的集成
- **标准化通信**：为 Agent 之间的消息格式、调用约定和数据交换提供统一的接口规范
- **生态协同**：与 [[concepts/mcp|MCP]]（Model-Context-Protocol）以及 AGNTCY 联盟的标准化方向保持一致，共同构筑智能体时代的通信基础设施
- **开放互通**：作为公开协议，支持跨框架、跨平台的 Agent 互操作

## 应用
- **多智能体系统集成**：在 [[concepts/多智能体协作|多智能体协作]] 场景中，不同框架或不同团队开发的 Agent 可通过统一协议无缝对接
- **工具生态接入**：第三方工具开发者只需实现一次协议适配，即可被生态内的所有 Agent 调用
- **跨平台 Agent 部署**：支持企业将不同供应商的 Agent 组件编排到统一的业务流程中
- **Agent 服务化**：配合 [[concepts/a2a|A2A]] 协议，实现 Agent 作为网络服务的发现、注册与远程调用

## 相关概念
- [[concepts/mcp|MCP]]
- [[concepts/a2a|A2A]]
- [[concepts/多智能体协作|多智能体协作]]

## 相关实体
- [[entities/langchain|LangChain]]
- [[entities/agntcy|AGNTCY]]

## 来源提及
- "LangChain 推出 Agent Protocol" — [[sources/2025-0426🧘以人为中心的agent_d84722|2025-0426🧘以人为中心的agent_d84722]]
- "能将 n 个 Agent 与 m 个工具的连接复杂度，从 n × m 简化为 n + m。" — [[sources/2025-0426🧘以人为中心的agent_d84722|2025-0426🧘以人为中心的agent_d84722]]