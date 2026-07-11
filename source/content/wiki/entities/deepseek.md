---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"]
tags: [organization]
aliases:
  - "深度求索"
  - "DeepSeek AI"
---


# DeepSeek

## 基本信息
- Type: organization
- Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]

## 描述

DeepSeek（深度求索）是一家国产大模型研发企业，在本文中被提及为企业在 MVP 阶段 Agent Runtime 直接调用其 API 的模型服务提供方之一。它与 OpenAI 并列为模型服务的典型选项，代表了国产大模型在企业 Agent 应用架构中的实际落地场景。在企业架构演进中，DeepSeek 可作为底层模型选项，通过 [[concepts/ai网关|AI网关]] 实现统一管控与模型路由，支持在 OpenAI 不可用时自动切换至国产模型。其 API 服务可通过 [[entities/higress|Higress]] 等网关进行流量管理与模型路由，保障企业 Agent 系统的高可用性。

## 相关实体
- [[entities/higress|Higress]]

## 相关概念
- [[concepts/ai网关|AI网关]]
- [[concepts/模型路由|模型路由]]

## 来源提及
- "**MVP 阶段（下沉至 Runtime 层）：** Agent Runtime 直接配置 OpenAI/DeepSeek 的 API Key，点对点调用。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]
- "**统一管控：** 屏蔽底层模型差异（OpenAI 挂了自动切 Azure，或者切国产模型），实现**模型路由**。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]