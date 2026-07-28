---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [method]
aliases:
  - "MCP Client-Server 物理隔离"
  - "Client-Server 物理隔离"
---


# Client-Server物理隔离

## 定义
Client-Server物理隔离是[[concepts/可逃逸架构|可逃逸架构]]中 MCP 服务架构的核心要求，要求 Agent 与工具之间实现物理隔离。Server 端（供给方）运行在独立进程/容器中，运行业务逻辑并暴露 JSON Schema；Client 端（Agent）仅配置连接方式（Stdio/SSE），不包含任何工具实现的 Python 代码。

## 关键特征
- **进程级隔离**：Server 端运行于独立进程或容器中，与 Agent 运行环境物理分离。
- **接口契约化**：Server 端通过暴露 JSON Schema 作为唯一的接口契约，Client 端据此发现和调用工具。
- **Client 零实现**：Client 端（Agent）仅配置连接方式（Stdio/SSE），不包含任何工具实现的具体代码。
- **业务意图封装**：工具（如 `check_inventory`）代表业务意图，必须封装为 MCP 暴露给 AI；而纯实现细节的函数（如 `string_split`）禁止直接暴露给 AI。

## 应用
- **企业级 Agent 架构**：在复杂的企业应用中，通过物理隔离确保业务逻辑的安全性，防止 Agent 上下文污染。
- **微服务化工具治理**：将工具能力微服务化，独立部署与维护，实现[[concepts/单一职责|单一职责]]的工具治理。
- **安全合规场景**：在需要对 AI 访问权限进行严格控制的环境中，通过物理隔离限制 Agent 对底层业务代码的直接访问。

## 相关概念
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/单一职责|单一职责]]

## 相关实体
- [[entities/MCP|MCP]]

## 来源提及
- "我们要求 Agent 与工具实现**物理隔离**。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "Server 端（供给方）：独立进程/容器，运行业务逻辑，暴露 JSON Schema。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "Client 端（Agent）：仅配置连接方式（Stdio/SSE），不包含任何工具实现的 Python 代码。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]