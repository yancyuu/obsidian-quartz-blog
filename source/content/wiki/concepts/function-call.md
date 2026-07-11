---
type: concept
created: 2026-06-21
updated: 2026-06-24
sources:
  - "[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"
  - "[[sources/2025-0312-💆copilot和agent的区别_750b52]]"
  - "[[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]"
tags:
  - "method"
aliases:
  - "函数调用"
  - "Function Calling"
---

## Description
Function-Call 是大语言模型实现动态工具选择的核心机制，通过让模型生成结构化的函数调用指令（函数名 + 参数），使系统能够动态选择并执行适当的外部工具。在 [[concepts/tool-augmented-rag|Tool-Augmented RAG]] 架构中，Function-Call 与 [[concepts/react|ReAct]] 并列为核心技术，适合需要结合实时数据和多种数据源的复杂任务。它也是 Agent 区别于 Copilot 的关键技术基础：Agent 强依赖 Function Calling、MCP/MRCP 等机制实现自主任务执行与多工具协同编排，而 Copilot 虽然也会使用函数调用，但通常仅作为"函数助手"嵌入而非自主编排。

然而，Function Calling 也面临着根本性的局限。有批评声音指出，Function Calling 实际上是应对大模型上下文窗口缺陷的第一代"补丁"——它被比喻为"给 Agent 一把锤子"，但锤子太重（占用 Token），Agent 举着累，而且经常拿锤子循环砸自己的脚（即产生幻觉调用）。不管是 Function Calling、MCP 还是 [[entities/claude-skills|Claude Skills]]，它们都在用复杂的软件工程手段弥补模型架构本身的缺陷，试图掩盖一个让所有 AI 厂商夜不能寐的事实。尽管如此，Function Calling 赋予了 Agent 强自治性和多工具协同能力，在当前模型架构下依然是现代智能体系统不可或缺的基础技术支撑。

## 关键特征
- **结构化输出**：模型生成的是可解析的结构化调用指令（函数名 + JSON 参数），而非自然语言文本，便于系统直接执行。
- **动态工具选择**：不同于预先编排的固定流程，模型可根据当前查询上下文自主决定调用哪个工具及传入何种参数。
- **实时数据接入**：支持连接搜索引擎、数据库、计算器、API 等外部资源，突破模型知识的时效性限制。
- **多轮编排能力**：可在一次任务中顺序或迭代调用多个工具，前一个工具的输出可作为后续调用的上下文输入。
- **声明式工具注册**：开发者仅需声明可用函数的签名（名称、描述、参数 schema），模型即可在推理时按需匹配调用。
- **Agent 自治性基础**：作为 Agent 自主编排与多工具协同的核心机制，与 MCP/MRCP 等协议配合使用，赋予 Agent 强自治能力。
- **上下文窗口负担**：函数签名和工具描述占用大量 Token，工具数量越多，上下文压力越大，容易导致幻觉调用等退化现象。

## 应用
- **实时信息检索**：用户询问最新新闻、股价或天气时，模型动态调用搜索 API 或数据源获取实时结果。
- **数据库查询**：将自然语言问题转化为 SQL 函数调用，在企业知识库或业务数据库中精确检索。
- **多源复合问答**：对需要结合多种异构数据源（如文档库 + 表格 + 计算）的复杂任务，按序调用不同工具并汇总结果。
- **计算与推理**：对涉及数学计算、单位换算等任务，调用计算器工具以确保结果精确。
- **Agent 工作流编排**：在 Agent 系统中作为"动作执行"层，把模型决策转化为可执行的外部操作，实现自主多工具协同。

## 相关概念
- [[concepts/tool-augmented-rag|Tool-Augmented RAG]]
- [[concepts/react|ReAct]]
- [[concepts/agentic-rag|Agentic RAG]]
- [[concepts/multi-agent-rag|Multi-Agent RAG]]
- [[concepts/上下文工程|上下文工程]]
- [[concepts/意图识别|意图识别]]

## 相关实体
- [[entities/autogpt|AutoGPT]]
- [[entities/claude-skills|Claude Skills]]

## 来源提及

> **Source: [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰-agentic-rag架构选型指南_425bac]]**
> - "│   └── 动态工具选择 (ReAct / Function-Call)"

> **Source: [[sources/2025-0312-💆copilot和agent的区别_750b52|2025-0312-💆copilot和agent的区别_750b52]]**
> - "强依赖 Tool 调用、Function Calling、MCP/MRCP 等机制"
> - "有，但常作为"函数助手"嵌入"

> **Source: [[sources/05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2|05-喂再多-skills-也没用agent-的上下文绝症今天依然没治好_e5b5c2]]**
> - "不管是 Function Calling、MCP 还是现在的 Skills，它们都在试图掩盖一个让所有 AI 厂商夜不能寐的事实"
> - "**Function Calling** | "给 Agent 一把锤子" | 锤子太重，Agent 举着累（占 Token），还经常拿锤子循环砸自己的脚（幻觉调用）。"