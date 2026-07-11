---
type: entity
created: 2026-06-22
updated: 2026-06-22
sources: ["[[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]"]
tags: [product]
aliases:
  - "Redis"
  - "Redis数据库"
  - "Remote Dictionary Server"
---


# Redis

## 基本信息
- Type: product
- Source: [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]

## 描述
Redis（Remote Dictionary Server）是一种高性能的内存键值数据库，广泛应用于缓存、消息队列和实时数据存储等场景。在本案例中，团队利用 Redis 来存储[[concepts/有限状态机|有限状态机]]（FSM）的配置数据，从而实现了状态流转规则的热更新能力——无需重启服务即可动态调整 Agent 的行为约束。这一方案为高并发[[entities/客服agent|客服Agent]]场景提供了极大的灵活性和可维护性，成为企业级 Agent 架构重构中的关键基础设施组件。

## 相关实体
- [[entities/客服agent|客服Agent]]

## 相关概念
- [[concepts/有限状态机|有限状态机]]
- [[concepts/状态持久化|状态持久化]]

## 来源提及
- "**热更新**|**支持**（配置存储于 Redis，动态生效）|不支持（通常需重启服务）" — [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]