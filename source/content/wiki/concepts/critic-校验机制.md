---
type: concept
created: 2026-06-25
updated: 2026-06-25
sources:
  - "[[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7]]"
  - "[[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0]]"
tags:
  - "method"
aliases:
  - "Critic"
  - "校验Agent"
  - "批评家角色"
  - "逻辑校验Agent"
---

## Description
Critic 校验机制通过引入一个独立的"批评家"Agent，对主 Agent 的输出进行质量验证和逻辑校验。在专家 Agent 集群架构中，Critic 通常承担 Agent C 的角色，作为质量校验闭环的核心执行者，负责判断生成草稿是否达到预设的质量标准。其核心工作流程为：当主 Agent 生成草稿后，Critic 对其进行审查——若质量不达标，则触发重新生成流程；若质量达标，则允许结果输出。这种机制通过"生成→校验→反馈→再生成"的循环，专门针对 LLM 输出不确定性所带来的"幻觉"和质量波动问题，提供系统级的防护屏障。Critic 与主 Agent 职责解耦，作为独立角色存在，确保校验视角的客观性和批判性，是确保 Agent 系统可靠性的关键保障。

## Related Concepts
- [[concepts/Agent 编排|Agent 编排]]
- [[concepts/幻觉控制|幻觉控制]]
- [[concepts/self-reflective-rag|self-reflective-rag]]
- [[concepts/质量校验闭环|质量校验闭环]]

## Related Entities
- [[entities/生成草稿|生成草稿]]

## Mentions in Source

> **Source: [[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7|08-代码已死系统永生如何从"码农"进化为"agent-架构师"]]**
- "引入 Critic（批评家）角色，让 AI 自己检查自己的输出，实现 Karpathy 所说的"自我纠错"。"
- "Critic (校验)：这是最关键的一环。为了对抗 LLM 的随机性，必须引入一个"专门找茬"的 Agent，形成闭环。"

> **Source: [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]**
- "Agent C: 逻辑校验/Critic ^q2q4E6X3"
- "3.质量不达标 ^WRCU4IoE"
- "4.质量达标 ^DLrkLdI6"