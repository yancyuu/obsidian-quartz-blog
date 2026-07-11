---
type: entity
created: 2026-06-21
updated: 2026-06-22
sources:
  - "[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"
  - "[[sources/03-💥别被大厂架构忽悠了撕掉百万预算我们用-rag-重构了零售巨头的“智障”客服_f598e2]]"
tags:
  - "product"
aliases:
  - "Dify平台"
  - "Dify.AI"
---

## 描述
Dify 是一款开源的零代码/低代码大语言模型（LLM）应用开发平台，也可作为独立的 RAG 引擎使用。在多篇实践文档中，Dify 均被推荐为 [[concepts/agentic-rag|Agentic RAG]] 系统 MVP 验证阶段的首选工具。其核心优势在于支持零代码快速验证和可视化调试，使团队无需深厚的工程能力即可快速验证产品概念。在零售行业 RAG 重构案例中，作者建议项目第一周直接使用 Dify 手动上传核心文档让业务人员试用，以快速验证 RAG 方案的可行性，而非自行开发。然而，Dify 的主要痛点在于定制化能力受限和性能瓶颈，难以满足复杂业务逻辑的需求。与同为架构选型候选的 [[entities/langgraph|LangGraph]] 和 [[entities/pydantic-ai|Pydantic-AI]] 相比，Dify 降低了技术门槛，但在灵活性和可扩展性上有所取舍。

## 相关实体
- [[entities/langgraph|LangGraph]]
- [[entities/pydantic-ai|Pydantic-AI]]
- [[entities/fastmcp|FastMCP]]（待确认）

## 相关概念
- [[concepts/agentic-rag|Agentic RAG]]
- [[concepts/混合检索|混合检索]]

## 来源提及

> **来源：[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]**
> - "MVP验证|Dify|零代码快速验证、可视化调试|定制化限制、性能瓶颈|产品概念验证"
> - "Dify|零代码快速验证、可视化调试"

> **来源：[[sources/03-💥别被大厂架构忽悠了撕掉百万预算我们用-rag-重构了零售巨头的“智障”客服_f598e2|03-💥别被大厂架构忽悠了：撕掉百万预算，我们用RAG重构了零售巨头的"智障"客服]]**
> - "找个开源的 RAG 引擎（像 Dify 或 FastGPT），手动传 10 个核心文档，拉个群让核心店长试用。"