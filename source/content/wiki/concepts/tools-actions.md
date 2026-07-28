---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [method]
aliases:
  - "工具动作模块"
  - "tools-actions模块"
---


# tools-actions

## 定义

tools-actions 是 agent_app 架构中 `modules/` 目录下的通用功能模块之一，负责集中管理工具的定义和协议封装。该模块包含 `mcp_server.py`（MCP 协议封装）和 `base_tool.py`（Pydantic 基类），充当 Agent 与外部工具交互的桥梁。通过将工具定义集中在此模块中，实现了可逃逸设计的核心理念——Agent 只引用 Schema 而不直接耦合工具实现。

## 关键特征

- **集中式工具管理**：所有工具的定义和协议封装统一收口于 `tools-actions/` 目录，避免工具定义散落在各业务模块中
- **协议解耦**：通过 `mcp_server.py` 封装 MCP 协议细节，上层 Agent 无需感知底层通信协议
- **Pydantic 基类标准化**：`base_tool.py` 基于 Pydantic 定义工具基类，提供统一的参数校验和类型约束
- **Schema 引用而非实现耦合**：Agent 层只引用工具的 Schema 定义，不直接依赖工具的具体实现，符合可逃逸架构（Design for Replacement）的模块解耦原则
- **可扩展性**：新增工具只需在此模块中定义并注册，无需修改 Agent 核心逻辑

## 应用

- Agent 应用开发中，作为工具层的标准化入口，管理所有外部工具（如搜索、数据库查询、API 调用等）的定义
- 在 MCP（Model Context Protocol）协议场景下，通过 `mcp_server.py` 将本地工具暴露为标准化的 MCP 服务端
- 企业级 Agent 系统中，配合技能注册表实现工具的动态发现和按需调用

## 相关概念

- [[concepts/协议封装|协议封装]]
- [[concepts/工具绑定|工具绑定]]
- [[concepts/pydantic-first|pydantic-first]]

## 相关实体

- [[entities/pydantic|pydantic]]
- [[entities/agent_app|agent_app]]

## 来源提及

- "tools-actions/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "mcp_server.py 协议封装" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "base_tool.py Pydantic基类" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]