---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"]
tags: [method]
aliases:
  - "Agent Runtime"
  - "运行时"
  - "智能体运行时"
---


# Agent运行时

## 定义
Agent运行时是企业级Agent组件铁三角中的核心组件，被定义为"下沉的核心"。它左手通过MCP/API Client（借助Nacos发现工具）直接调用外部工具，右手通过Model Client（借助AI网关）调用大模型，并直接负责快慢双模执行（API直连或Agentbay RPA）的选择与调度。Agent运行时是连接工具层与模型层的中枢，在MVP阶段可直接配置模型API Key进行点对点调用，但在企业级阶段则必须通过AI网关和注册中心进行统一管理。

## 关键特征
- **下沉的核心**：位于Agent架构的底层中枢位置，连接工具调用与模型推理两大通道
- **双通道管理**：左手握MCP/API Client（工具调用通道），右手握Model Client（模型调用通道）
- **快慢双模执行**：直接负责选择执行模式——快模式（API直连）或慢模式（Agentbay RPA）
- **阶段性演进**：MVP阶段支持直配模型API Key的点对点调用；企业级阶段强制通过AI网关和注册中心进行统一治理
- **服务发现集成**：通过Nacos等注册中心动态发现可用的工具和服务
- **统一治理入口**：企业级场景下，成为模型调用与工具调用的统一管控节点

## 应用
- **企业级Agent部署**：在大型组织中统一管理Agent的模型调用与工具访问
- **MVP快速验证**：在原型阶段通过直配API Key快速完成Agent功能验证
- **混合执行调度**：根据任务复杂度自动选择API直连（快模式）或RPA执行（慢模式）
- **工具治理**：通过注册中心实现工具的动态发现、调用与权限管控
- **模型路由**：通过AI网关实现多模型的选择、限流与成本控制

## 相关概念
- [[concepts/mcp|MCP]] — Agent运行时左手持有的MCP/API Client所使用的协议
- [[concepts/function-call|Function Call]] — Agent运行时调用工具的基础机制
- [[concepts/混合工具路由|混合工具路由]] — Agent运行时在快慢双模执行选择中的路由策略体现
- [[concepts/全链路追踪|全链路追踪]] — Agent运行时在企业级架构中的可观测性支撑
- [[concepts/配置驱动|配置驱动]] — Agent运行时在不同阶段（MVP/企业级）的配置切换理念

## 相关实体
- [[entities/nacos|Nacos]] — Agent运行时用于工具发现的服务注册中心
- [[entities/higress|Higress]] — 企业级架构中作为AI网关的基础设施
- [[entities/mcp|MCP]] — Agent运行时通过MCP/API Client进行工具调用的协议实体

## 来源提及
- "Agent 运行时 (Runtime)：**下沉的核心**。它左手握着 **MCP/API Client**（通过 Nacos 发现工具，直接调用）。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]
- "它右手握着 **Model Client**（通过 AI 网关调用模型）。" — [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]