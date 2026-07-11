---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"
tags:
  - "product"
aliases:
  - "AI网关"
  - "Higress AI网关"
---

## 描述

Higress 是一种企业级 AI 网关产品，作为 Agent 架构从 MVP 阶段迈向企业级阶段时的关键基础设施组件。在早期 MVP 阶段，[[concepts/agent|Agent]] 的运行时可以直接配置 API Key 点对点调用模型服务，但一旦进入企业级落地阶段，就必须引入 AI 网关作为所有 Agent 访问模型服务（LLM/LVM/ASR）的唯一出口。

Higress 的核心职责包括：屏蔽底层模型差异，实现模型路由（例如当 OpenAI 服务不可用时自动切换至 Azure 或国产模型），同时支持 Token 额度管控、计费策略配置以及敏感词过滤（DLP）等企业治理功能。它支持三类角色协同工作：开发者（申请 Token、调试 Prompt）、管理者（限制 Token 额度、配置计费策略）和安全员（过滤敏感词 DLP 防止数据泄露）。它与 [[concepts/mcp|MCP]] 协议、[[entities/nacos|Nacos]] 等组件共同构成了企业级 Agent 架构的治理底座。

## 相关实体
- [[entities/nacos|Nacos]]

## 相关概念
- [[concepts/ai网关|AI网关]]
- [[concepts/模型路由|模型路由]]
- [[concepts/agent运行时|Agent运行时]]
- [[concepts/agent|Agent]]
- [[concepts/mcp|MCP]]

## 来源提及

> **Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]**
> - "必须引入 AI 网关（如 Higress/Zuplo/自研）。"
> - "**统一管控：** 屏蔽底层模型差异（OpenAI 挂了自动切 Azure，或者切国产模型），实现**模型路由**。"
> - "**定义：** AI 网关是企业所有 Agent 访问模型服务（LLM/LVM/ASR）的唯一出口。"
> - "**企业级阶段（网关/注册中心介入）：** 必须引入 AI 网关（如 Higress/Zuplo/自研）。"
> - "**安全员：** 过滤进出模型的敏感词（DLP），防止数据泄露。"