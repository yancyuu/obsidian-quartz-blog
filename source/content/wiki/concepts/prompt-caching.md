---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [method]
aliases:
  - "Prefix Caching"
  - "前缀缓存"
  - "提示缓存"
---


# Prompt Caching

## 定义
Prompt Caching（又称 Prefix Caching）是一种大语言模型推理优化机制。当多个推理请求包含相同的起始前缀（如 system prompt、长文档、few-shot 示例）时，系统会复用该前缀部分已计算的 KV Cache，避免重复的前向计算。

## 关键特征
- **前缀复用**：仅当请求的开头部分（前缀）完全一致时，才能命中缓存。一旦 token 出现分歧，后续内容将无法复用。
- **降低成本（省钱）**：相同前缀的输入 token 可按折扣价格计费，大幅降低高频调用场景的费用。
- **降低延迟（省时）**：跳过冗长前缀的前向计算过程，有效降低首 token 延迟（TTFT）。
- **厂商实现差异**：不同服务商的实现机制不同。Anthropic 采用显式的 `cache_control` 标记，OpenAI 采用后台自动缓存机制，而开源推理框架 vLLM 则可通过启动参数直接启用。

## 应用
- **检索增强生成（RAG）**：在 RAG 架构中，系统提示词和长篇检索到的文档通常作为固定前缀多次传入，使用此机制可显著降低响应延迟和调用成本。
- **智能体**：Agent 在多轮工具调用和思考过程中需要频繁传递长篇系统指令和上下文记忆，前缀缓存能有效提升交互效率。
- **少样本提示**：在 few-shot 场景中，大量示例作为前缀固定不变，非常适合利用该机制进行推理加速。

## 相关概念
- [[concepts/长时记忆|长时记忆]]（KV Cache 相关）
- [[concepts/语义缓存|语义缓存]]
- [[concepts/rag架构|RAG架构]]
- [[concepts/few-shot-prompting|few-shot-prompting]]

## 相关实体
- [[entities/anthropic|Anthropic]]
- [[entities/openai|OpenAI]]
- [[entities/google|Google]]
- [[entities/vllm|vLLM]]

## 来源提及
- "当你的请求**前缀相同**（system prompt、长文档、few-shot 示例），这部分对应的 KV Cache 可以复用，**不必重复计算**。" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]
- "**省钱**：相同前缀的输入 token 按折扣计费" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]
- "**省时**：跳过前缀的前向计算，降低首 token 延迟（TTFT）" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]