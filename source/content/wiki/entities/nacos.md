---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"]
tags: [product]
aliases:
  - "MSE Nacos"
  - "Nacos服务注册中心"
---


# Nacos

## 基本信息
- Type: product
- Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]

## 描述

Nacos（文中特指 MSE Nacos）是一款企业级服务发现与配置管理产品，在 Agent 企业落地架构中被赋予了新的使命。它不仅负责注册传统的微服务（API），更被扩展增加了 [[concepts/mcp|mcp]] Registry 能力，成为连接现有业务系统与 Agent 生态的桥梁。通过元数据映射机制，Nacos 能够将企业现有的数百个 Java 微服务在 Agent 视角中"伪装"成 MCP 服务，从而实现现存业务的零改造接入。Agent [[concepts/agent运行时|运行时]] 在启动时会向 Nacos 请求特定业务域的工具列表，进而实现工具资源的统一发现与动态管理。这一机制使企业无需重构现有微服务架构，即可快速融入 [[concepts/a2a|a2a]] 与 Agent 驱动的全新范式。

## 相关实体
- [[entities/MCP|MCP]]
- [[entities/Higress|Higress]]

## 相关概念
- [[concepts/ai网关|AI网关]]
- [[concepts/agent运行时|Agent运行时]]
- [[concepts/mcp-registry|MCP Registry]]

## 来源提及
- "**MSE Nacos 的新使命：** 不仅注册传统的微服务（API），更要增加 **MCP Registry** 能力。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]
- "通过 Nacos 的元数据映射，将它们在 Agent 视角里"伪装"成 MCP 服务。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]