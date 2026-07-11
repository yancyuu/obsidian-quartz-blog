---
type: concept
created: 2026-06-24
updated: 2026-06-24
sources: ["[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"]
tags: [theory]
aliases:
  - "Transformer架构"
  - "Transformer模型"
  - "Transformers"
---


# Transformer

## 定义
Transformer 是当前大语言模型（LLM）的主流基础架构，由自注意力机制（Self-Attention）构建而成。其核心注意力机制在处理序列数据时具有 O(N²) 的计算复杂度，这意味着随着上下文长度的增加，计算和显存开销呈平方级增长。这一固有特性导致上下文窗口存在严重的资源瓶颈，被形象地比喻为"又贵、又短、又容易遗忘的金鱼脑"。

## 关键特征
- **O(N²) 计算复杂度**：自注意力机制要求序列中每个 token 与所有其他 token 进行计算，导致计算量随序列长度呈平方级增长
- **KV Cache 显存占用**：在推理过程中，模型需要缓存所有历史 token 的键值对（Key-Value），显存消耗随上下文长度线性增长
- **上下文窗口受限**：受限于计算资源和显存容量，模型能够有效处理的上下文长度存在硬性上限
- **长程遗忘问题**：即便在窗口范围内，模型对早期上下文信息的有效利用能力也会衰减

## 应用
Transformer 架构广泛应用于自然语言处理领域，是 GPT、Claude、Gemini 等主流大语言模型的基础架构。在实际工程落地中，为缓解其上下文窗口限制，业界普遍采用 RAG（检索增强生成）、Vector DB（向量数据库）、Skills（技能模块）等技术手段进行补偿——但这些方案本质上属于"生命维持系统"，而非对架构根本缺陷的彻底解决。

## 相关概念
- [[concepts/上下文窗口压力|上下文窗口压力]]
- [[concepts/kv-cache|KV Cache]]

## 相关实体
- [[entities/bert|BERT]]

## 来源提及
- "Transformer 架构的上下文窗口（Context Window），依然是那个又贵、又短、又容易忘事的'金鱼脑'。" — [[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05. 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好]]
- "只要 Transformer 的 $O(N^2)$ 复杂度还在，只要 KV Cache 的显存占用还在，所有的 Skills、RAG、Vector DB，**本质上都是在给这一代 LLM 延续生命维持系统。**" — [[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05. 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好]]