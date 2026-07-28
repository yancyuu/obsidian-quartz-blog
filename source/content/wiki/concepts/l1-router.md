---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/渐进式披露架构_780a26]]"
tags:
  - "method"
aliases:
  - "L1 路由器"
  - "IntentClassifier"
  - "意图识别路由器"
  - "意图识别/IntentClassifier"
---

## Description
L1 Router 作为可逃逸架构的意图识别层，在接收到用户请求后通过[[concepts/pure-intent|纯意图匹配]]确定需要激活的技能，严格避免在意图识别阶段引入[[concepts/上下文污染|上下文污染]]。它与[[concepts/skill-registry|技能注册表]]协同工作——技能注册表仅包含技能名称而非工具定义，IntentClassifier 匹配到目标技能后才触发后续的[[concepts/on-demand-connection|工具动态加载]]流程。这种设计确保了意图识别的高效性和准确性，同时保持了系统的[[concepts/无状态上下文|无状态特性]]。作为架构入口，L1 Router 仅做轻量级的路由决策而不承载业务逻辑，符合[[concepts/核心逻辑剥离|核心逻辑剥离]]原则，并作为渐进式信息披露的起点，仅加载必要的上下文和组件以避免上下文窗口的浪费。

## Related Concepts
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/pure-intent|纯意图]]
- [[concepts/上下文污染|上下文污染]]
- [[concepts/skill-registry|技能注册表]]
- [[concepts/on-demand-connection|按需连接]]
- [[concepts/无状态上下文|无状态上下文]]
- [[concepts/路由架构与按需加载|路由架构与按需加载]]
- [[concepts/核心逻辑剥离|核心逻辑剥离]]

## Related Entities
*暂无相关实体*

## Mentions in Source

> **来源：[[sources/渐进式披露架构_780a26|渐进式披露架构]]**
> - "🧠 L1 Router 意图识别/IntentClassifier"
> - "Pure Intent No Context Pollution"
> - "2. 匹配意图"

## Active Tag Vocabulary (Issue #85 — user-controlled)

When assigning `type` to an entity or concept, you MUST use one of the following allowed values. Do NOT invent new types.

**Entity types** (entity_type field — one of):
- person
- organization
- project
- product
- event
- place
- other

**Concept types** (concept_type field — one of):
- theory
- method
- field
- phenomenon
- standard
- term
- other

If a discovered item does not clearly fit any of the above, choose the closest match. Do NOT emit a free-form type string — the frontmatter validator will reject it.