---
type: entity
created: 2026-06-22
updated: 2026-06-22
sources: ["[[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]"]
tags: [product]
aliases:
  - "BGE-small-zh"
  - "BGE small zh v1.5"
  - "BAAI bge-small-zh-v1.5"
---


# bge-small-zh-v1.5

## 基本信息
- Type: product
- Source: [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]

## 描述
bge-small-zh-v1.5 是由 BAAI（智源研究院）发布的 BGE（BAAI General Embedding）系列中的一款轻量级中文文本向量化模型（Embedding 模型）。它通过 SentenceTransformer 接口加载，可将用户输入的文本编码为高维稠密向量，兼顾了推理性能与语义匹配效果。在 [[entities/客服agent|客服Agent]] 系统的 [[concepts/语义缓存|语义缓存]] 模块中，团队选择该模型将用户输入编码为向量，并基于余弦相似度计算判断是否命中缓存，从而大幅提升响应速度并降低资源消耗。该模型凭借轻量化的体积和良好的中文语义理解能力，成为企业级高并发场景下 [[concepts/向量检索|向量检索]] 的理想选择。

## 相关实体
- [[entities/客服agent|客服Agent]]

## 相关概念
- [[concepts/语义缓存|语义缓存]]
- [[concepts/向量检索|向量检索]]

## 来源提及
- "self.encoder = SentenceTransformer('bge-small-zh-v1.5')" — [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02. 我们将企业级 Agent 降低85%的血泪重构史]]
- "# 使用轻量级 Embedding 模型，兼顾性能与效果" — [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02. 我们将企业级 Agent 降低85%的血泪重构史]]