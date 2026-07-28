---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [product]
aliases:
  - "schemas目录"
  - "Schema定义目录"
  - "通用Schema定义目录"
---


# schemas/

## 基本信息
- Type: product
- Source: [[sources/agent-app代码结构_c030b6]]

## 描述
schemas/ 是 modules 通用功能模块下的子目录，用于存放通用的数据结构定义。它与 [[entities/base-tool-py|base_tool.py]] 中的 Pydantic 基类配合使用，为整个 Agent 系统提供统一的数据验证和序列化规范。在可逃逸架构设计中，schemas/ 扮演关键角色——Agent 只引用 Schema 定义，而具体工具实现独立在 [[entities/modules|modules]] 中维护，从而实现了定义与实现的解耦。这种设计使得系统可以在不修改 Agent 核心逻辑的前提下，灵活替换底层工具实现。

## 相关实体
- [[entities/base-tool-py|base_tool.py]]
- [[entities/modules|modules]]

## 相关概念
- [[concepts/通用Schema定义|通用Schema定义]]
- [[concepts/可逃逸设计|可逃逸设计]]
- [[concepts/数据结构解析模块独立|数据结构解析模块独立]]
- [[concepts/json-schema|json-schema]]
- [[concepts/pydantic-first|pydantic-first]]

## 来源提及
- "schemas/" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "通用Schema定义 ^WbnJss5M" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "可逃逸设计: Tools定义在 modules 中Agent 只引用 Schema ^ZMzcAbgT" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]