---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [method]
aliases:
  - "记忆上下文模块"
  - "memory-context模块"
---


# memory-context

## 定义

memory-context 是 [[entities/agent_app|agent_app]] 架构中 modules 目录下的通用功能模块，负责管理 Agent 的记忆和上下文持久化。该模块包含 `vector_store.py`（[[concepts/向量库连接|向量库连接]]）和 `history_manager.py`（Redis 历史记录管理），为 Agent 提供长期记忆和上下文检索能力，是实现 Agent 长时记忆和历史上下文检索功能的关键基础设施模块。

## 关键特征

- **模块化设计**：作为 agent_app 架构中 modules 目录下的独立通用模块，与核心业务逻辑解耦
- **双组件架构**：由 `vector_store.py` 和 `history_manager.py` 两个核心文件构成，分别负责向量检索和 Redis 历史记录管理
- **长时记忆支持**：通过向量库实现语义级别的长期记忆存储与检索
- **上下文持久化**：基于 Redis 实现会话历史的高效存取，支撑连续多轮对话场景
- **通用基础设施**：作为底层能力模块，可被多个 Agent 复用，遵循 agent_app 的模块化架构规范

## 应用

- **多轮对话场景**：通过 Redis 历史记录管理维持用户与 Agent 之间的对话连续性
- **知识检索增强**：利用向量库连接实现语义检索，为 Agent 提供外部知识库访问能力
- **个性化记忆**：长期存储用户偏好和历史交互信息，实现个性化 Agent 服务
- **上下文回溯**：在复杂任务编排中，提供历史上下文的快速检索与恢复能力

## 相关概念

- [[concepts/向量库连接|向量库连接]]
- [[concepts/核心逻辑|核心逻辑]]
- [[concepts/无状态上下文|无状态上下文]]
- [[concepts/上下文污染|上下文污染]]

## 相关实体

- [[entities/agent_app|agent_app]]
- [[entities/redis|redis]]

## 来源提及

- "memory-context/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "vector_store.py 向量库连接" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "history_manager.py Redis历史" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]