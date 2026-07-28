---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [product]
aliases:
  - "FastAPI框架"
  - "Fast API"
---


# FastAPI

## 基本信息
- Type: product
- Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]

## 描述
FastAPI 是一个现代的、高性能的 Python Web 框架，基于标准 Python 类型提示构建，广泛用于构建 APIs。在本架构体系中，FastAPI 作为 Agent 应用的 API 入口层出现，与 [[entities/Sanic|Sanic]] 并列作为应用启动与请求接收的两个可选方案。它在架构图中的位置位于 `api/FastAPI/Sanic入口` 节点下，属于 [[concepts/应用入口与配置|应用入口与配置]] 层的一部分，承担接收外部请求并将其路由到对应 Agent 的职责。

## 相关实体
- [[entities/Sanic|Sanic]]

## 相关概念
- [[concepts/应用入口与配置|应用入口与配置]]

## 来源提及
- "api/FastAPI/Sanic入口" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]
- "应用入口与配置" — [[sources/agent-app代码结构_c030b6|agent-app代码结构]]