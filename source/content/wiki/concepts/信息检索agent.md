---
type: concept
created: 2026-06-25
updated: 2026-06-25
sources: ["[[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0]]"]
tags: [method]
aliases:
  - "Agent A"
  - "Information Retrieval Agent"
  - "信息检索智能体"
---


# 信息检索Agent

## 定义
信息检索Agent是专家Agent集群中的Agent A，专门负责信息检索任务。在多智能体协作架构中，它接收来自中控大脑的调用指令，利用Web搜索等工具完成信息收集和检索工作，并将返回数据传递给下一个处理环节。这种专业化分工使得信息检索能力可以被独立优化和调度。

## 关键特征
- **专业分工**：作为专家Agent集群中的独立节点，专注于信息检索这一单一职责
- **中控调度**：由中控大脑统一调用，遵循中心化调度与分布式执行相结合的协作模式
- **工具驱动**：依托[[entities/web-search|Web搜索]]等外部工具完成数据采集
- **流水线协作**：检索完成后将返回数据传递给下游处理环节，形成Agent间的数据流水线
- **独立可优化**：因职责单一，其检索策略、工具选择和数据过滤能力可被独立迭代和优化

## 应用
- 在多智能体系统中作为信息收集的前置节点，为后续分析与决策提供原始数据
- 响应中控大脑的任务分派，执行实时搜索并汇总结果
- 与其他专家Agent（如分析Agent、生成草稿Agent）协作完成端到端的复杂任务链路

## 相关概念
- [[concepts/多智能体协作|多智能体协作]]
- [[concepts/工具层|工具层]]
- [[concepts/意图识别与路由|意图识别与路由]]

## 相关实体
- [[entities/karpathy的新ide|中控大脑]]
- [[entities/web-search|Web搜索]]

## 来源提及
- "Agent A: 信息检索" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]
- "调用" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]
- "返回数据" — [[sources/drawing-2025-12-16-16-29-09-excalidraw_826da0|Drawing 2025-12-16 16.29.09.excalidraw]]