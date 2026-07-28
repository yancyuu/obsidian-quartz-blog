---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/渐进式披露架构_780a26]]"]
tags: [standard]
aliases:
  - "JSON 模式"
  - "JSON 规范"
---


# JSON Schema

## 定义
JSON Schema 是一种用于描述和验证 JSON 数据结构的声明式语言。在智能体架构中，它被用作 Agent Runtime 与底层 MCP Server 之间的接口契约标准，用于定义按需调用工具时的通信规范。它确保了 Agent 在动态建立连接后，能够以结构化、类型安全的方式与后端服务进行交互，是实现可逃逸架构中工具动态加载和协议层标准化的基础。

## 关键特征
- **结构化验证**：通过声明式语法定义 JSON 数据的字段类型、格式、必选项和约束规则，确保通信双方对数据结构的理解一致。
- **接口契约**：在 Agent 与工具服务之间充当严格的接口契约，双方基于 Schema 约定输入输出规范，降低耦合度。
- **自描述性**：Schema 本身即文档，工具调用者无需额外文档即可理解接口的参数要求和返回结构。
- **标准化**：作为业界通用标准，广泛集成于各类编程语言、框架和协议（如 MCP / OpenAPI）中，具备强互通性。

## 应用
- **MCP Server 工具调用**：Agent Runtime 在动态加载和调用 MCP Server 提供的工具时，使用 JSON Schema 定义工具的入参和返回值结构，确保通信规范性。
- **协议层标准化**：在渐进式披露架构中，作为 MCP / OpenAPI 标准的核心组成部分，为工具的按需注册与调用提供统一的描述层。
- **动态连接建立**：Agent 在运行时发现并连接后端服务时，通过 JSON Schema 自动解析工具能力，无需硬编码即可完成对接。

## 相关概念
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/路由架构与按需加载|路由架构与按需加载]]
- [[concepts/协议优于框架|协议优于框架]]
- [[concepts/client-server物理隔离|client-server物理隔离]]

## 相关实体
- [[entities/agent-runtime|Agent Runtime]]

## 来源提及
- "5. JSON Schema ^Ok8bwwah" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]
- "🔌 MCP / OpenAPI Standard ^yMVEnpqO" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]