---
type: source
created: 2026-07-28
updated: 2026-07-28
source_file: "[[💻基础知识/大模型/大模型推理缓存-KV-Cache与Prompt-Caching.md]]"
tags: [basic-knowledge, kb/llm, kb/llm/inference, kv-cache, prompt-caching, vllm, inference-optimization]
aliases: ["大模型推理缓存机制", "LLM Inference Caching: KV Cache and Prompt Caching", "KV Cache 与 Prompt Caching 指南"]
---

# 大模型推理缓存：KV Cache 与 Prompt Caching - Summary

## 来源
- 原始文件：[[💻基础知识/大模型/大模型推理缓存-KV-Cache与Prompt-Caching.md]]
- 摄入日期：2026-07-28

## 核心内容
本文系统讲解了大模型推理层面的三层缓存机制：**推理引擎层**、**API/框架层**和**应用层**。

在推理引擎层，文章详细阐述了 [[concepts/kv-cache|KV Cache]] 的原理：基于 [[concepts/因果注意力|因果注意力]] 机制，历史 token 的 Key/Value 不会改变，缓存它们可将每步计算复杂度从 O(n²) 降至增量计算，这是 LLM 实时生成的关键。其次介绍了 [[entities/vllm|vLLM]] 的核心创新 [[concepts/pagedattention|PagedAttention]]，借鉴操作系统虚拟内存分页管理，消除了 [[concepts/内部碎片|内部碎片]]，将显存利用率从约 20% 提升至约 96%。

在 API 层，文章对比了各厂商 [[concepts/prompt-caching|Prompt Caching]] 的商业价值与实现差异（如 [[entities/anthropic|Anthropic]] 显式标记、[[entities/openai|OpenAI]] 自动缓存、[[entities/google|Google]] 预建对象）。最后指出应用层 [[concepts/语义缓存|语义缓存]]（如 [[entities/gptcache|GPTCache]]）与模型层缓存的本质区别。

## 关键实体
- [[entities/vllm|vLLM]]：高性能推理引擎，首创 PagedAttention 技术大幅提升显存利用率
- [[entities/anthropic|Anthropic]]：Claude 模型开发商，采用显式 `cache_control` 标记的缓存机制
- [[entities/openai|OpenAI]]：GPT 模型开发商，提供透明无感知的自动前缀缓存
- [[entities/google|Google]]：Gemini 模型开发商，采用显式预建缓存对象机制
- [[entities/gptcache|GPTCache]]：应用层语义缓存工具，基于向量相似度匹配历史问答
- [[entities/tgi|TGI]]：HuggingFace 推出的大模型推理服务框架
- [[entities/sglang|SGLang]]：新兴的高性能大模型推理框架
- [[entities/redis-vector|Redis Vector]]：Redis 提供的向量检索能力，可用于实现语义缓存

## 关键概念
- [[concepts/kv-cache|KV Cache]]：自回归生成的核心加速技术，避免历史 token 的重复计算
- [[concepts/pagedattention|PagedAttention]]：vLLM 借鉴虚拟内存分页思想的 KV Cache 管理技术
- [[concepts/prompt-caching|Prompt Caching]]：复用相同前缀 KV Cache 以降本提速的优化机制
- [[concepts/continuous-batching|Continuous Batching]]：动态组批技术，配合 PagedAttention 成倍提升吞吐量
- [[concepts/语义缓存|语义缓存]]：基于向量相似度的应用层问答缓存机制
- [[concepts/自注意力|自注意力]]：Transformer 核心机制，KV Cache 的理论来源
- [[concepts/因果注意力|因果注意力]]：确保历史 K/V 不变的理论基础
- [[concepts/ttft|TTFT]]：首 token 延迟，Prompt Caching 可显著优化的关键指标
- [[concepts/缓存命中率|缓存命中率]]：衡量 Prompt Caching 实际效果的核心指标

## 要点
- **缓存分三层**：推理引擎层 [[concepts/kv-cache|KV Cache]]、API/框架层 [[concepts/prompt-caching|Prompt Caching]]、应用层 [[concepts/语义缓存|语义缓存]]，三者解决不同层面的效率问题。
- **KV Cache 是实时生成的基石**：通过缓存历史 token 的 K/V 张量，将计算复杂度从 O(n²) 降至 O(n) 增量计算；代价是显存随上下文长度线性增长，长上下文下常成为显存瓶颈。
- **PagedAttention 极致压榨显存**：[[entities/vllm|vLLM]] 将 KV Cache 按 block 分页管理，消除连续分配的内部碎片，显存利用率从约 20% 跃升至约 96%。
- **Prompt Caching 差异化实现**：[[entities/anthropic|Anthropic]] 需显式标记（1/10 读取价）、[[entities/openai|OpenAI]] 全自动（5 折）、[[entities/google|Google]] 预创建对象、[[entities/vllm|vLLM]] 通过启动参数启用。
- **最佳实践**：将稳定内容（System Prompt、文档）置于最前并启用缓存，动态变化内容置于末尾，同时需注意缓存 TTL 有效期，并通过响应字段确认真实的 [[concepts/缓存命中率|缓存命中率]]。
- **语义缓存本质不同**：属于应用层优化，通过 Embedding 匹配相似问题直接返回历史答案，无需调用模型，需警惕相似问题的误判风险。