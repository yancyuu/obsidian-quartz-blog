---
type: concept
created: 2026-06-24
updated: 2026-07-28
sources:
  - "[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"
  - "[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"
tags:
  - "method"
aliases:
  - "KV Cache"
  - "键值缓存"
  - "Key-Value Cache"
---

## Description
KV Cache 是大语言模型能够实时进行自回归生成的核心技术基石。在因果注意力机制下，已生成 token 的 K、V 不会改变（它们只依赖自己及更早的输入），因此可以把每层的历史 K/V 存起来，下一步只算新 token 的 Q/K/V，与缓存拼接送入注意力计算。这使得每步推理的计算量从 O(t) 的全量重算降低到 O(1) 的增量计算，是 LLM 能实现实时生成的关键所在。

然而，KV Cache 的显存占用随上下文长度线性增长（O(N)），在长上下文场景（如 128K）下，其显存占用常远超模型权重本身，成为推理系统的主要瓶颈。KV Cache 的显存压力与注意力计算的 O(N²) 复杂度共同构成了 Transformer 架构的根本性约束，两者叠加使得上下文窗口的扩展面临巨大挑战。这一架构固有缺陷并非可通过外部工程手段（如 RAG、Vector DB 等）完全消除，催生了 PagedAttention、Prompt Caching、Continuous Batching 等一系列优化技术。

## 关键特征
- **推理加速**：通过缓存历史 token 的键值对，避免每生成一个新 token 就重新编码全部上下文，将每步从 O(t) 的全量重算降到 O(1) 增量计算，显著降低推理延迟。
- **显存瓶颈**：KV Cache 的显存占用随序列长度线性增长（O(N)），在长上下文场景（如 128K）下，常远超模型权重本身成为显存瓶颈，构成上下文窗口扩展的物理限制。
- **与 O(N²) 复杂度的耦合效应**：KV Cache 的显存占用与注意力计算的 O(N²) 复杂度共同构成了 Transformer 架构的根本性约束，两者叠加使得上下文窗口的扩展面临巨大挑战。
- **架构固有缺陷**：KV Cache 的显存压力并非可通过外部工程手段（如 RAG、Vector DB 等）完全消除的问题，而是 Transformer 架构本身的内在限制。

## 应用
- **大语言模型推理服务**：广泛应用于 GPT、Claude、LLaMA 等 Transformer 架构模型的在线推理与部署，是生产级推理引擎（如 vLLM、TensorRT-LLM）的核心优化组件。
- **长上下文处理**：在需要处理长文档、多轮对话或多步推理的 Agent 场景中，KV Cache 的管理策略（如分页缓存 PagedAttention、缓存量化、Prompt Caching 等）直接影响系统的可处理上下文长度和并发能力。

## 相关概念
- [[concepts/transformer|Transformer]]
- [[concepts/上下文窗口压力|上下文窗口压力]]
- [[concepts/非transformer架构|非Transformer架构]]

## 相关实体
- [[entities/vllm|vLLM]]

## 来源提及

> **Source: [[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05. 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好]]**
> - "只要 Transformer 的 $O(N^2)$ 复杂度还在，只要 KV Cache 的显存占用还在，所有的 Skills、RAG、Vector DB，**本质上都是在给这一代 LLM 延续生命维持系统。**"

> **Source: [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]**
> - "因果注意力下，**已生成 token 的 K、V 不会变**（它们只依赖自己及更早的输入）。所以把每层的历史 K/V 存起来，下一步只算**新 token** 的 Q/K/V，与缓存拼接送入注意力"
> - "每步从 O(t) 的全量重算降到 O(1) 增量计算，**这是自回归 LLM 能实时生成的关键**。"
> - "长上下文（如 128K）下，**KV Cache 显存常远超模型权重本身**，成为显存瓶颈。"