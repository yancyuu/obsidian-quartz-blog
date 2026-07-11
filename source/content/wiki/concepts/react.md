---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"]
tags: [method]
aliases:
  - "ReAct框架"
  - "Reasoning and Acting"
---


# ReAct

## 定义
ReAct 是一种将推理（Reasoning）与行动（Acting）相结合的范式，在 Tool-Augmented RAG 架构中用于实现动态工具选择。它允许大语言模型在处理复杂任务时，交替进行推理判断和工具调用，根据中间结果动态决定下一步操作。在技术选型对比中，ReAct 与 Function-Call 并列为 Tool-Augmented RAG 的核心实现方式，适用于需要实时数据和计算混合的复杂任务场景。

## 关键特征
- **推理与行动交替执行**：模型在每一步先进行推理（Thought），再执行行动（Action），形成"思考→行动→观察"的循环
- **动态工具选择**：根据当前推理结果和任务需求，从可用工具集中动态选择最合适的工具进行调用
- **中间结果感知**：模型能够感知工具调用返回的中间结果，并基于这些结果调整后续推理和操作策略
- **灵活性强**：相较于固定的函数调用流程，ReAct 赋予模型更高的自主决策能力，能够灵活应对多步骤、多分支的复杂任务

## 应用
- **复杂问答系统**：处理需要多步推理和外部信息检索的复杂查询
- **工具增强型 RAG 系统**：在检索增强生成流程中实现动态工具调度和实时数据获取
- **智能体任务编排**：支持智能体在多步骤任务中根据中间反馈动态调整执行路径
- **实时数据与计算混合场景**：适用于同时需要实时数据查询和逻辑计算推理的混合型任务

## 相关概念
- [[concepts/tool-augmented-rag|tool-augmented-rag]]
- [[concepts/agentic-rag|agentic-rag]]
- [[concepts/意图识别|意图识别]]
- [[concepts/上下文工程|上下文工程]]

## 相关实体
*暂无相关实体*

## 来源提及
- "│   └── 动态工具选择 (ReAct / Function-Call)" — [[🤖Agent/从hello-world到真正能用的agent/2025-0305🐰 Agentic-RAG架构选型指南|2025-0305🐰 Agentic-RAG架构选型指南]]