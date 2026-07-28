---
type: entity
created: 2026-06-23
updated: 2026-07-28
sources:
  - "[[sources/04-gpt-5-2-史诗级翻车谷歌这次居然赢麻了_e3bee2]]"
  - "[[sources/06-🚨-小扎深夜“拔管”元宇宙烧了700亿最后发现还是墨镜香_fc0e48]]"
  - "[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"
tags:
  - "organization"
aliases:
  - "谷歌"
  - "Google LLC"
  - "Alphabet"
---

## 描述

Google 是全球科技巨头，也是 [[entities/gemini-3-pro|Gemini 3 Pro]] 的开发公司。在来源文章的编程能力实测中，其产品 Gemini 3 Pro 全面超越了竞争对手 [[entities/openai|OpenAI]] 的 GPT-5.2。作者认为在 Coding 垂类领域，谷歌终于实现了复仇和反超，成为了当下的"王道"。文章指出 Gemini 3 Pro 在测试中表现出"冷静的成年人"的稳健风格，与 GPT-5.2 的频繁翻车形成鲜明对比。此外，Google 在 VR/AR 领域也有布局，其 VR 业务投入的缩减成为 [[entities/meta|Meta]] 敢于裁撤 VR 部门的外部因素之一，反映出行业整体对 VR 赛道的降温趋势。

在大模型推理基础设施方面，Google Gemini 采用了显式的 `cachedContent` 机制来实现 Prompt Caching（上下文缓存）。用户需要预先创建缓存内容对象，并按存储时长计费，这与 [[entities/anthropic|Anthropic]] 和 [[entities/openai|OpenAI]] 的缓存策略有所不同。

## 相关实体
- [[entities/gemini-3-pro|Gemini 3 Pro]]
- [[entities/openai|OpenAI]]
- [[entities/meta|Meta]]
- [[entities/apple-vision-pro|Apple Vision Pro]]
- [[entities/anthropic|Anthropic]]
- [[entities/vllm|vLLM]]

## 相关概念
- [[concepts/prompt-caching|Prompt Caching]]
- [[concepts/kv-cache|KV Cache]]

## 来源提及

> **Source: [[sources/04-gpt-5-2-史诗级翻车谷歌这次居然赢麻了_e3bee2|04-gpt-5-2-史诗级翻车谷歌这次居然赢麻了_e3bee2]]**
> - "谷歌这次不是"赢了"，是直接把 GPT-5.2 按在地上摩擦。"
> - "谷歌的 Gemini 3 Pro 这一次，居然成了那个"冷静的成年人"。"

> **Source: [[sources/06-🚨-小扎深夜"拔管"元宇宙烧了700亿最后发现还是墨镜香_fc0e48|06-🚨-小扎深夜"拔管"元宇宙烧了700亿最后发现还是墨镜香_fc0e48]]**
> - "Meta 的高管们终于承认：之所以现在敢裁员，是因为苹果和谷歌也不怎么卷 VR 了。"

> **Source: [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-kv-cache与prompt-caching_ab1674]]**
> - "**Google Gemini** | 显式 cachedContent | 预先创建缓存内容对象，按存储时长计费"
> - "Google Gemini · Context Caching"