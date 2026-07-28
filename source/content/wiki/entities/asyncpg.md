---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/异步如何实现的_40ec97]]"]
tags: [product]
aliases:
  - "asyncpg"
  - "asyncpg驱动"
  - "异步PostgreSQL驱动"
---


# asyncpg

## 基本信息
- Type: product
- Source: [[sources/异步如何实现的_40ec97|异步如何实现的_40ec97]]

## 描述
asyncpg 是一个高性能的异步 PostgreSQL 数据库驱动库，专为 Python 异步编程生态设计。在异步协程场景中，使用同步阻塞的数据库驱动（如传统的 psycopg2）会阻塞事件循环，导致所有协程卡住，从而丧失异步编程的优势。asyncpg 通过原生支持异步 I/O，能够在不阻塞事件循环的前提下完成数据库连接、查询和事务等操作。它与 aiohttp、asyncio.sleep 等异步库配合使用，是构建高性能异步应用的推荐方案。

## 相关实体
- [[entities/aiohttp|aiohttp]]

## 相关概念
- [[concepts/事件循环|事件循环]]
- [[concepts/协程|协程]]

## 来源提及
- "用异步库（aiohttp、asyncpg、`asyncio.sleep`）" — [[sources/异步如何实现的_40ec97|异步如何实现的]]
- "协程里用**同步阻塞 IO**（`requests`、`time.sleep`、阻塞 DB 驱动）| 阻塞整个事件循环，所有协程卡住 | 用异步库（aiohttp、asyncpg、`asyncio.sleep`）" — [[sources/异步如何实现的_40ec97|异步如何实现的]]