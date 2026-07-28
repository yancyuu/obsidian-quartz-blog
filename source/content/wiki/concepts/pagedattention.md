---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [method]
aliases:
  - "分页注意力"
  - "PagedAttention"
---


# PagedAttention

## 定义
PagedAttention 是 [[entities/vllm|vLLM]] 的核心创新技术，借鉴操作系统虚拟内存分页的思想来管理大模型推理过程中的 KV Cache。它将 KV Cache 分割为固定大小的 block（块），按需进行动态分配，并通过块表（block table）实现逻辑地址到物理地址的映射。该机制彻底消除了传统连续内存分配中的内部碎片和预留浪费问题，将显存利用率从约 20% 大幅提升至约 96%。

## 关键特征
- **虚拟内存分页机制**：将操作系统的分页管理思想引入 GPU 显存管理，实现 KV Cache 的非连续物理存储。
- **按需动态分配**：将 KV Cache 划分为固定大小的 block，根据序列实际生成长度按需分配物理块，避免预留空间浪费。
- **块表映射**：维护块表（block table）结构，记录逻辑块到物理块的映射关系，实现灵活的内存寻址。
- **消除内存碎片**：有效解决传统连续分配方式中的内部碎片问题，显存利用率从约 20% 提升至约 96%。
- **高吞吐量**：配合 [[concepts/continuous-batching|Continuous Batching]] 技术，可使推理吞吐量比朴素实现高出数十倍。

## 应用
- **大语言模型推理服务**：作为 [[entities/vllm|vLLM]] 推理框架的核心组件，支撑高并发场景下的大模型推理服务部署。
- **KV Cache 显存优化**：在显存资源受限的 GPU 环境下，最大化利用显存以支持更多并发请求。
- **长序列生成场景**：对于长度不确定的文本生成任务，按需分配机制可有效避免因预分配过长序列空间而导致的显存浪费。

## 相关概念
- [[concepts/kv-cache|KV Cache]]
- [[concepts/continuous-batching|Continuous Batching]]

## 相关实体
- [[entities/vllm|vLLM]]

## 来源提及
- "把 KV Cache 像**操作系统虚拟内存分页**一样管理：" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]
- "KV Cache 分成固定大小的 **block（块）**，按需分配，用**块表**映射逻辑→物理。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]
- "消除内部碎片，显存利用率从 ~20% 提升到 ~96%。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]