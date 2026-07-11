---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"]
tags: [method]
aliases:
  - "Self-Reflective Retrieval-Augmented Generation"
  - "自反思检索增强生成"
---


# Self-RAG

## 定义
Self-RAG 是论文中定义的一种检索增强生成（RAG）方法，通过在模型训练阶段引入 `[Retrieve]`/`[NoRetrieve]`/`[Supported]` 等特殊 token，使模型具备自评估与迭代优化能力。模型在推理时能够自主判断是否需要检索、评估检索结果的支持程度，并据此优化最终生成内容。

## 关键特征
- **特殊 Token 训练**：在监督微调阶段引入 `[Retrieve]`/`[NoRetrieve]`/`[Supported]` 等特殊 token，使模型内化检索决策与证据评估能力
- **需要额外监督微调**：与仅依赖 Prompt 工程的反思式 RAG 不同，Self-RAG 必须对模型进行带标注数据的额外训练
- **自评估机制**：模型自主评判检索内容的相关性与事实支持度，实现检索质量的自我把关
- **推理流程**：遵循 Retrieve → Critique → Refine → Generate 的迭代推理链路
- **与反思式 RAG 的严格区分**：反思式 RAG 仅借用 Self-RAG 的推理阶段思想，完全依靠通用大模型和 Prompt 工程实现，无需额外训练

## 应用
- 对生成质量与事实准确性要求较高的知识问答场景
- 需要模型自主决策检索时机的高级 RAG 系统
- 作为反思式 RAG 系统的未来升级路径：通过 LoRA 将 Critique 模型微调为真正的 Self-RAG，从而获得更强的自评估能力

## 相关概念
- [[concepts/self-reflective-rag|反思式 RAG]]
- [[concepts/agentic-rag|智能体RAG]]
- [[concepts/tool-augmented-rag|工具增强RAG]]
- [[concepts/multi-agent-rag|多智能体RAG]]

## 相关实体
- [[entities/小火鸭|小火鸭]]

## 来源提及
- "下文提到的"反思机制"仅借用了 Self-RAG 的推理阶段思想（Retrieve → Critique → Refine → Generate），并未对模型进行带有 [Retrieve]/[Supported] 等特殊 token 的额外训练，因此严格属于反思式 RAG，而非论文定义的 Self-RAG。" — [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]
- "无额外训练：未引入 [Retrieve]/[NoRetrieve]/[Supported] 等特殊 token" — [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]