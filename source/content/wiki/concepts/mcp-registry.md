---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"]
tags: [method]
aliases:
  - "MCP注册中心"
  - "MCP服务注册"
---


# MCP Registry

## 定义
MCP Registry 是在 Nacos 注册中心中增加的 MCP 服务注册能力，用于统一管理工具资源，避免「工具孤岛」问题。通过元数据映射机制，企业现有的 Java 微服务无需修改代码即可在 Agent 视角下伪装成 MCP 服务。Agent Runtime 启动时向 Nacos 查询所需工具列表（包含 MCP 和 API），实现工具的动态发现和绑定。这一方法实现了现存业务系统的零改造接入。

## 关键特征
- **零改造接入**：企业现有的几百个 Java 微服务无需修改代码，即可被 Agent 发现和使用
- **元数据映射**：通过 Nacos 的元数据映射机制，将传统微服务在 Agent 视角中"伪装"成 MCP 服务
- **统一管理**：同时注册和管理传统微服务（API）与 MCP 服务，避免工具碎片化
- **动态发现**：Agent Runtime 启动时自动向 Nacos 查询所需工具列表，实现工具的动态绑定
- **双类型覆盖**：查询结果同时包含 MCP 和 API 两类工具资源

## 应用
- 企业 Agent 化改造场景：将存量微服务快速暴露给 Agent 使用，无需逐个适配 MCP 协议
- 工具治理：统一管理企业内部所有可被 Agent 调用的工具资源，避免「工具孤岛」
- Agent Runtime 初始化：Agent 启动时动态获取可用工具集，实现灵活的工具发现与调用

## 相关概念
- [[concepts/agent运行时|Agent Runtime]]
- [[concepts/mcp|MCP]]
- [[concepts/工具图谱|工具图谱]]

## 相关实体
- [[entities/nacos|Nacos]]

## 来源提及
- "MSE Nacos 的新使命：不仅注册传统的微服务（API），更要增加 **MCP Registry** 能力。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]
- "企业现有的几百个 Java 微服务，不需要改代码。通过 Nacos 的元数据映射，将它们在 Agent 视角里'伪装'成 MCP 服务。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]