---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"
  - "[[sources/01-把信仰交给-ai-的血泪教训_558fff]]"
tags:
  - "method"
aliases:
  - "Observability"
  - "可观测平台"
  - "Agent Observability"
  - "Agent观测体系"
---

## Description

Agent观测平台是企业级Agent治理的基础设施，负责监控Agent运行的全链路数据。作为"组件铁三角"之一，它汇聚来自[[entities/higress|AI网关]]的Token消耗数据和来自Runtime的工具执行结果数据，实现成本管理和效果评估。

观测平台的核心原则是**不能只关注Agent的最终回答结果，而要追踪其完整执行过程**——即"脑子"（意图）、"眼睛"（检索）和"手"（工具）的全部行为。通过建立四类埋点（意图/检索/工具/回复）和"4+1"核心指标（成功率、P95延时、成本/任务CPT、误导率Hallucination、用户步骤UserSteps），将Agent从不可解释的"黑盒"转化为可追踪、可分析的"白盒"。

缺乏观测体系会导致所有优化沦为盲目调整Prompt，线上问题无法定位。只有在观测平台上建立完整的内部事件流追踪，企业才能实现Agent的精细化运维、成本控制和合规审计，为治理决策提供可靠的数据依据。

## Related Concepts
- [[concepts/agent|Agent]]
- [[concepts/全链路追踪|全链路追踪]]
- [[concepts/评估机制|评估机制]]

## Related Entities
- [[entities/higress|AI网关]]

## Mentions in Source

> **Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|Agent企业落地架构变革]]**
> - "Agent 观测平台 (Observability)：监控"Token 消耗（来自 AI 网关）"和"工具执行结果（来自 Runtime）"的全链路数据。"

> **Source: [[sources/01-把信仰交给-ai-的血泪教训_558fff|把信仰交给AI的血泪教训]]**
> - "深层原因：只关注了 **结果（黑盒）**，没有关注 **内部事件流（白盒）**。"
> - "别只看 Agent 的嘴（最终回答），要看它的 **脑子（意图）**、**眼睛（检索）** 和 **手（工具）** 做了什么。"
> - "四类埋点（**意图/检索/工具/回复**）；**"4+1"指标**（成功率、P95 延时、成本/任务 CPT、误导率 Hallucination、用户步骤 User Steps）。"