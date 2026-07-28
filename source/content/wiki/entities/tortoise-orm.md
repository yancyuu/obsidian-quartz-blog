---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/应用开发规范_3bea14]]"]
tags: [product]
aliases:
  - "tortoise-orm"
  - "Tortoise"
---


# Tortoise ORM

## 基本信息
- Type: product
- Source: [[sources/应用开发规范_3bea14|应用开发规范]]

## 描述
Tortoise ORM 是一个 Python 异步 ORM（对象关系映射）框架，在 [[sources/应用开发规范_3bea14|应用开发规范]] 中被指定为 models 层的可选方案之一（另一个是 [[entities/SQLAlchemy|SQLAlchemy]]）。它用于定义数据库结构和模型，要求保持与数据库表结构一致、字段注解清晰，并添加通用方法如 `.to_dict()` 以便返回 JSON 格式数据。该框架支持异步操作，适合与 [[entities/python|Python]] 异步生态集成，项目规范中锁定的版本为 `tortoise-orm = "0.20.0"`。

## 相关实体
- [[entities/python|Python]]
- [[entities/SQLAlchemy|SQLAlchemy]]

## 相关概念
- [[concepts/模块职责划分规范|模块职责划分规范]]

## 来源提及
- "使用 `Tortoise ORM` 或 `SQLAlchemy` 定义数据库结构。" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "ORM 模型层（如使用 Tortoise/SQLAlchemy）" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "tortoise-orm = \"0.20.0\"" — [[sources/应用开发规范_3bea14|应用开发规范]]