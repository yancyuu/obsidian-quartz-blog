---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/渐进式披露架构_780a26]]"]
tags: [product]
aliases:
  - "库存服务"
  - "📦 Inventory Service"
---


# Inventory Service

## 基本信息
- Type: product
- Source: [[sources/渐进式披露架构_780a26|渐进式披露架构_780a26]]

## 描述

Inventory Service（库存服务）是 [[entities/Capability-Layer|Capability Layer]] 中的一个具体 MCP Server 实例。在该架构中，它作为后端业务能力的一部分，通过 [[concepts/路由架构与按需加载|路由架构与按需加载]] 的方式被 Agent Runtime 按需调用。当用户请求涉及"查库存"等业务意图时，Agent Runtime 会动态建立连接并调用该服务，体现了 [[concepts/按需加载|按需加载]] 的核心理念。它与 [[entities/CRM-Service|CRM Service]]、[[entities/RPA-Worker|RPA Worker]] 等共同构成了智能体架构中的能力层，代表了后端业务系统与智能体对接的典型模式。

## 相关实体
- [[entities/Capability-Layer|Capability Layer]]
- [[entities/CRM-Service|CRM Service]]
- [[entities/RPA-Worker|RPA Worker]]

## 相关概念
- [[concepts/MCP-Protocol|MCP Protocol]]
- [[concepts/按需加载|按需加载]]

## 来源提及
- "📦 Inventory Service ^IF87dWzR" — [[sources/渐进式披露架构_780a26|渐进式披露架构_780a26]]
- "活特定技能: 查库存 ^LJH91lzi" — [[sources/渐进式披露架构_780a26|渐进式披露架构_780a26]]