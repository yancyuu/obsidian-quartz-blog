---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/渐进式披露架构_780a26]]"]
tags: [other]
aliases:
  - "能力层"
  - "Capability Layer - MCP Servers"
---


# Capability Layer

## 基本信息
- Type: other
- Source: [[sources/渐进式披露架构_780a26|渐进式披露架构]]

## 描述
Capability Layer（能力层）是[[concepts/渐进式披露架构|渐进式披露架构]]中最底层的基础设施层，由多个 MCP Servers 组成。该层包含了各种具体的业务服务，如库存服务（Inventory Service）、CRM 服务和 RPA Worker。能力层通过 MCP/OpenAPI 标准协议与上层的 Agent Runtime 进行通信，提供具体的业务执行能力。这一层的设计体现了[[concepts/工具解耦|工具解耦]]的核心理念——将工具与智能体分离，使得工具可以独立演化、独立替换，是[[concepts/可逃逸架构|可逃逸架构]]的基础支撑。

## 相关实体
- [[entities/Inventory Service|Inventory Service]]
- [[entities/CRM Service|CRM Service]]
- [[entities/RPA Worker|RPA Worker]]

## 相关概念
- [[concepts/MCP Protocol|MCP Protocol]]
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/工具解耦|工具解耦]]

## 来源提及
- "Capability Layer - MCP Servers ^IKHdVU" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]
- "📦 Inventory Service ^IF87dWzR ... 👥 CRM Service ^mSkdjNqW ... 🤖 RPA Worker ^hB5i6S6" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]