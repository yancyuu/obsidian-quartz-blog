---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f]]"]
tags: [product]
aliases:
  - "FastMCP轻量框架"
  - "FastMCP框架"
---


# FastMCP

## 基本信息
- Type: product
- Source: [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415-🍖构建可演化的智能体系统架构_00194f]]

## 描述
FastMCP 是一个轻量级的 [[concepts/mcp|MCP]] 框架，用于将工具调用和任务调度抽象为标准化的工具服务。在智能体系统工程实践中，FastMCP 配合 [[entities/pydantic-ai|Pydantic-AI]] 进行输入验证、权限标注和调用链追踪，使所有工具具备标准的 Schema 输入输出。以订餐 Agent 的「推荐商品」功能为例，FastMCP 可封装异步工具函数，注册到统一的工具注册表中，并通过异步 Task Bus 进行调度。该框架使得工具服务可被 MCP Client 统一发现和调用，为可演化的智能体系统架构提供了坚实的工程基础。

## 相关实体
- [[entities/pydantic-ai|Pydantic-AI]]
- [[entities/dify|Dify]]

## 相关概念
- [[concepts/mcp|MCP]]
- [[concepts/function-call|Function Call]]

## 来源提及
- "工程实现：FastMCP轻量框架 + 注册表 + 异步Task Bus" — [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]
- "我们使用FastMCP + pydantic进行输入验证、权限标注、调用链追踪" — [[sources/2025-0415-🍖构建可演化的智能体系统架构_00194f|2025-0415 🍖构建可演化的智能体系统架构]]