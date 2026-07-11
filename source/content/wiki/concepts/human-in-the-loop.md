---
type: concept
created: 2026-06-21
updated: 2026-06-25
sources:
  - "[[sources/2025-0426🧘以人为中心的agent_d84722]]"
  - "[[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060]]"
  - "[[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7]]"
tags:
  - "method"
aliases:
  - "人在环"
  - "人在回路"
  - "HITL"
---

## Description
Human-in-the-loop 是一种在高风险或关键操作中保留人类决策权的机制。该机制要求智能体在执行重要操作前主动向用户请求确认或审批，确保用户对系统的关键行为拥有最终控制权。在[[concepts/voc重构|VOC重构]]等实际业务场景中，该机制还表现为基于置信度阈值的动态分流——当智能体输出的置信度低于设定值（如0.8）时，任务自动转给人工确认，在最大化自动化率的同时确保数据准确性。从系统架构的视角来看，Human-in-the-loop 更是一种**容错设计模式**：开发者必须承认 AI 会犯错，并在 UI/UX 层面为用户提供修改和纠正的入口，从而构建出可靠的"分层治理的智能体集群"。这种设计既适用于高风险操作前的"批准/拒绝"式审批，也适用于 AI 判断不确定时的兜底处理，是[[concepts/以人为中心的agent|以人为中心的agent]]安全体系和[[concepts/人机协同|人机协同]]的核心策略。

## Related Concepts
- [[concepts/以人为中心的agent|以人为中心的agent]]
- [[concepts/自主性光谱|自主性光谱]]
- [[concepts/人机协同|人机协同]]
- [[concepts/voc重构|VOC重构]]
- [[concepts/标签选择agent|标签选择Agent]]
- [[concepts/agent编排|Agent编排]]
- [[concepts/灰度与回滚|灰度与回滚]]

## Related Entities
- [[entities/magentic-ui|Magentic-UI]]
- [[entities/标签选择agent|标签选择Agent]]

## Mentions in Source

> **Source: [[sources/2025-0426🧘以人为中心的agent_d84722|2025-0426🧘以人为中心的Agent]]**
> - "高风险任务 → 保留"人在环"，让人类掌握关键决策权。"
> - "对于被认定为重要的操作，Magentic-UI会通过"批准/拒绝"按钮请求用户许可。"
> - "用户拥有最终的控制权，避免Agent做出用户无法接受的后果。"

> **Source: [[sources/07-我如何用-agent-砍掉团队30的"垃圾时间"_d98060|07.我如何用 Agent 砍掉团队30的"垃圾时间"]]**
> - "这是一个典型的 **Human-in-the-loop (人在回路)** 自动化流程。"
> - "置信度低于 0.8 的自动转给人工确认，确保数据的准确性，同时最大化自动化率。"

> **Source: [[sources/08-代码已死系统永生如何从"码农"进化为-"agent-架构师"_e804b7|08-代码已死系统永生如何从"码农"进化为-"agent-架构师"_e804b7]]**
> - "容错设计：承认 AI 会犯错，并在设计 UI/UX 时允许用户介入修改（Human-in-the-loop）。"
> - "我们必须把 AI 从"聊天机器人"升级为"分层治理的智能体集群"。"