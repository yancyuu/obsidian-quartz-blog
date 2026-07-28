---
type: concept
created: 2026-06-21
updated: 2026-07-28
sources:
  - "[[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea]]"
  - "[[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7]]"
  - "[[sources/agent-app代码结构_c030b6]]"
tags:
  - "method"
aliases:
  - "Agent编排"
  - "Brain"
  - "Agent Orchestration Framework"
  - "Agent 编排"
  - "orchestration"
---

## Description
Agent编排框架作为Agent系统的核心控制面，统筹Agent的行为规划、上下文管理与资源调度，与[[concepts/agent运行时|Agent运行时]]和[[concepts/agent观测平台|Agent观测平台]]共同构成企业级Agent应用的完整组件体系。在概率性大模型环境下，工程化编排比单一模型能力更为关键——迷信"超级模型"而忽略编排是AI应用无法走出Demo阶段的根本原因。编排框架的三大核心策略包括：**拆解**（将复杂业务目标原子化）、**工具化**（赋予AI数据库和API访问权限）以及**循环与反思**（引入Critic角色实现自我纠错）。企业版本的控制面建议部署在后端，以便对接企业自身的鉴权服务；技术栈上推荐基于Python生态构建，Java也是可行选型。

在具体的代码实现层面，编排框架通常以独立模块（如 `orchestration/`）存在于[[concepts/应用入口与配置|agent_app架构]]中，其核心职责由两个关键文件承载：**router.py** 负责意图路由，根据用户请求分发到对应的Agent或处理流程；**state_graph.py** 封装[[concepts/l1-router|LangGraph]]状态图，实现基于状态机的复杂工作流编排与多智能体协作调度。当前市面上编排框架众多，能力边界尚无统一标准。

## Related Concepts
- [[concepts/agent运行时|Agent运行时]]
- [[concepts/agent观测平台|Agent观测平台]]
- [[concepts/长时记忆|长时记忆]]
- [[concepts/状态持久化|状态持久化]]
- [[concepts/协调器|协调器]]
- [[concepts/确定性工程|确定性工程]]
- [[concepts/sop重构|SOP重构]]
- [[concepts/评估机制|评估机制]]
- [[concepts/意图路由|意图路由]]
- [[concepts/模块解耦|模块解耦]]
- [[concepts/应用入口与配置|应用入口与配置]]
- [[concepts/l1-router|L1路由器]]

## Related Entities
- [[entities/andrej-karpathy|Andrej Karpathy]]
- [[entities/langgraph|LangGraph]]
- [[entities/agent-app|agent_app]]

## Mentions in Source

> **Source: [[sources/2026-0108-🧘-agent-企业落地架构变革从工具治理到人治契约_938fea|2026-0108 🧘 Agent 企业落地架构变革：从工具治理到人治契约]]**
> - "**Agent 编排框架 (Brain)：** 负责 Prompt 模板管理和记忆路由。"
> - "Agent编排能力边界模糊，控制面市面上框架很多，企业版本的控制面最好放后端，好对接企业自身的鉴权服务。放前端等于白给，技术栈基于python的生态会更好一些，Java也可以。"

> **Source: [[sources/08-代码已死系统永生如何从“码农”进化为-“agent-架构师”_e804b7|08. 代码已死，系统永生：如何从"码农"进化为 "Agent 架构师"]]]**
> - "迷信"超级模型"，认为一个 GPT-4 就能解决所有问题，忽略了工程化编排（Orchestration）的重要性。"
> - "拆解 (Decomposition)：将复杂的业务目标（如"写一份标书"）拆解为原子任务。"
> - "循环与反思 (Loop & Reflection)：引入 Critic（批评家）角色，让 AI 自己检查自己的输出，实现 Karpathy 所说的"自我纠错"。"

> **Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]**
> - "orchestration/ ^kRUPsbYL"
> - "router.py 意图路由 ^zpIRpBO7"
> - "state_graph.py LangGraph封装 ^UCWMg4Ix"