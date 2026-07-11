---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0312-💆copilot和agent的区别_750b52]]"]
tags: [term]
aliases:
  - "副驾"
  - "编程助手"
---


# Copilot

## 定义
Copilot（副驾）是一种面向人类的智能助手范式，其核心定位是辅助用户执行具体任务，提升人的工作效率。Copilot 是人的增强助手，以人类为中心进行交互，由人类触发启动后由 AI 响应并完成辅助工作。在与 Agent（智能体）的对比中，Copilot 代表"被动辅助型"模式，强调对人的能力增强而非自主任务执行。

## 关键特征
- **人发起，AI 响应**：由人类触发启动，Copilot 处于被动响应地位（人 ← Copilot：我来帮你做 ✅ 被动辅助型）
- **以人类为中心的交互方式**：始终围绕用户意图展开，作为人的增强助手存在
- **偏短期上下文**：依赖当前会话或任务的上下文，而非长期记忆
- **通常不具备显式规划器**：不像 Agent 那样具备自主规划与编排能力
- **弱自治性**：不具备自主决策与持续执行的能力
- **可使用多工具/插件**：有时会调用多种工具，但通常作为"函数助手"嵌入，而非自主编排工具链

## 应用
- **代码编写辅助**：如 GitHub Copilot 在 IDE 中实时提供代码补全与建议
- **办公文档增强**：如 Office Copilot 辅助文档撰写、数据分析、邮件起草等
- **函数级辅助嵌入**：以 Function Calling 等方式作为函数助手嵌入到各类应用中，按需为用户提供辅助能力

## 相关概念
- [[concepts/function-call|Function Calling]] — Copilot 常通过函数调用方式嵌入为"函数助手"

## 相关实体
- [[entities/github-copilot|GitHub Copilot]] — 典型的 Copilot 实现产品

## 来源提及
- "面向人类的智能助手，辅助执行具体任务" — [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312 💆Copilot和Agent的区别]]
- "Copilot 是人的增强助手，Agent 是具备一定自主性的任务执行者。" — [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312 💆Copilot和Agent的区别]]
- "人 ← Copilot：我来帮你做 ✅ 被动辅助型" — [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312 💆Copilot和Agent的区别]]