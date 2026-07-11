---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"]
tags: [product]
aliases:
  - "Agentbay RPA"
  - "Agentbay 容器化RPA通道"
---


# Agentbay

## 基本信息
- Type: product
- Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]

## 描述
Agentbay 是一个容器化的 RPA（机器人流程自动化）执行通道，专为企业存量改造场景设计。它通过对老旧黑盒系统进行非侵入式操作，使企业无需改造现有系统即可嵌入 AI Agent 能力，极大降低了存量系统改造的门槛。Agentbay 与 [[concepts/lvm|LVM（视觉模型）]] 结合，构成了[[concepts/双模执行架构|双模执行架构]]中的慢模式/异步通道，与 API 直连的快模式形成互补。在实际执行中，Agent 与执行层之间通过 [[concepts/mcp|MCP]] 等协议进行工具调度和调用，由 Agentbay 负责 RPA 通道的具体执行。这种架构使得企业在不触碰底层遗留系统的前提下，依然能够实现智能化流程升级。

## 相关实体
- [[entities/mcp|MCP]]

## 相关概念
- [[concepts/双模执行架构|双模执行架构]]
- [[concepts/存量改造|存量改造]]

## 来源提及
- "RPA 通道 (Agentbay)：利用容器化的 **Agentbay** 结合 **LVM (视觉模型)**，对老旧系统进行非侵入式操作（慢模式/异步）。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]
- "它直接负责执行的'快慢双模'（API 直连 or Agentbay RPA）。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]