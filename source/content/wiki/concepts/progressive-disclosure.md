---
type: concept
created: 2026-06-24
updated: 2026-07-28
sources:
  - "[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"
  - "[[sources/“可逃逸架构”设计模式_4e2181]]"
tags:
  - "method"
aliases:
  - "渐进式披露"
  - "Progressive Disclosure 方法"
---

## Description
Progressive Disclosure（渐进式披露）在不同语境中呈现出双重面貌。作为 Anthropic 为 Claude Skills 宣传的核心营销概念，它指的是按需逐步加载信息到上下文窗口中，而非一次性全部加载。作者指出，该概念本质上与程序员早在 1960 年代就已使用的"手动分页"（Manual Paging）技术如出一辙，并未从根本上解决上下文窗口的局限性，而是通过包装使其听起来更具先进性。然而，在"可逃逸架构"设计模式中，渐进式披露被赋予了具体的工程实现路径：采用 L1 Router（意图识别）到 L2 Worker（任务执行）的分层架构，Worker 只有在被激活时才动态加载该领域下的 MCP Tools，严禁将 ERP、CRM、OA 等 50+ 个工具一次性注入 System Prompt。该策略的有效性可通过"8k 挑战"来验证——即 Agent 能否在限制 8k 上下文的小模型上跑通核心流程，从而减少对长窗口模型的依赖，降低成本和延迟。

## Related Concepts
- [[concepts/手动分页|手动分页]]
- [[concepts/上下文窗口压力|上下文窗口压力]]
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/模型无关性|模型无关性]]

## Related Entities
- [[entities/claude-4-5|Claude 4.5]]

## Mentions in Source

> **Source: [[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]**
> - "如果你剥开 "Progressive Disclosure"（渐进式披露）这个营销词汇，你会发现里面藏着的，不过是程序员早在 1960 年代就玩剩下的东西——**手动分页 (Manual Paging)**。"

> **Source: [[sources/“可逃逸架构”设计模式_4e2181|"可逃逸架构"设计模式_4e2181]]**
> - "实现：采用渐进式披露 L1 Router (意图识别) -> L2 Worker (任务执行) 的分层架构。Worker 只有在被激活时，才动态加载该领域下的 MCP Tools。"
> - "判断标准：'8k 挑战' —— 你的 Agent 能否在限制 8k 上下文的小模型（如本地 Llama 3）上跑通核心流程？"
> - "严禁将 ERP、CRM、OA 等 50+ 个工具一次性注入到 System Prompt 中。这会导致对长窗口模型的强依赖，且不仅贵，还慢。"