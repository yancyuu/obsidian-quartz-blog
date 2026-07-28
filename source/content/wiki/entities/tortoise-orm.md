---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/应用开发规范_3bea14]]"
  - "[[sources/cursor提示词_bf3f6f]]"
tags:
  - "product"
aliases:
  - "tortoise-orm"
  - "Tortoise"
---

## 描述
Tortoise ORM 是一个专为 Python 异步应用设计的 ORM（对象关系映射）框架，在 [[sources/应用开发规范_3bea14|应用开发规范]] 中被指定为 models 层的可选方案之一（另一个是 [[entities/SQLAlchemy|SQLAlchemy]]）。它用于定义数据库结构和模型，要求保持与数据库表结构一致、字段注解清晰，并添加通用方法如 `.to_dict()` 以便返回 JSON 格式数据。该框架支持异步操作，适合与 [[entities/python|Python]] 异步生态集成，项目规范中锁定的版本为 `tortoise-orm = "0.20.0"`。在 [[sources/cursor提示词_bf3f6f|cursor提示词]] 中，Tortoise ORM 被进一步指定为 [[entities/Sanic|Sanic]] Web 应用的数据层集成方案，需在应用启动时通过 `await Tortoise.init(config=TORTOISE_ORM)` 完成初始化，同时可利用其关系映射功能处理复杂数据关系，并通过事务支持确保数据一致性。

## 相关实体
- [[entities/python|Python]]
- [[entities/SQLAlchemy|SQLAlchemy]]
- [[entities/Sanic|Sanic]]
- [[entities/Pydantic|Pydantic]]

## 相关概念
- [[concepts/模块职责划分规范|模块职责划分规范]]
- [[concepts/异步I-O|异步I/O]]
- [[concepts/数据序列化|数据序列化]]

## 来源提及

> **Source: [[sources/应用开发规范_3bea14|应用开发规范]]**
> - "使用 `Tortoise ORM` 或 `SQLAlchemy` 定义数据库结构。"
> - "ORM 模型层（如使用 Tortoise/SQLAlchemy）"
> - "tortoise-orm = \"0.20.0\""

> **Source: [[sources/cursor提示词_bf3f6f|cursor提示词]]**
> - "使用 Tortoise ORM 的异步模型定义和查询功能。"
> - "在应用启动时初始化 Tortoise：`await Tortoise.init(config=TORTOISE_ORM)`。"
> - "利用 Tortoise 的关系映射功能处理复杂的数据关系。"