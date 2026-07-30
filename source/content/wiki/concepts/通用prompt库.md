---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [method]
aliases:
  - "prompt_templates"
  - "通用提示词模板"
---


# 通用Prompt库

## 定义
通用Prompt库是 `core-agent/` 目录下 `prompt_templates/` 所定义的模块，代表可在所有业务 Agent 间共享的通用提示词模板库。与每个 Agent 专用 Prompt 不同，通用 Prompt 库存储跨业务场景共用的提示词模式，旨在减少重复定义，体现模块化设计中公共逻辑抽取和复用的原则。

## 关键特征
- **跨场景共享**：存储所有业务 Agent 通用的提示词模板，而非某个特定 Agent 专用的提示词
- **减少重复**：通过集中管理公共提示词模式，避免在各个 Agent 中重复定义相同逻辑
- **模块化复用**：遵循公共逻辑抽取原则，将通用提示词与专用逻辑分离，提升代码可维护性
- **目录级隔离**：以独立目录 `prompt_templates/` 进行组织，与各 Agent 内部的提示词文件明确区分

## 应用
- 在多 Agent 系统中，为不同业务 Agent 提供统一的系统提示词前缀、通用指令模板等
- 当多个 Agent 需要共享相同的行为约束、输出格式规范或通用交互模式时，直接引用通用 Prompt 库中的模板
- 作为 Agent 应用开发的标准化组件，降低新 Agent 的构建成本和维护复杂度

## 相关概念
- [[concepts/专用prompt|专用prompt]]
- [[concepts/核心逻辑|核心逻辑]]

## 相关实体
- [[entities/core-agent|core-agent]]

## 来源提及
- "prompt_templates/ — [[../../架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]" — [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]
- "通用Prompt库 ^bjozBd9K — [[../../架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]" — [[sources/agent-app代码结构_c030b6|agent-app代码结构_c030b6]]