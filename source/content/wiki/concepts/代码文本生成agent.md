---
type: concept
created: 2026-06-25
updated: 2026-06-25
sources: ["[[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0]]"]
tags: [method]
aliases:
  - "Agent B"
  - "Code/Text Generation Agent"
---


# 代码文本生成Agent

## 定义
代码/文本生成Agent是专家Agent集群中的Agent B，专门负责代码和文本内容的生成任务。作为多智能体协作链路中的关键一环，它接收信息检索的结果和执行计划的指导，生成具体的代码或文本草稿。其输出将接受逻辑校验Agent的质量审查，确保生成内容符合要求。

## 关键特征
- 在专家Agent集群中编号为Agent B，承担核心的生成职责
- 接收上游信息检索结果与执行计划作为输入，输出为代码或文本草稿
- 处于多智能体协作链路的中段，前接信息检索，后接逻辑校验
- 生成结果需通过质量校验闭环进行验证，确保内容的正确性与规范性

## 应用
- 在多智能体协作架构中，负责将检索到的知识与执行计划转化为可执行的代码草稿或文本内容
- 作为自动化内容生产流水线的核心生成节点，支撑软件开发自动化场景
- 与信息检索Agent和逻辑校验Agent协同工作，形成"检索—生成—校验"的完整闭环

## 相关概念
- [[concepts/多智能体协作|多智能体协作]]
- [[concepts/软件开发自动化|软件开发自动化]]
- [[concepts/质量校验闭环|质量校验闭环]]

## 相关实体
- [[entities/生成草稿|生成草稿]]

## 来源提及
- "Agent B: 代码/文本生成" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]
- "生成草稿" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]