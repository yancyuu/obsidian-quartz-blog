---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [product]
aliases:
  - "vLLM推理引擎"
---


# vLLM

## 基本信息
- Type: product
- Source: [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]

## 描述
vLLM 是一个高性能的大语言模型（LLM）推理引擎，其核心创新是 [[concepts/pagedattention|PagedAttention]] 技术。它借鉴操作系统虚拟内存的分页机制来管理 [[concepts/kv-cache|KV Cache]]，将 KV Cache 划分为固定大小的 block（块），按需分配并通过块表（block table）映射逻辑地址到物理地址。这一设计消除了内部碎片，将显存利用率从约 20% 大幅提升至约 96%。配合 [[concepts/continuous-batching|Continuous Batching]]（连续批处理）技术，vLLM 的吞吐量比朴素实现高出数十倍。在生产环境中，自建推理服务几乎都采用 vLLM 作为底层引擎，并通过 `--enable-prefix-caching` 等参数支持 [[concepts/prompt-caching|Prompt Caching]] 与 [[concepts/语义缓存|语义缓存]] 以进一步提升性能。

## 相关实体
- [[entities/anthropic|Anthropic]]
- [[entities/openai|OpenAI]]
- [[entities/google|Google]]
- [[entities/redis|Redis]]
- [[entities/gptcache|GPTCache]]

## 相关概念
- [[concepts/kv-cache|KV Cache]]
- [[concepts/pagedattention|PagedAttention]]
- [[concepts/prompt-caching|Prompt Caching]]
- [[concepts/continuous-batching|Continuous Batching]]
- [[concepts/语义缓存|语义缓存]]

## 来源提及
- "生产自建推理服务几乎都用 **vLLM**（或 TGI/SGLang），核心价值就是这套 KV Cache 管理 + 连续批处理。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]
- "**vLLM（自建）** | `--enable-prefix-caching` | 自动复用相同前缀 KV，提升吞吐" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]
- "vLLM · PagedAttention 论文" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]