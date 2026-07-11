---
type: concept
created: 2026-06-25
updated: 2026-06-25
sources: ["[[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0]]"]
tags: [method]
aliases:
  - "Expert Agent Cluster"
  - "专家Agent集群"
---


# 专家Agent集群

## 定义
专家Agent集群是Agent中控大脑架构中工具层的关键组成部分，由多个具有专业化能力的Agent组成，包括信息检索Agent、代码/文本生成Agent和逻辑校验Agent。每个专家Agent负责特定领域的任务，通过协作的方式完成复杂的端到端工作流。这种设计模式体现了多智能体协作的理念，将复杂任务拆解为子任务，由不同专业Agent分别处理后整合结果。

## 关键特征
- **专业化分工**：集群内的每个Agent专注于单一能力域，如信息检索、内容生成或逻辑校验，确保各环节的高质量输出
- **协作式工作流**：多个专家Agent按照中控大脑的调度，以流水线或并行方式协同完成端到端任务
- **任务拆解与整合**：将复杂任务自动拆解为可执行的子任务，由对应专业Agent分别处理，最终整合为完整结果
- **可扩展性**：集群结构支持灵活新增专业Agent，以适应不同业务场景的能力需求
- **与中控大脑解耦**：专家Agent集群作为工具层存在，接受Agent中控大脑的统一调度与编排

## 应用
- **自动化内容创作**：信息检索Agent负责素材搜集，代码/文本生成Agent负责草稿撰写，逻辑校验Agent负责质量审核
- **企业级数据处理流水线**：在客服、舆情分析等场景中，由不同专业Agent协作完成数据采集、分析与报告生成
- **复杂问题求解**：将多步骤、跨领域的综合性问题分解后分配给对应Agent，实现高效的问题解决闭环

## 相关概念
- [[concepts/多智能体协作|多智能体协作]]
- [[concepts/Critic校验机制|Critic校验机制]]
- [[concepts/任务拆解|任务拆解]]

## 相关实体
- [[entities/subagent|subagent]]

## 来源提及
- "专家Agent集群" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]
- "Agent A: 信息检索" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]
- "Agent B: 代码/文本生成" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]