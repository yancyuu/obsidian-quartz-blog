---
type: concept
created: 2026-06-24
updated: 2026-06-24
sources: ["[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"]
tags: [method]
aliases:
  - "KV Cache"
  - "键值缓存"
  - "Key-Value Cache"
---


# KV Cache

## 定义
KV Cache 是 Transformer 模型在自回归推理阶段使用的一种关键加速机制。其核心思想是在生成每个新 token 时，缓存之前已计算的注意力机制中的键（Key）和值（Value）向量，避免对历史 token 进行重复计算，从而将每步推理的计算量从 O(N²) 降低到 O(N)。然而，随着上下文长度增长，缓存所有历史键值对所需的显存空间呈线性膨胀，成为 Transformer 架构固有的资源瓶颈之一。

## 关键特征
- **推理加速**：通过缓存历史 token 的键值对，避免每生成一个新 token 就重新编码全部上下文，显著降低推理延迟。
- **显存瓶颈**：KV Cache 的显存占用随序列长度线性增长（O(N)），在长上下文场景下会迅速耗尽 GPU 显存，构成上下文窗口扩展的物理限制。
- **与 O(N²) 复杂度的耦合效应**：KV Cache 的显存占用与注意力计算的 O(N²) 复杂度共同构成了 Transformer 架构的根本性约束，两者叠加使得上下文窗口的扩展面临巨大挑战。
- **架构固有缺陷**：KV Cache 的显存压力并非可通过外部工程手段（如 RAG、Vector DB 等）完全消除的问题，而是 Transformer 架构本身的内在限制。

## 应用
- **大语言模型推理服务**：广泛应用于 GPT、Claude、LLaMA 等 Transformer 架构模型的在线推理与部署，是生产级推理引擎（如 vLLM、TensorRT-LLM）的核心优化组件。
- **长上下文处理**：在需要处理长文档、多轮对话或多步推理的 Agent 场景中，KV Cache 的管理策略（如分页缓存 PagedAttention、缓存量化等）直接影响系统的可处理上下文长度和并发能力。

## 相关概念
- [[concepts/transformer|Transformer]]
- [[concepts/上下文窗口压力|上下文窗口压力]]

## 相关实体
*暂无相关实体。*

## 来源提及
- "只要 Transformer 的 $O(N^2)$ 复杂度还在，只要 KV Cache 的显存占用还在，所有的 Skills、RAG、Vector DB，**本质上都是在给这一代 LLM 延续生命维持系统。**" — [[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05. 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好]]