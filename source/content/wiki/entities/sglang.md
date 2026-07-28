---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [product]
aliases:
  - "SGLang"
  - "SG-Lang"
---


# SGLang

## 基本信息
- Type: product
- Source: [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]

## 描述
SGLang 是一个新兴的大模型推理框架，在来源资料中被作为与 vLLM、TGI 同级的生产级推理引擎提及。其同样提供 [[concepts/kv-cache|KV Cache]] 管理和 [[concepts/连续批处理|连续批处理]] 等核心优化能力，适用于自建大模型推理服务场景。作为大模型推理基础设施的重要选型之一，SGLang 与 vLLM、TGI 共同构成了当前业界主流的自建推理引擎生态。

## 相关实体
（暂无）

## 相关概念
- [[concepts/kv-cache|KV Cache]]
- [[concepts/连续批处理|Continuous Batching]]

## 来源提及
- "生产自建推理服务几乎都用 **vLLM**（或 TGI/SGLang），核心价值就是这套 KV Cache 管理 + 连续批处理。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]