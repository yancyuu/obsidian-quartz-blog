---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [method]
aliases:
  - "连续批处理"
  - "动态批处理"
---


# Continuous Batching

## 定义
Continuous Batching（连续批处理）是大模型推理引擎中用于提升吞吐量的关键技术。它通过在推理过程中动态地将多个请求组合成批次进行处理，避免了传统静态批处理中必须等待所有请求完成才能释放资源所导致的浪费。与 [[concepts/pagedattention|PagedAttention]] 的 KV Cache 分页管理配合使用时，可将推理吞吐量提升数十倍。

## 关键特征
- **动态组批**：在推理运行的每一iteration中，可随时向当前批次中插入新请求或移除已生成完毕的请求，无需等待同批次的其他请求完成。
- **消除资源闲置**：克服了传统静态批处理中"木桶效应"（即由最长请求决定整个批次生命周期）造成的GPU计算资源浪费。
- **高协同性**：通常与 [[concepts/kv-cache|KV Cache]] 的分页内存管理技术（如 PagedAttention）深度配合，在实现显存高效利用的同时最大化吞吐量。

## 应用
- **大模型推理引擎**：作为现代推理框架（如 [[entities/vllm|vLLM]]）的核心组件，用于在服务端并发处理海量用户的实时文本生成请求。
- **高并发 AI 服务**：在客服机器人、RAG 系统等需要同时响应大量独立用户查询的场景中，大幅提高 GPU 利用率并降低整体延迟。

## 相关概念
- [[concepts/pagedattention|PagedAttention]]
- [[concepts/kv-cache|KV Cache]]
- [[concepts/prompt-caching|Prompt Caching]]

## 相关实体
- [[entities/vllm|vLLM]]

## 来源提及
- "配合 **Continuous Batching（连续批处理）**，吞吐量比朴素实现高数十倍。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]
- "PagedAttention 分页管理 KV Cache 消除碎片 + Continuous Batching 动态组批，显存利用率和吞吐量提升一个数量级。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]