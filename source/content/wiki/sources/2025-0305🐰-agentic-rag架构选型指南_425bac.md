---
type: source
created: 2026-06-21
updated: 2026-06-21
source_file: "[[🤖AI应用/Agent/从hello-world到真正能用的agent/2025-0305🐰 Agentic-RAG架构选型指南.md]]"
tags: [Agentic RAG, Multi-Agent RAG, Self-Reflective RAG, Tool-Augmented RAG, Self-RAG, 反思式 RAG, 上下文工程, 意图识别, 向量检索, 权限过滤, ReAct, Function-Call, LoRA]
aliases: ["Agentic-RAG架构选型指南", "RAG系统重构笔记"]
---

# RAG系统重构笔记 - 摘要

## 来源
- 原始文件: [[🤖AI应用/Agent/从hello-world到真正能用的agent/2025-0305🐰 Agentic-RAG架构选型指南.md]]
- 录入日期: 2026-06-21

## 核心内容
本文档系统性地总结了检索增强生成（RAG）系统的架构演进路径与Agent核心架构分类。文档梳理了RAG系统从概念验证到生产就绪的四个技术栈演进阶段：从零代码的[[entities/dify|Dify]]起步，经[[entities/langgraph|LangGraph]]实现复杂工作流，再到手搓实现追求极致性能，最终选定[[entities/pydantic-ai|Pydantic-AI]]作为企业级生产框架。

在架构选型上，文档将[[concepts/agentic-rag|Agentic RAG]]细分为三大范式：[[concepts/multi-agent-rag|Multi-Agent RAG]]（多智能体协作）、[[concepts/self-reflective-rag|Self-Reflective RAG]]（自反思迭代优化）和[[concepts/tool-augmented-rag|Tool-Augmented RAG]]（工具增强检索）。文档以[[entities/小火鸭|小火鸭]]项目为实际案例，论证了[[concepts/反思式-rag|反思式RAG]]在零售及服务业专业领域FAQ场景中的最佳适配性，强调其在准确性、成本和维护性三者间的完美平衡，并清晰界定了该实践架构与论文中严格的[[concepts/self-rag|Self-RAG]]的区别。

## 关键实体
- [[entities/dify|Dify]]：MVP验证阶段首选的零代码LLM应用开发平台。
- [[entities/langgraph|LangGraph]]：功能扩展阶段用于构建复杂工作流的开发框架。
- [[entities/pydantic-ai|Pydantic-AI]]：生产就绪阶段强调类型安全与高可维护性的框架。
- [[entities/小火鸭|小火鸭]]：面向零售/服务业的专业领域知识助手项目落地案例。

## 关键概念
- [[concepts/agentic-rag|Agentic RAG]]：引入智能体能力的高阶RAG系统架构范式。
- [[concepts/multi-agent-rag|Multi-Agent RAG]]：多智能体专业化分工与协作决策架构。
- [[concepts/self-reflective-rag|Self-Reflective RAG]]：依赖单智能体自反思迭代的RAG优化架构。
- [[concepts/tool-augmented-rag|Tool-Augmented RAG]]：将检索、计算与API统一封装为工具的动态调用架构。
- [[concepts/反思式-rag|反思式RAG]]：包含Retrieve-Critique-Refine-Generate四阶段、基于双模型架构的实践性RAG方案。
- [[concepts/self-rag|Self-RAG]]：需特殊token训练和监督微调的学术定义级RAG方法。
- [[concepts/上下文工程|上下文工程]]：系统性管理并优化输入模型上下文信息的基础方法论。
- [[concepts/意图识别|意图识别]]：决定后续检索与生成策略的关键前置分流环节。
- [[concepts/向量检索|向量检索]]：通过高维向量相似度匹配实现文档召回的核心技术。
- [[concepts/权限过滤|权限过滤]]：结合部门/角色标签实现文档访问安全控制的机制。
- [[concepts/react|ReAct]]：实现推理与行动动态结合的工具选择范式。
- [[concepts/function-call|Function-Call]]：让模型生成结构化指令以调用外部函数的机制。
- [[concepts/lora|LoRA]]：可用于将通用批判模型微调升级为真·Self-RAG的低秩适应技术。

## 要点
- **架构演进路径**：RAG系统技术栈按MVP验证（Dify）→ 功能扩展（LangGraph）→ 性能优化（手搓实现）→ 生产就绪的路径逐步迭代。
- **三大架构分类**：Agentic RAG分为Multi-Agent RAG、Self-Reflective RAG与Tool-Augmented RAG，分别在多角色长流程、专业领域问答、实时数据计算场景中具备优势。
- **反思式RAG四阶段**：包含Retrieve（向量召回+权限过滤）、Critique（推理模型打分批判）、Refine（日志回写+自动纠偏）、Generate（聊天模型流式输出）。
- **双模型架构优势**：推理模型专职批判，聊天模型专职生成，有效保障系统的响应速度与结果准确度。
- **概念辨析**：实践中的"反思式RAG"仅借用推理思想进行Prompt工程，未引入特殊Token进行模型训练，有别于论文定义的Self-RAG。
- **小火鸭案例验证**：该零售场景项目采用反思式RAG，成功实现错误率下降35%、首token响应低于1.2s的优异性能表现。
- **低成本升级路径**：在收集到足够标注数据后，可通过LoRA技术微调Critique模型，将系统平滑升级为Self-RAG。