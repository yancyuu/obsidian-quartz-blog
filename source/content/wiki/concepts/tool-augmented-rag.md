---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"]
tags: [method]
aliases:
  - "工具增强RAG"
  - "Tool-Augmented Retrieval-Augmented Generation"
---


# Tool-Augmented RAG

## 定义
Tool-Augmented RAG 是一种将检索、计算和 API 调用封装为工具（Tool），由大语言模型（LLM）动态调用的 RAG 架构方法。其核心机制是将检索即工具（Search & Lookup Tool）、领域工具链（SQL、API、计算器）和动态工具选择（ReAct / Function-Call）统一为工具调用范式，使 LLM 能够根据任务需求自主决定何时检索、调用何种工具以及如何组合多步操作。

## 关键特征
- **检索即工具**：将文档检索、知识查找等操作封装为标准化工具（Search & Lookup Tool），与计算、API 调用等外部能力处于同一抽象层级
- **领域工具链集成**：支持 SQL 查询、API 调用、计算器等多种领域工具，覆盖结构化数据访问、实时数据获取和数值计算等场景
- **动态工具选择**：LLM 基于 ReAct 推理范式或 Function-Calling 机制，根据当前任务上下文自主选择和编排工具调用序列
- **统一工具调用范式**：所有外部能力（检索、计算、数据访问）统一为一致的函数调用接口，降低系统复杂度
- **适中的系统开销**：相比全自主 Agent 架构，该方法的维护成本和运行开销适中，性价比高
- **主要挑战在于工具版本治理**：随着工具数量增长和工具定义的迭代，工具版本管理和兼容性维护成为核心工程挑战

## 应用
- **财报对比分析**：需要同时检索多份财务文档并执行数值计算（如同比增长率、利润率聚合），工具增强 RAG 可动态调用检索工具获取文档、调用计算器完成指标运算
- **指标聚合任务**：跨多个数据源（SQL 数据库 + API + 文档库）的混合数据查询与聚合计算
- **实时数据混合场景**：在需要实时市场数据、最新政策法规等动态信息的复杂问答中，通过 API 工具实时获取最新数据并与静态知识库检索结果融合
- **多源异构数据查询**：同时访问关系型数据库（SQL 工具）、第三方服务（API 工具）和文档知识库（检索工具）的复合任务

## 相关概念
- [[concepts/Agentic-RAG|Agentic RAG]]
- [[concepts/Multi-Agent-RAG|Multi-Agent RAG]]
- [[concepts/Self-Reflective-RAG|Self-Reflective RAG]]

## 相关实体
*暂无相关实体*

## 来源提及
- "Tool-Augmented RAG 
    ├── 检索即工具 (Search & Lookup Tool)
    ├── 领域工具链 (SQL、API、计算器)
    └── 动态工具选择 (ReAct / Function-Call)" — [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰-agentic-rag架构选型指南_425bac]]
- "把检索/计算/API 封装为工具，由 LLM 动态调用" — [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰-agentic-rag架构选型指南_425bac]]