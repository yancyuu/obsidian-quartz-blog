---
type: entity
created: 2026-06-22
updated: 2026-06-22
sources:
  - "[[sources/03-💥别被大厂架构忽悠了撕掉百万预算我们用-rag-重构了零售巨头的“智障”客服_f598e2]]"
tags: [product]
aliases:
  - "BERT模型"
  - "Bidirectional Encoder Representations from Transformers"
  - "BERT预训练模型"
---

# BERT

## 基本信息

- Type: product
- Source: [[sources/03-💥别被大厂架构忽悠了撕掉百万预算我们用-rag-重构了零售巨头的“智障”客服_f598e2]]

## 描述

BERT（Bidirectional Encoder Representations from Transformers）是传统NLP时代的代表性预训练模型，曾在意图分类、序列标注等任务中被广泛使用。在旧架构方案中，需要专门训练BERT模型来做意图分类、Query理解等中间环节。而在LLM时代，这些环节已被直接使用Prompt让大模型处理所取代，成本降低90%。BERT在本文的对比分析中被用作旧架构的典型代表，凸显了大模型对传统NLP中间件的颠覆性影响。

## 相关实体

_（暂无直接关联实体）_

## 相关概念

- [[concepts/意图泛化层|意图泛化层]]
- [[concepts/意图路由|意图路由]]

## 来源提及

- "**听懂人话**：训练 BERT 做意图分类 → **Prompt**：直接把话喂给大模型" — [[sources/03-💥别被大厂架构忽悠了撕掉百万预算我们用-rag-重构了零售巨头的“智障”客服_f598e2|03. 💥别被大厂架构忽悠了：撕掉百万预算，我们用 RAG 重构了零售巨头的“智障”客服]]
- "**Query 理解**：序列标注+依存分析+领域分类 → 一句话丢给大模型，直接输出结构化 JSON" — [[sources/03-💥别被大厂架构忽悠了撕掉百万预算我们用-rag-重构了零售巨头的“智障”客服_f598e2|03. 💥别被大厂架构忽悠了：撕掉百万预算，我们用 RAG 重构了零售巨头的“智障”客服]]
