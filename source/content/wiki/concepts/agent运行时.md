---
type: concept
created: 2026-06-21
updated: 2026-07-28
sources:
  - "[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"
  - "[[sources/渐进式披露架构_780a26]]"
tags:
  - "method"
aliases:
  - "Agent Runtime"
  - "运行时"
  - "智能体运行时"
---

## Description
Agent运行时被定义为"下沉的核心"，位于Agent架构的底层中枢位置，连接工具调用与模型推理两大通道。在渐进式披露架构中，它承担着更宏观的职责——作为用户意图与底层执行之间的核心系统层，负责接收用户请求后通过L1 Router进行意图识别，再由L2 Worker执行具体任务。它体现了可逃逸架构中运行时动态加载技能、无状态化上下文的核心设计理念。Agent运行时具有明显的阶段性演进特征：MVP阶段支持直配模型API Key的点对点调用；企业级阶段则强制通过AI网关和注册中心进行统一治理。作为连接工具层与模型层的中枢，Agent运行时在不同架构视角下均扮演着承上启下、统一调度的关键角色。

## Related Concepts
- [[concepts/mcp|MCP]] — Agent运行时左手持有的MCP/API Client所使用的协议
- [[concepts/function-call|Function Call]] — Agent运行时调用工具的基础机制
- [[concepts/混合工具路由|混合工具路由]] — Agent运行时在快慢双模执行选择中的路由策略体现
- [[concepts/全链路追踪|全链路追踪]] — Agent运行时在企业级架构中的可观测性支撑
- [[concepts/配置驱动|配置驱动]] — Agent运行时在不同阶段（MVP/企业级）的配置切换理念
- [[concepts/可逃逸架构|可逃逸架构]] — Agent运行时体现的核心设计理念，支持动态加载技能与组件替换
- [[concepts/路由架构与按需加载|路由架构与按需加载]] — Agent运行时通过L1 Router/L2 Worker进行任务分发的架构模式
- [[concepts/协议优于框架|协议优于框架]] — Agent运行时位于协议层之上，遵循协议优先原则

## Related Entities
- [[entities/nacos|Nacos]] — Agent运行时用于工具发现的服务注册中心
- [[entities/higress|Higress]] — 企业级架构中作为AI网关的基础设施
- [[entities/mcp|MCP]] — Agent运行时通过MCP/API Client进行工具调用的协议实体
- [[entities/l1-router|L1 Router]] — Agent运行时中负责意图识别的路由组件
- [[entities/l2-worker|L2 Worker]] — Agent运行时中负责具体任务执行的Worker组件

## Mentions in Source

> **Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|Agent企业落地架构变革]]**
> - "Agent 运行时 (Runtime)：**下沉的核心**。它左手握着 **MCP/API Client**（通过 Nacos 发现工具，直接调用）。"
> - "它右手握着 **Model Client**（通过 AI 网关调用模型）。"

> **Source: [[sources/渐进式披露架构_780a26|渐进式披露架构]]**
> - "Agent Runtime ^cfRATWv"
> - "The Escape Hatch - Protocol Layer ... Agent Runtime ^cfRATWv"