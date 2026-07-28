---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [product]
aliases:
  - "One API"
  - "OneAPI网关"
---


# OneAPI

## 基本信息
- Type: product
- Source: [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式_4e2181]]

## 描述
OneAPI 是一款 AI 模型网关工具，与 [[entities/LiteLLM|LiteLLM]] 并列推荐作为实现[[concepts/模型无关性|模型无关性]]的关键基础设施。其核心作用是统一管理不同模型供应商的 API 接口，使 Agent 代码不直接依赖任何特定模型（如 [[entities/DeepSeek|DeepSeek]]）的 SDK 或 API 格式。通过 OneAPI 这样的网关层，架构师可以在配置层面完成模型切换，而无需触碰业务逻辑代码，从而满足[[concepts/可逃逸架构|可逃逸架构]]对供应商解耦的设计要求。

## 相关实体
- [[entities/LiteLLM|LiteLLM]]
- [[entities/DeepSeek|DeepSeek]]

## 相关概念
- [[concepts/模型无关性|模型无关性]]
- [[concepts/可逃逸架构|可逃逸架构]]

## 来源提及
- "必须通过 OneAPI / LiteLLM 等网关层调用。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "切换到国产模型，是改一行配置（Config），还是要去改代码？改代码即不合格。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]