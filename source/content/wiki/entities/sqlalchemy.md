---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/应用开发规范_3bea14]]"]
tags: [product]
aliases:
  - "SQLAlchemy"
  - "SQL Alchemy"
---


# SQLAlchemy

## 基本信息
- Type: product
- Source: [[sources/应用开发规范_3bea14|应用开发规范]]

## 描述
SQLAlchemy 是 Python 生态中广泛使用的 ORM（对象关系映射）框架，提供了一套完整的企业级持久层模式。在[[sources/应用开发规范_3bea14|应用开发规范]]中，SQLAlchemy 被列为 models 层数据模型定义的备选方案之一，与 [[entities/tortoise-orm|Tortoise ORM]] 并列。它用于定义数据库表结构映射，确保 ORM 模型与实际数据库表结构保持一致。开发者可依据项目技术栈需求，在 SQLAlchemy 与 Tortoise ORM 之间灵活选择，以满足[[concepts/模块职责划分规范|模块职责划分规范]]中对数据模型层的职责要求。

## 相关实体
- [[entities/python|Python]]
- [[entities/tortoise-orm|Tortoise ORM]]

## 相关概念
- [[concepts/模块职责划分规范|模块职责划分规范]]

## 来源提及
- "使用 `Tortoise ORM` 或 `SQLAlchemy` 定义数据库结构。" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "ORM 模型层（如使用 Tortoise/SQLAlchemy）" — [[sources/应用开发规范_3bea14|应用开发规范]]