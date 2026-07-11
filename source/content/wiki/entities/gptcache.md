---
type: entity
created: 2026-06-24
updated: 2026-06-24
sources: ["[[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060]]"]
tags: [product]
aliases:
  - "GPT Cache"
  - "GPT缓存"
---


# GPTCache

## 基本信息
- Type: product
- Source: [[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060|07.我如何用-agent-砍掉团队30的"垃圾时间"_d98060]]

## 描述
GPTCache 是一款用于大语言模型接口的语义缓存工具，旨在降低 API 调用成本和响应延迟。在舆情数据处理场景中，作者采用分级策略，对于简单的重复评论（如"好评"）直接走 GPTCache 或正则匹配，从而避免不必要的 [[entities/gpt-4|GPT-4]] 调用。该工具与 [[entities/飞书智能助理|飞书]] 等协同平台配合使用，有效减少了对大模型接口的压力，实现了系统整体运行成本的显著下降。

## 相关实体
- [[entities/gpt-4|GPT-4]]
- [[entities/飞书智能助理|飞书]]

## 相关概念
- [[concepts/成本管理|成本管理]]
- [[concepts/语义缓存|语义缓存]]

## 来源提及
- "**解法**：**分级策略 + GPTCache**。" — [[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060|07.我如何用 Agent 砍掉团队30的"垃圾时间"]]
- "对于简单的重复评论（如"好评"），直接走缓存或正则。" — [[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060|07.我如何用 Agent 砍掉团队30的"垃圾时间"]]