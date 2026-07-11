---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f]]"]
tags: [project]
aliases:
  - "Deerflow智能体框架"
  - "Deerflow Framework"
---


# Deerflow

## 基本信息
- Type: project
- Source: [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415-🍖构建可演化的智能体系统架构]]

## 描述
Deerflow 是一个将 [[entities/langgraph|LangGraph]] 作为核心任务流编排引擎的开源智能体框架。它通过将查询改写、[[concepts/向量检索|向量检索]]、答案生成等节点组合成完整的任务链，展示了 LangGraph 在多轮状态流、[[concepts/multi-agent-rag|多智能体RAG]] 协作和调度容错要求高的 RAG 系统中的适用性。该框架支持在任务链中灵活插入中间错误处理、状态检查和 Token 预算限制等能力，体现了 [[concepts/状态持久化|状态持久化]] 与容错机制在复杂智能体系统中的工程价值。

## 相关实体
- [[entities/langgraph|LangGraph]]

## 相关概念
- [[concepts/multi-agent-rag|多智能体RAG]]
- [[concepts/状态持久化|状态持久化]]
- [[concepts/向量检索|向量检索]]

## 来源提及
- "此外，我们观察到在部分开源项目中（如 Deerflow），LangGraph 被有效用于以下几类任务流" — [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]
- "Deerflow 是一个将 LangGraph 作为核心任务流编排引擎的智能体框架，推荐重点关注它的两个部分" — [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]