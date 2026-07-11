---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"
  - "[[sources/01-把信仰交给-ai-的血泪教训_558fff]]"
tags:
  - "method"
aliases:
  - "自反思RAG"
  - "反思型RAG"
  - "Self-Reflective Retrieval-Augmented Generation"
  - "反思式 RAG"
---

## Description
Self-Reflective RAG（反思式 RAG）是一种通过单智能体自反思迭代来优化 RAG 质量的实践性架构方法。该方法借用了 Self-RAG 的推理阶段思想，但未进行特殊 token 训练，降低了实现门槛。其核心流程包含四个阶段：Retrieve（向量召回+权限过滤）、Critique（推理模型打分评估相关性和事实性）、Refine（日志回写+再召回，最多 2-3 轮）和 Generate（聊天模型流式输出）。简单 RAG 是"单向"的——拿到什么就信什么，无法判断检索到的信息是否足够或权威，这正是知识库污染和 Agent 编造事实问题的根源。反思型 RAG 通过引入自我校对机制，强制 Agent 在生成初稿后进行二次核对，验证关键句是否真的来自证据段落，从而在回答前多问自己一句"我引用的证据准确吗？"。其具体实现形式包括验证链（CoVe）等，通常与数据分层隔离、结构化检索配合使用，构成完整的知识管理方案。该架构采用双模型设计——推理模型专职批判与评估，聊天模型专职内容生成——并通过每轮日志写回上下文实现自动纠偏，自适应终止机制在获得有效结果或达到最大轮次时退出，保证秒级响应。对于[[entities/小火鸭|小火鸭]]这类专业领域的知识助手，反思式 RAG 提供了最佳的准确性-成本-维护性平衡，是理想的架构选择。

## Related Concepts
- [[concepts/agentic-rag|Agentic RAG]]
- [[concepts/multi-agent-rag|Multi-Agent RAG]]
- [[concepts/tool-augmented-rag|Tool-Augmented RAG]]
- [[concepts/self-rag|Self-RAG]]
- [[concepts/反思式-RAG|反思式 RAG]]
- [[concepts/评估机制|评估机制]]

## Related Entities
- [[entities/小火鸭|小火鸭]]

## Mentions in Source

> **Source: [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]**
> - "Self-Reflective RAG
    ├── Self-RAG (自评估迭代优化)
    ├── Self-Corrective RAG (错误检测修正)
    └── Self-Adaptive RAG (动态策略调整)"
> - "单 Agent 自反思迭代"
> - "反思式 RAG 的四个核心阶段"
> - "对于小火鸭这类专业领域的知识助手，反思型RAG提供了最佳的准确性-成本-维护性平衡，是理想的架构选择。"

> **Source: [[sources/01-把信仰交给-ai-的血泪教训_558fff|01. 把信仰交给 AI 的血泪教训]]**
> - "根本原因：**知识缺乏版本控制与权威性校验**，以及 **RAG 缺乏自我校对机制**。简单的 RAG 是"单向"的，它拿到什么就信什么，无法判断检索到的信息是否足够、是否权威。"
> - "我们引入 **反思机制**，让 Agent 在回答前多问自己一句："我引用的证据准确吗？""
> - "**反思型 RAG/验证链 (CoVe)：** Agent 生成初稿后，强制进行 **二次核对**，验证关键句是否真的来自证据段落。"