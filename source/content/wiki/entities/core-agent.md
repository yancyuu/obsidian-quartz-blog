---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [project]
aliases:
  - "core-agent模块"
  - "core-agent/"
---


# core-agent

## 基本信息
- Type: project
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述

core-agent 是架构图中的核心 Agent 模块目录，作为整个 Agent 应用的基础设施层存在。该目录主要包含两个核心组成部分：Agent 基类（`base_agent.py`）和通用 Prompt 库（`prompt_templates/`）。通过将公共逻辑抽取到基类中，该模块为所有具体业务代理提供统一的基类继承和通用提示词模板，实现了代码复用与架构的可维护性。

在整体架构设计中，core-agent 与 [[entities/agent基类|Agent基类]] 紧密配合，构成业务代理的构建基础。该模块的设计体现了 [[concepts/核心逻辑剥离|核心逻辑剥离]] 的工程理念，将通用能力下沉到基础设施层，使得上层业务代理可以专注于具体 [[concepts/业务闭环|业务闭环]] 的实现。同时，这种分层结构也契合 [[concepts/可逃逸设计|可逃逸设计]] 的思想，便于后续对具体 Agent 实现进行替换和演进。

## 相关实体
- [[entities/agent基类|Agent基类]]

## 相关概念
- [[concepts/业务闭环|业务闭环]]
- [[concepts/可逃逸设计|可逃逸设计]]

## 来源提及
- "core-agent/ ^YmrN4TPs" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "base_agent.py" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "Agent基类 ^eflI6yxD" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "prompt_templates/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "通用Prompt库 ^bjozBd9K" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]