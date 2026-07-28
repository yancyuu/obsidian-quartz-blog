---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"]
tags: [method]
aliases:
  - "cache_control 标记"
  - "缓存控制参数"
  - "ephemeral cache"
---


# cache_control

## 定义
cache_control 是 Anthropic Claude API 中用于显式标记缓存断点的参数。开发者通过在请求的 system prompt 或消息内容中添加 cache_control 字段（类型为 ephemeral），将特定内容标记为可缓存的前缀。首次调用时以 1.25 倍价格写入缓存，后续命中时以十分之一的价格读取，大幅降低重复调用的成本。

## 关键特征
- 显式标记机制：开发者需要在请求体中手动添加 `cache_control` 字段来指定缓存断点位置
- 最多支持 1-4 个缓存断点，允许对复杂请求的不同部分分别进行缓存
- 缓存写入价格为标准输入 token 价格的 1.25 倍
- 缓存命中读取价格仅为标准输入 token 价格的 1/10
- 最小缓存量要求：Claude 3.5 模型至少需 1024 token
- 使用 `ephemeral` 类型标记临时缓存，具有生命周期限制

## 应用
- 长期固定的 System Prompt 场景：将系统指令标记为缓存前缀，避免每次请求重复付费
- 大规模文档问答：将参考文档内容标记为缓存，在多轮对话中复用同一文档上下文
- 多轮对话 Agent：缓存历史对话前缀，显著降低长对话场景下的累积 token 成本
- 工具定义缓存：将大量工具（function/tool）的 schema 描述标记为缓存，减少重复传输开销

## 相关概念
- [[concepts/prompt-caching|prompt-caching]]

## 相关实体
- [[entities/anthropic|Anthropic]]

## 来源提及
- "**Anthropic** | 显式 `cache_control` 标记 | 标记 1-4 个缓存断点；缓存命中读取价 **1/10**；缓存写入价 1.25x；最小 1024 token（Claude 3.5）" — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]
- `"cache_control": { "type": "ephemeral" }` — [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]