---
type: concept
created: 2026-06-21
updated: 2026-06-25
sources:
  - "[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"
  - "[[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7]]"
tags:
  - "method"
aliases:
  - "AI原生架构"
  - "AI-Native Architecture"
  - "AI 原生工程"
---

## Description
AI Native 架构代表着从确定性工程向概率性工程的范式转变。在该架构下，系统的核心交互不再是确定性的"输入 A 必然得到输出 B"，而是以上下文驱动的概率性输出为基本范式。传统代码的角色发生根本性变化，从逻辑执行者降级为"粘合剂"（Glue Code），主要负责连接模型、工具与记忆系统。

这一架构不受遗留系统技术债务的束缚，可直接采用最先进的 AI 架构范式，将 LLM、Agent、模型路由、AI 网关等基础设施作为核心层进行统一规划。AI 能力从数据层、逻辑层到交互层贯穿整个技术栈，成为驱动业务逻辑的原生力量。与此同时，开发者的工作重心也随之转移：调试方式从设断点、查堆栈转变为查日志、调 Prompt 和增加 Few-Shot 样本；架构师的核心工作则聚焦于设计"防呆机制"和"思维链条"，以应对幻觉、上下文溢出和意图识别偏离等新型失败模式。

## Related Concepts
- [[concepts/存量改造|存量改造]]
- [[concepts/全新开发|全新开发]]
- [[concepts/模型路由|模型路由]]
- [[concepts/AI网关|AI网关]]
- [[concepts/确定性工程|确定性工程]]
- [[concepts/Agent编排|Agent编排]]
- [[concepts/幻觉控制|幻觉控制]]

## Related Entities
*暂无相关实体*

## Mentions in Source

> **Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]**
> - "**优势：** 不受历史债务束缚，可直接采用最先进的 **AI Native** 架构。"

> **Source: [[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7|08. 代码已死，系统永生：如何从"码农"进化为 "Agent 架构师"]]**
> - "AI 原生工程 (AI Native Engineering)：给出 Context A，期望 Output B (但可能得到 C)"
> - "代码作用：粘合剂 (Glue Code)：连接模型、工具与记忆"
> - "调试方式：设断点，查堆栈 → 查日志，调 Prompt，增加 Few-Shot 样本"