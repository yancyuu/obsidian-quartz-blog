---
type: source
created: 2026-06-25
updated: 2026-06-25
source_file: "[[👩‍💻 个人笔记/公众号/Drawing 2025-12-16 16.29.09.excalidraw.md]]"
tags: [excalidraw]
aliases: ["Agent中控大脑架构图", "Agent中枢与工具层协作流程图"]
---

# Excalidraw 架构图：Agent 中控大脑与工具层协作流程 - Summary

## 来源
- 原始文件: [[👩‍💻 个人笔记/公众号/Drawing 2025-12-16 16.29.09.excalidraw.md]]
- 录入日期: 2026-06-25

## 核心内容
该 Excalidraw 绘图文件展示了一个三层 Agent 系统架构图，由 [[concepts/用户层|用户层]]、中控大脑层和 [[concepts/工具层|工具层]] 构成。用户通过 [[entities/用户指令|用户指令]] 触发系统，中控大脑（命名为 [[entities/karpathy的新ide|Karpathy的新IDE]]）依次执行 [[concepts/意图识别与路由|意图识别与路由]]、[[concepts/历史上下文检索|历史上下文检索]]（基于 [[concepts/长期记忆与vectordb|长期记忆与VectorDB]]）和 [[concepts/执行计划|执行计划]] 生成（由 [[concepts/任务规划器|任务规划器]] 驱动）。随后，[[concepts/专家agent集群|专家Agent集群]] 协同工作：[[concepts/信息检索agent|Agent A]] 负责检索，[[concepts/代码文本生成agent|Agent B]] 负责生成 [[entities/生成草稿|草稿]]，[[concepts/逻辑校验agent|Agent C]] 执行 [[concepts/质量校验闭环|质量校验闭环]]——不达标则回退，达标则输出。工具层（[[concepts/外星神器的触手|外星神器的触手]]）集成 [[entities/web-search|Web Search]]、[[entities/python解释器|Python解释器]] 和 [[entities/企业erp系统|企业ERP系统]] 等能力，通过 [[concepts/调用与返回数据流|调用与返回数据流]] 支撑整个工作流。

## 关键实体
- [[entities/karpathy的新ide|Karpathy的新IDE]] — 系统中控大脑核心，负责调度与编排
- [[entities/web-search|Web Search]] — 网络搜索工具，提供实时信息获取能力
- [[entities/python解释器|Python解释器]] — 代码执行环境，支撑代码生成与验证
- [[entities/企业erp系统|企业ERP系统]] — 企业业务数据接口，连接核心业务系统
- [[entities/用户指令|用户指令]] — 工作流起点，触发意图识别与任务规划
- [[entities/生成草稿|生成草稿]] — 专家Agent集群协作产出的中间结果

## 关键概念
- [[concepts/用户层|用户层]] / [[concepts/工具层|工具层]] / [[concepts/外星神器的触手|外星神器的触手]] — 三层架构的层级定义与工具层隐喻
- [[concepts/意图识别与路由|意图识别与路由]] — 用户指令进入系统的首要处理环节
- [[concepts/任务规划器|任务规划器]] / [[concepts/执行计划|执行计划]] — 负责将需求拆解为可执行步骤
- [[concepts/专家agent集群|专家Agent集群]] — 多专业化Agent协作的核心设计模式
- [[concepts/信息检索agent|信息检索Agent]] / [[concepts/代码文本生成agent|代码文本生成Agent]] / [[concepts/逻辑校验agent|逻辑校验Agent]] — 三个分工明确的子Agent
- [[concepts/质量校验闭环|质量校验闭环]] — 草稿达标检查与回退机制，保障输出可靠性
- [[concepts/长期记忆与vectordb|长期记忆与VectorDB]] — 提供历史上下文检索的基础设施
- [[concepts/调用与返回数据流|调用与返回数据流]] — 中控大脑与工具层的双向通信模式

## 要点
- **三层架构设计**：系统由用户层、中控大脑层、工具层构成，层次分明、职责清晰
- **中枢编排能力**：[[entities/karpathy的新ide|Karpathy的新IDE]] 统一管理意图识别、上下文检索、任务规划和工具调度
- **多智能体协作**：专家Agent集群按职能分工（检索、生成、校验），形成端到端流水线
- **质量保证闭环**：引入 Critic 校验机制，草稿不达标自动回退，达标后才输出，确保响应质量
- **工具增强范式**：工具层被喻为"外星神器的触手"，体现Agent系统通过工具延伸能力的核心理念
- **记忆驱动决策**：通过VectorDB实现长期记忆，使系统具备历史上下文感知和持续学习能力