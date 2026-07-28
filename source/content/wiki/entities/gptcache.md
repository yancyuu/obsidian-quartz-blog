---
type: entity
created: 2026-06-24
updated: 2026-07-28
sources:
  - "[[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060]]"
  - "[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"
tags:
  - "product"
aliases:
  - "GPT Cache"
  - "GPT缓存"
---

## 描述
GPTCache 是一款应用层语义缓存工具，旨在降低大语言模型 API 调用成本和响应延迟。其核心机制是通过 Embedding 将「历史问题→答案」的映射存入向量库，新问题先计算相似度，命中阈值则直接返回历史答案，无需调用模型。在舆情数据处理场景中，作者采用分级策略，对于简单的重复评论（如"好评"）直接走 GPTCache 或正则匹配，从而避免不必要的 [[entities/gpt-4|GPT-4]] 调用。该工具与 [[entities/飞书智能助理|飞书]] 等协同平台配合使用，有效减少了对大模型接口的压力，实现了系统整体运行成本的显著下降。值得注意的是，GPTCache 的本质是应用层优化，与模型层的 [[concepts/kv-cache|KV Cache]] 和 Prompt Caching 机制不同，特别适合客服 FAQ、高频重复问题等场景。

## 相关实体
- [[entities/gpt-4|GPT-4]]
- [[entities/飞书智能助理|飞书]]
- [[entities/redis|Redis]]
- [[entities/vllm|vLLM]]

## 相关概念
- [[concepts/成本管理|成本管理]]
- [[concepts/语义缓存|语义缓存]]
- [[concepts/kv-cache|KV Cache]]
- [[concepts/prompt-caching|Prompt Caching]]
- [[concepts/向量检索|向量检索]]

## 来源提及

> **Source: [[sources/07-我如何用-agent-砍掉团队30的"垃圾时间"_d98060|07.我如何用 Agent 砍掉团队30的"垃圾时间"]]**
> - "**解法**：**分级策略 + GPTCache**。"
> - "对于简单的重复评论（如"好评"），直接走缓存或正则。"

> **Source: [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]**
> - "用 Embedding 把「历史问题→答案」存向量库，新问题先算相似度，命中阈值则直接返回历史答案，**不调用模型**。"
> - "工具：Redis Vector、GPTCache。"
> - "**本质是应用层优化，与本文的模型层 KV/Prompt 缓存不同**。"