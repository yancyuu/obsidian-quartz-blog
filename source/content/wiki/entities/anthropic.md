---
type: entity
created: 2026-06-24
updated: 2026-07-28
sources:
  - "[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"
  - "[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"
tags:
  - "organization"
aliases:
  - "Anthropic AI"
  - "Anthropic 公司"
---

## 描述
Anthropic 是一家专注于 AI 安全与研究的公司，同时也是 Claude 系列 AI 产品的开发者。其推出的 [[entities/claude-4-5|Claude 4.5]] 等模型在业界具有广泛影响力。在 Agent 领域，Anthropic 最近发布了 **Claude Skills** 功能，被一些人吹捧为 Agent 的"工业革命"，但作者对此持强烈批评态度，认为其本质是用类似 DOS 操作系统的方案来掩盖 Agent 上下文窗口受限的技术缺陷。在推理优化方面，Anthropic 采用显式 `cache_control` 标记机制实现 Prompt Caching，允许用户标记 1-4 个缓存断点；缓存命中时读取价格仅为正常价的 1/10，缓存写入价格为正常价的 1.25 倍，最低缓存 token 数为 1024（Claude 3.5），重复调用越多节省越多。

## 相关实体
- [[entities/claude-skills|Claude Skills]]
- [[entities/claude-4-5|Claude 4.5]]
- [[entities/openai|OpenAI]]（待创建）
- [[entities/google|Google]]（待创建）
- [[entities/vllm|vLLM]]（待创建）

## 相关概念
- [[concepts/progressive-disclosure|Progressive Disclosure]]
- [[concepts/function-calling|Function Calling]]
- [[concepts/mcp|MCP]]
- [[concepts/prompt-caching|Prompt Caching]]（待创建）
- [[concepts/kv-cache|KV Cache]]（待创建）

## 来源提及

> **来源：[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]**
> - "Anthropic 最近发布的 **Claude Skills** 被吹上了天。甚至有人说这是 Agent 的'工业革命'。"
> - "结果 Anthropic 给了我们一个 DOS 操作系统，告诉我们：'虽然内存只有 640K，但你可以插软盘（Skills）呀！'"

> **来源：[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]**
> - "**Anthropic** | 显式 `cache_control` 标记 | 标记 1-4 个缓存断点；缓存命中读取价 **1/10**；缓存写入价 1.25x；最小 1024 token（Claude 3.5）"
> - "第一次调用：缓存写入（贵 25%）。后续 5 分钟内命中：读取价 1/10。**重复调用越多省越多**。"
> - "Anthropic · Prompt Caching"