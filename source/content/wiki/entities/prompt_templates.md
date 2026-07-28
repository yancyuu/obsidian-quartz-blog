---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [product]
aliases:
  - "Prompt模板目录"
  - "通用提示词库目录"
---


# prompt_templates/

## 基本信息
- Type: product
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述

`prompt_templates/` 是 [[entities/core-agent|core-agent]] 模块下的子目录，用于存放通用的 Prompt 模板库。与各个 Agent 目录下 [[entities/prompts-py|prompts.py]] 中的专用 Prompt 不同，`prompt_templates/` 提供跨 Agent 共享的基础提示词模板，避免在不同 Agent 中重复定义相同的提示词内容。这种将通用 Prompt 与专用 Prompt 分层管理的设计，使得 Prompt 的维护和迭代更加高效，同时也便于进行 [[concepts/上下文工程|上下文工程]] 的统一管理。通过集中管理通用模板，开发者可以快速复用已验证的提示词模式，降低 Prompt 工程的复杂度。

## 相关实体
- [[entities/core-agent|core-agent]]
- [[entities/prompts-py|prompts.py]]

## 相关概念
- [[concepts/通用Prompt库|通用Prompt库]]
- [[concepts/上下文工程|上下文工程]]

## 来源提及
- "prompt_templates/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "通用Prompt库 ^bjozBd9K" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]