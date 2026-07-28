---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/渐进式披露架构_780a26]]"]
tags: [product]
aliases:
  - "CRM 服务"
  - "👥 CRM Service"
  - "客户关系管理服务"
---


# CRM Service

## 基本信息
- Type: product
- Source: [[sources/渐进式披露架构_780a26|渐进式披露架构]]

## 描述

CRM Service（客户关系管理服务）是 [[concepts/可逃逸架构|可逃逸架构]] 中 Capability Layer 的一个 MCP Server 实例。它通过标准化的 [[concepts/协议优于框架|MCP/OpenAPI 协议]] 向 Agent Runtime 暴露客户数据和业务管理能力，使智能体能够以工具调用的方式操作 CRM 相关的后端业务。作为能力层的一部分，它与 Inventory Service、RPA Worker 并列，共同构成智能体可调用的后端工具生态系统。这种设计遵循 [[concepts/核心逻辑剥离|核心逻辑剥离]] 原则，使业务服务能够独立演进和部署，而不影响 Agent 核心运行时。

## 相关实体
- [[entities/Capability-Layer|Capability Layer]]
- [[entities/Inventory-Service|Inventory Service]]
- [[entities/RPA-Worker|RPA Worker]]

## 相关概念
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/协议优于框架|MCP Protocol]]

## 来源提及
- "👥 CRM Service" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]
- "Capability Layer - MCP Servers" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]