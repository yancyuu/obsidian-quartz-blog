---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [term]
aliases:
  - "Time To First Token"
  - "首token延迟"
---


# TTFT

## 定义
TTFT（Time To First Token，首 token 延迟）是衡量大语言模型推理性能的重要指标，指从用户发送请求到模型返回第一个 token 所经历的时间。该指标直接反映用户等待首次响应的体验，是实时交互场景下的核心性能考量维度。

## 关键特征
- **用户体验敏感**：TTFT 直接决定用户在发送请求后等待首次输出的时间，对交互式应用至关重要。
- **受 Prompt 长度影响**：较长的 Prompt 需要更多的前向计算时间，通常会导致 TTFT 增加。
- **可通过缓存优化**：利用 [[concepts/prompt-caching|prompt-caching]] 机制跳过相同前缀的重复计算，可以显著降低 TTFT。
- **与 KV Cache 密切相关**：[[concepts/pagedattention|PagedAttention]] 及 KV Cache 技术的管理效率直接影响首 token 的生成速度。

## 应用
- **实时对话系统**：在聊天机器人和 AI 助手等场景中，低 TTFT 能提供更流畅的对话体验。
- **流式输出服务**：支持流式生成的模型服务依赖较低的 TTFT 以实现快速首字返回。
- **性能基准测试**：作为评估推理引擎和服务框架效率的标准基准之一。

## 相关概念
- [[concepts/prompt-caching|prompt-caching]]
- [[concepts/pagedattention|PagedAttention]]

## 相关实体
*无相关实体*

## 来源提及
- "**省时**：跳过前缀的前向计算，降低首 token 延迟（TTFT）" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]