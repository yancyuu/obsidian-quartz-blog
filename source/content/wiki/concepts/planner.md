---
type: concept
created: 2026-06-21
updated: 2026-06-25
sources:
  - "[[sources/2025-0312-💆copilot和agent的区别_750b52]]"
  - "[[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0]]"
tags:
  - "method"
aliases:
  - "规划器"
  - "任务规划器"
  - "Task Planner"
  - "执行计划"
---

## Description
Planner（规划器）是 Agent 架构中的核心组件，负责对任务进行显式规划和分解。它接收用户的高层目标或复杂需求，将其拆解为有序的、可执行的子步骤，并协调后续的执行与调度。在中控大脑架构中，任务规划器作为核心组件，在意图识别完成后接收信号，基于意图识别结果和历史上下文生成具体的执行计划——决定调用哪些工具和子Agent、以何种顺序执行。执行计划定义了 Agent 系统响应用户指令的具体步骤序列，其生成标志着系统从理解阶段进入行动阶段，是中控大脑决策能力的直接体现。

在 Copilot 与 Agent 的技术结构对比中，Planner 是区分两者的核心技术标志之一——Copilot 通常不配备显式规划器，而 Agent 则依赖 Planner / Router / Task Scheduler 等组件来实现任务管理和自主执行。任务规划器是 Agent 系统自主性和规划能力的直接体现，其设计质量直接决定了整个智能体系统的任务编排效率和执行准确性。

## 关键特征
- **显式规划**：将复杂任务分解为结构化的子任务序列，而非隐式地一次性生成结果
- **自治性支撑**：为 Agent 提供自主决策和自动执行的能力，减少对人工干预的依赖
- **任务调度**：协调子任务的执行顺序、依赖关系及资源分配
- **架构分水岭**：是否存在显式 Planner 是区分 Copilot（辅助型）和 Agent（自治型）的核心判据之一
- **中控核心**：在中控大脑架构中，负责意图识别后的执行计划生成，决定工具与子Agent的调用策略
- **阶段转换标志**：执行计划的生成标志着 Agent 系统从理解阶段进入行动阶段

## 应用
- **自治 Agent 系统**：在 AutoGPT、LangGraph Agent 等自治智能体中负责任务分解与多步推理
- **Agentic RAG 架构**：在智能体驱动的检索增强生成流程中规划检索-推理-生成路径
- **多智能体协作**：在 Multi-Agent 场景中负责任务分配与调度协调
- **自动化工作流**：将用户的高层自然语言指令转化为可自动执行的操作序列

## 相关概念
- [[concepts/agent|Agent]]
- [[concepts/copilot|Copilot]]
- [[concepts/react|ReAct]]
- [[concepts/任务拆解|任务拆解]]
- [[concepts/agent编排框架|Agent编排框架]]
- [[concepts/意图识别与路由|意图识别与路由]]
- [[concepts/长期记忆与vectordb|长期记忆与VectorDB]]

## 相关实体
- [[entities/autogpt|AutoGPT]]
- [[entities/langgraph-agent|LangGraph Agent]]
- [[entities/karpathy的新ide|中控大脑]]

## 来源提及

> **Source: [[sources/2025-0312-💆copilot和agent的区别_750b52|Copilot 和 Agent 的区别]]**
> - "通常没有显式规划器"
> - "通常有 planner / router / task scheduler"

> **Source: [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Agent中控大脑架构图]]**
> - "任务规划器"
> - "2.生成执行计划"
> - "步骤1"
> - "步骤2"