---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/渐进式披露架构_780a26]]"]
tags: [method]
aliases:
  - "纯意图"
  - "纯净意图输入"
  - "Pure Intent"
---


# Pure Intent

## 定义
Pure Intent 是渐进式披露架构中用户请求处理的核心设计方法。它强调用户输入到达 L1 Router 时应当是纯净的意图表达，不携带任何上下文污染（No Context Pollution）。这一设计确保了意图识别的精确性，避免了历史对话或无关信息对路由判断的干扰。Pure Intent 配合无状态上下文（Stateless Context）和按需加载工具的机制，实现了轻量级的意图匹配和高效的任务分发。

## 关键特征
- **意图纯净性**：用户输入到达路由层时不含任何历史对话残留或无关上下文信息
- **无上下文污染**：遵循 No Context Pollution 原则，隔离历史信息对意图判断的干扰
- **无状态配合**：与无状态上下文机制协同工作，每次意图识别均为独立判断
- **精确路由**：纯净的意图输入使 L1 Router 能以最高准确率完成意图分类与任务分发
- **轻量匹配**：无需处理冗余上下文，意图匹配过程高效且低开销

## 应用
- **智能体路由系统**：在 L1 Router 层接收纯净的用户指令，实现精准的意图识别与技能分发
- **多技能调度场景**：当系统注册了大量技能时，Pure Intent 确保路由判断不被噪声干扰，准确匹配目标 Worker
- **高并发客服 Agent**：在海量用户请求场景下，通过保持意图纯净实现快速路由与响应
- **渐进式披露架构**：作为架构的入口设计原则，保障整个按需加载链条从正确的意图识别开始

## 相关概念
- [[concepts/上下文污染|上下文污染]]
- [[concepts/无状态上下文|无状态上下文]]
- [[concepts/l1-router|L1 路由器]]
- [[concepts/路由架构与按需加载|路由架构与按需加载]]
- [[concepts/读写分离|读写分离]]

## 相关实体
- [[concepts/l1-router|IntentClassifier]]
- [[concepts/user-request|User Request]]

## 来源提及
- "Pure Intent<br>No Context Pollution ^VKFArFTG" — [[sources/渐进式披露架构_780a26|渐进式披露架构_780a26]]
- "1. 输入指令 ^MYfTnOyD" — [[sources/渐进式披露架构_780a26|渐进式披露架构_780a26]]