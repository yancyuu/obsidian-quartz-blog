---
type: concept
created: 2026-06-21
updated: 2026-06-22
sources:
  - "[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"
  - "[[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]"
tags:
  - "field"
aliases:
  - "智能体RAG"
  - "Agentic Retrieval-Augmented Generation"
---

## Description
Agentic RAG 通过多维度架构设计实现了从传统线性 RAG 流程到智能化、可管控系统的跃迁。在架构分类层面，它涵盖三大子类：Multi-Agent RAG（多智能体专业化分工与协作）、Self-Reflective RAG（单智能体自反思迭代优化）和 Tool-Augmented RAG（将检索、计算和 API 封装为工具由 LLM 动态调用），三者适用于不同的业务场景需求。在企业级落地实践中，Agentic RAG 还可融合「三级分流 + 状态机管控」的设计理念，采用 L1（路由）、L2（执行）、L3（管控）的分层架构，将确定性业务逻辑从 LLM 中剥离出来交给规则引擎或 FSM 处理，LLM 仅在需要概率性推理的环节发挥作用。这种设计有效解决了算力错配、状态丢失和死循环三大核心问题，已在 [[entities/客服agent|客服Agent]] 等高并发场景中实现了 85% 的成本降低。

## Related Concepts
- [[concepts/multi-agent-rag|Multi-Agent RAG]]
- [[concepts/self-reflective-rag|Self-Reflective RAG]]
- [[concepts/tool-augmented-rag|Tool-Augmented RAG]]
- [[concepts/有限状态机|有限状态机]]
- [[concepts/模型路由|模型路由]]
- [[concepts/语义缓存|语义缓存]]
- [[concepts/混合检索|混合检索]]
- [[concepts/成本管理|成本管理]]
- [[concepts/意图识别|意图识别]]

## Related Entities
- [[entities/客服agent|客服Agent]]

## Mentions in Source

> **Source: [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|Agentic-RAG架构选型指南]]**
> - "Agentic RAG
├── Multi-Agent RAG
│   ├── 专业化分工 (Router → Searcher → Writer)
│   └── 协作决策 (Planning → Execution → Verification)
└── Self-Reflective RAG"
> - "Tool-Augmented RAG 
    ├── 检索即工具 (Search & Lookup Tool)
    ├── 领域工具链 (SQL、API、计算器)"

> **Source: [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|企业级Agent架构重构实战]]**
> - "团队放弃了传统的线性 ChatBot 模式，转而采用 **Agentic RAG + 状态机（FSM）+ 语义路由** 的组合架构。"
> - "我们引入了 **"三级分流 + 状态机管控"** 的 Agentic RAG 架构。核心逻辑是将请求根据复杂度进行路由（Routing），并由确定性的状态机约束模型的行动空间。"
> - "通过 L1（路由）、L2（执行）、L3（管控）的分层设计，将确定性的业务逻辑剥离出 LLM，交给规则引擎或 FSM 处理。"