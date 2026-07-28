---
type: entity
created: 2026-06-21
updated: 2026-07-28
sources:
  - "[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"
  - "[[sources/“可逃逸架构”设计模式_4e2181]]"
tags:
  - "organization"
aliases:
  - "深度求索"
  - "DeepSeek AI"
---

## 描述

DeepSeek（深度求索）是一家国产大模型研发企业，在多篇文献中被提及为企业 Agent 架构中的典型模型服务选项。在企业 MVP 阶段，Agent Runtime 可直接调用其 API，与 OpenAI 并列为模型服务的常见选项。在企业架构演进中，DeepSeek 可作为底层模型，通过 [[concepts/ai网关|AI网关]] 实现统一管控与模型路由，保障系统高可用性。

DeepSeek V3 的发布对 AI 行业格局产生了巨大冲击——性能逼近 GPT-4，成本却仅为其零头。这一事件也直接催生了 [[concepts/可逃逸架构|可逃逸架构]] 的工程实践：当老板要求"马上切过去"时，紧耦合架构的高昂重构成本被充分暴露，促使团队追求 24 小时内完成模型迁移且业务核心逻辑零修改的架构能力。这体现了 [[concepts/模型无关性|模型无关性]] 在 AI 工程化中的核心价值。

## 相关实体
- [[entities/higress|Higress]]
- [[entities/gpt-4|GPT-4]]
- [[entities/langgraph|LangGraph]]
- [[entities/pydantic-ai|Pydantic AI]]

## 相关概念
- [[concepts/ai网关|AI网关]]
- [[concepts/模型路由|模型路由]]
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/模型无关性|模型无关性]]

## 来源提及

> **Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]**
> - "**MVP 阶段（下沉至 Runtime 层）：** Agent Runtime 直接配置 OpenAI/DeepSeek 的 API Key，点对点调用。"
> - "**统一管控：** 屏蔽底层模型差异（OpenAI 挂了自动切 Azure，或者切国产模型），实现**模型路由**。"

> **Source: [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]**
> - "去年，Deepseek 横空出世，性能逼近 GPT-4，成本却是零头。"
> - "老板在群里问了一句：'我们能马上切过去吗？'"
> - "当我们需要把底层模型从 GPT-4 换成 DeepSeek，或者把编排框架从 LangGraph 换成 PydanticAI 时，必须在 24 小时内完成迁移，且业务核心逻辑 0 修改。"