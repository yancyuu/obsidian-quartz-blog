---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [product]
aliases:
  - "Pydantic基类"
  - "工具基类"
---


# base_tool.py

## 基本信息
- Type: product
- Source: [[sources/agent-app代码结构_c030b6]]

## 描述
`base_tool.py` 是 agent-app 项目 `tools-actions/` 目录下的核心基础文件，标注为 **Pydantic 基类**。该文件使用 Pydantic 框架定义了所有工具的统一基类，为整个工具层的输入输出提供标准化的数据校验与序列化机制。它是 [[concepts/pydantic-first|Pydantic优先]] 原则在工具层面的直接实现，确保每个工具的 Schema 定义与具体执行逻辑分离。作为 [[concepts/路由架构与按需加载|路由架构与按需加载]] 中工具 Schema 契约的根类，该文件支撑了"Tools 定义在 modules 中，Agent 只引用 Schema"的 [[concepts/protocol-layer|协议层]] 设计理念，使 Agent 能够在运行时按需加载工具，而无需在编译期硬编码依赖。

## 相关实体
- [[entities/Pydantic|Pydantic]]

## 相关概念
- [[concepts/json-schema|json-schema]]
- [[concepts/pydantic-first|pydantic-first]]
- [[concepts/protocol-layer|protocol-layer]]

## 来源提及
- "tools-actions/ ^NG0EIIrp" — [[sources/agent-app代码结构_c030b6]]
- "base_tool.py" — [[sources/agent-app代码结构_c030b6]]
- "Pydantic基类 ^CLnebWU5" — [[sources/agent-app代码结构_c030b6]]