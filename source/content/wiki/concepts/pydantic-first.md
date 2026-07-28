---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [standard]
aliases:
  - "Pydantic优先"
  - "Pydantic First 标准化状态管理"
---


# Pydantic First

## 定义
Pydantic First 是"可逃逸架构"设计模式中提出的一项后端开发强制规范。该标准要求在代码中严禁传递无结构的 `Dict` 或 `Any` 类型数据，所有状态管理必须使用 Pydantic 模型进行结构化定义。对于 Agent 系统，`response_model` 必须强制指定 Pydantic 对象，禁止依赖 Prompt 让 AI 返回纯文本再通过正则表达式解析，从而确保数据流转的可靠性、类型安全性与可维护性。

## 关键特征
- **禁止无结构数据传递**：严禁在代码中使用 `Dict` 或 `Any` 类型传递数据，一切状态必须由 Pydantic 模型定义
- **强制类型化状态**：LangGraph 的 State 必须有清晰、完整的类型注释与结构定义
- **强制 response_model**：Agent 的 `response_model` 必须指定为具体的 Pydantic 对象，而非接受自由文本
- **禁止正则解析 AI 输出**：明确禁止通过 Prompt 让 AI 返回纯文本然后用正则表达式解析的做法，消除脆弱的解析逻辑
- **提升系统可靠性**：结构化的数据模型使 Agent 系统在数据验证、错误追踪和接口契约方面更加健壮

## 应用
- **Agent 状态管理**：在 LangGraph 编排中，所有节点间传递的状态均使用 Pydantic 模型定义，确保状态字段类型安全且可追溯
- **Agent 响应结构化**：使用 Pydantic AI 等框架时，为每个 Agent 明确指定 `response_model`，直接获得结构化输出，免除后处理解析
- **接口契约定义**：在模块间通信、API 交互中，以 Pydantic 模型作为统一的数据交换格式，降低因数据格式不匹配导致的运行时错误

## 相关概念
- [[concepts/可逃逸架构|可逃逸架构]]

## 相关实体
- [[entities/pydantic-ai|Pydantic AI]]
- [[entities/langgraph|LangGraph]]

## 来源提及
- "严禁在代码中传递无结构的 Dict 或 Any。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "Agent 的 response_model 必须强制指定 Pydantic 对象，严禁依赖 Prompt 让 AI 返回纯文本然后用正则去解析。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]