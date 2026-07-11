---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0305🐰-agentic-rag架构选型指南_425bac]]"]
tags: [method]
aliases:
  - "多智能体RAG"
  - "Multi-Agent RAG"
---


# Multi-Agent RAG

## 定义
Multi-Agent RAG 是一种通过多个专业化智能体协作完成检索增强生成（RAG）任务的架构方法。该架构通过将复杂任务拆解为子任务，分配给不同角色的智能体（如路由、检索、写作），并通过协作决策流程实现规划、执行与验证的闭环，从而提升系统在复杂场景下的表现力与准确性。

## 关键特征
- **专业化分工**：采用 Router → Searcher → Writer 等角色分工，每个智能体负责特定职能，提高单点处理质量
- **协作决策机制**：通过 Planning → Execution → Verification 三阶段实现任务的动态规划、执行与结果验证
- **适用于高复杂度任务**：针对多步骤、多角色的复杂场景（如市场研究、投资分析、学术报告）具有显著优势
- **系统开销较高**：多智能体间的通信与协调带来较高的维护成本和资源消耗
- **存在响应延迟问题**：串行或并行的多智能体调用流程会增加系统的整体响应延迟
- **需要协调协议**：需依赖明确的协调协议管理多智能体之间的交互与数据流转

## 应用
- **市场研究**：多智能体分别负责数据收集、趋势分析、报告撰写，协同输出完整研究报告
- **投资分析**：不同智能体处理财务数据检索、风险评估、投资建议生成等环节
- **学术报告**：分工完成文献检索、资料整理、内容组织与最终撰写
- **其他多步骤复杂任务**：适用于需要多角色协作、多轮推理验证的高复杂度场景

## 相关概念
- [[concepts/Agentic-RAG|Agentic RAG]]
- [[concepts/Self-Reflective-RAG|Self-Reflective RAG]]
- [[concepts/Tool-Augmented-RAG|Tool-Augmented RAG]]

## 相关实体
*暂无相关实体*

## 来源提及
- "Multi-Agent RAG
│   ├── 专业化分工 (Router → Searcher → Writer)
│   └── 协作决策 (Planning → Execution → Verification)" — [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]
- "多 Agent 协作|单 Agent 自反思迭代|把检索/计算/API 封装为工具，由 LLM 动态调用" — [[sources/2025-0305🐰-agentic-rag架构选型指南_425bac|2025-0305🐰 Agentic-RAG架构选型指南]]