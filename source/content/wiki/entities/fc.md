---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"]
tags: [product]
aliases:
  - "阿里云函数计算"
  - "Function Compute"
  - "阿里云FC"
---


# FC

## 基本信息
- Type: product
- Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]

## 描述
FC（阿里云函数计算）是阿里云提供的 Serverless 计算服务，具备丰富的触发器机制，完美适配 AI Agent 的事件驱动特性，天然适合作为 Agent Sandbox（智能体沙箱）。在流量波动大、爆发式增长或长时间低负载的场景下，FC 的 Scale-to-Zero（缩容至零）能力可以有效实现成本优化。文章建议在验证期或团队人手有限时优先选择 FC，以快速验证和迭代。相比之下，[[entities/K8s|K8s]] 等容器编排方案更适合规模化后的精细化运维场景，两者可与 [[entities/Nacos|Nacos]]、[[entities/Higress|Higress]] 等组件协同构成完整的 [[concepts/agent运行时|Agent运行时]] 基础设施。

## 相关实体
- [[entities/K8s|K8s]]
- [[entities/Nacos|Nacos]]
- [[entities/Higress|Higress]]

## 相关概念
- [[concepts/agent运行时|Agent运行时]]
- [[concepts/存量改造|存量改造]]

## 来源提及
- "FC (阿里云函数计算) 具备丰富的触发器，完美适配 AI Agent 的事件驱动特性，天然适合作为 **Agent Sandbox**。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]
- "**推荐方案（图简单/验证期）：** 直接用 **阿里云 FC**。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]