---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [product]
aliases:
  - "Text Generation Inference"
  - "HuggingFace TGI"
---


# TGI

## 基本信息
- Type: product
- Source: [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]

## 描述
TGI（全称 Text Generation Inference）是 HuggingFace 推出的大模型推理服务框架，与 [[entities/vllm|vLLM]] 和 SGLang 并列为生产环境中最常用的自建推理引擎之一。其核心价值在于提供高效的 [[concepts/kv-cache|KV Cache]] 管理与连续批处理（Continuous Batching）能力，从而显著提升大模型在服务端的推理吞吐量与资源利用率。通过复用注意力机制中的 Key/Value 张量，TGI 能够避免每一步生成时重新计算历史 token，大幅降低延迟。在企业级自建大模型推理服务的场景中，TGI 是主流的工程选择之一。

## 相关实体
- [[entities/vllm|vLLM]] — 同为生产环境主流的自建大模型推理引擎，互为替代方案
- [[entities/sglang|SGLang]] — 另一种常用的大模型推理服务框架

## 相关概念
- [[concepts/kv-cache|KV Cache]] — TGI 核心优化的推理缓存机制
- [[concepts/pagedattention|PagedAttention]] — 高效 KV Cache 管理的底层技术
- [[concepts/continuous-batching|Continuous Batching]] — 动态批处理技术，提升并发处理能力

## 来源提及
- "生产自建推理服务几乎都用 **vLLM**（或 TGI/SGLang），核心价值就是这套 KV Cache 管理 + 连续批处理。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]
- "| **① 推理引擎 KV Cache** | 注意力的 Key/Value 张量 | 模型服务（vLLM/TGI/官方） | 避免每步重算历史 token |" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]