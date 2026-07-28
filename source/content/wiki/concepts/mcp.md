---
type: concept
created: 2026-06-21
updated: 2026-07-28
sources:
  - "[[sources/2025-0312-💆copilot和agent的区别_750b52]]"
  - "[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"
  - "[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"
  - "[[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7]]"
  - "[[sources/渐进式披露架构_780a26]]"
tags:
  - "standard"
aliases:
  - "Model Context Protocol"
  - "模型上下文协议"
---

## Description

MCP 与 Function Calling、MRCP 并列，是实现 Agent 多工具协同、环境状态读取和自主任务执行的重要技术基础。作为一种标准化协议，MCP 规范了模型与外部上下文之间的通信方式，使智能体能够读取环境状态并与外部系统进行数据交换。从架构视角看，MCP 被定位为新一代"业务操作系统"的核心组件之一——通过 ToolBox（工具箱）机制，AI 不再是信息孤岛，而是获得了 API 访问权限和数据库读取权限的"双手"，从而能够连接真实世界并执行实际操作。Karpathy 将 MCP 与 Subagent、Tools 等并列为现代 Agent 系统的核心架构清单要素。

在企业级 Agent 架构中，MCP 的价值不仅限于技术层面的解耦——它更被定义为一套通用的"契约"，强制划分了业务和组织的边界，服务于"人治"目标。实践中，企业可以通过 Nacos 的元数据映射，将现有微服务在 Agent 视角中"伪装"成 MCP 服务，从而实现现存业务的零改造接入。MCP 与 AI 网关、Agent 运行时共同构成了企业级 Agent 应用的核心架构。

在「渐进式披露架构」中，MCP 被进一步定位为协议层的核心标准，与 OpenAPI 并列使用，共同构成了「可逃逸架构」的关键逃生舱。它位于能力层和运行时之间，允许 Agent 运行时通过标准化协议接口与外部服务进行解耦通信，避免将所有工具定义硬编码到 Agent 上下文中，从而实现了「接口不动协议可插拔」的设计目标。这一角色使 MCP 从单纯的工具连接协议升华为系统可演化性的基石。

然而，也有批评声音指出，MCP 被视为第二代上下文窗口"补丁"方案——如同"给锤子加上说明书"，虽解决了工具连接问题，但说明书本身也消耗 Token，并未触及 Transformer 架构上下文窗口容量受限的根本缺陷。无论是 Function Calling、MCP 还是 Skills，本质上都是在试图掩盖让 AI 厂商"夜不能寐"的上下文容量问题。

## Related Concepts

- [[concepts/function-call|Function Calling]] — 与 MCP 并列的工具调用机制
- [[concepts/agent|Agent]] — 强依赖 MCP 等工具调用机制的智能体
- [[concepts/a2a|A2A]] — Agent 间通信协议，与 MCP 共同构成企业 Agent 架构的协议层
- [[concepts/ai网关|AI网关]] — 与 MCP、Agent 运行时共同构成企业级 Agent 核心架构
- [[concepts/agent运行时|Agent运行时]] — 企业级 Agent 架构核心组件之一
- [[concepts/上下文窗口压力|上下文窗口压力]] — MCP 被批评未能解决的核心瓶颈
- [[concepts/agent编排|Agent 编排]] — MCP 作为工具连接层支撑的 Agent 系统编排能力
- [[concepts/critic校验机制|Critic 校验机制]] — 与 MCP、Router 并列为现代 Agent 系统核心架构要素
- [[concepts/智能路由|智能路由]] — 与 MCP、Critic 并列为现代 Agent 系统核心架构要素
- [[concepts/可逃逸架构|可逃逸架构]] — MCP 作为协议层核心标准，是该架构的关键逃生舱
- [[concepts/协议优于框架|协议优于框架]] — MCP 作为标准化协议体现的设计原则
- [[concepts/client-server物理隔离|Client-Server 物理隔离]] — MCP Client-Server 架构的物理隔离实践

## Related Entities

- [[entities/agentbay|Agentbay]]
- [[entities/nacos|Nacos]]
- [[entities/higress|Higress]]
- [[entities/claude-skills|Claude Skills]] — 与 MCP 并列的下一代上下文"补丁"方案
- [[entities/openapi|OpenAPI]] — 与 MCP 并列构成协议层基础的标准

## Mentions in Source

> **Source: [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312-💆copilot和agent的区别]]**
> - "强依赖 Tool 调用、Function Calling、MCP/MRCP 等机制"

> **Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]**
> - "企业引进 MCP 是非常有必要的。不仅仅是为了技术解耦，更是为了**"人治"**。 MCP 协议是一套通用的"契约"，它强制划分了业务和组织的边界。"
> - "通过 Nacos 的元数据映射，将它们在 Agent 视角里"伪装"成 MCP 服务。"

> **Source: [[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05. 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好]]**
> - "不管是 Function Calling、MCP 还是现在的 Skills，它们都在试图掩盖一个让所有 AI 厂商夜不能寐的事实"
> - "**MCP (Model Context Protocol)** | "给锤子加上说明书" | 说明书也占 Token 啊！而且这只是解决了"连接"问题，没解决"脑容量"问题。"

> **Source: [[sources/08-代码已死系统永生如何从"码农"进化为-"agent-架构师"_e804b7|08. 代码已死，系统永生：如何从"码农"进化为 "Agent 架构师"]]**
> - "Karpathy 提到的那串复杂的清单（Subagent, MCP, Tools...），其实就是新一代的业务操作系统。"
> - "ToolBox (工具箱)：AI 不再是孤岛，通过 MCP (Model Context Protocol) 协议连接真实世界。"

> **Source: [[sources/渐进式披露架构_780a26|渐进式披露架构]]**
> - "The Escape Hatch - Protocol Layer"
> - "🔌 MCP / OpenAPI Standard"
> - "5. 调用工具 JSON Schema"