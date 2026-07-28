---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [product]
aliases:
  - "路由文件"
  - "意图路由器"
  - "router.py"
---


# router.py

## 基本信息
- Type: product
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]

## 描述
**router.py** 是 agent_app 项目 orchestration（编排）模块中的核心文件，负责实现意图路由功能。它作为整个 Agent 系统的流量入口和调度中枢，接收用户请求并根据意图识别结果，将请求精确分发到对应的 Agent 或处理流程中。router.py 与 [[entities/state-graph-py|state_graph.py]]（LangGraph 封装）紧密协作，共同构成编排层的核心逻辑，体现了[[concepts/protocol-layer|协议层]]优于框架的设计思想。其路由机制遵循[[concepts/路由架构与按需加载|路由架构与按需加载]]（Router-Worker Architecture）模式，通过 L1 Router 进行意图识别后，将任务动态分配给下游 Worker 执行。

## 相关实体
- [[entities/state-graph-py|state_graph.py]]
- [[entities/orchestration|orchestration]]

## 相关概念
- [[concepts/l1-router|意图路由]] — L1 路由器，负责意图识别与分类
- [[concepts/路由架构与按需加载|意图识别与路由]] — Router-Worker 架构模式，按需加载下游处理单元

## 来源提及
- "router.py" — [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]
- "意图路由 ^zpIRpBO7" — [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]