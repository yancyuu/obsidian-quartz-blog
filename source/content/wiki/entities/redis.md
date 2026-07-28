---
type: entity
created: 2026-06-22
updated: 2026-07-28
sources:
  - "[[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]"
  - "[[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674]]"
  - "[[sources/agent-app代码结构_c030b6]]"
  - "[[sources/cursor提示词_bf3f6f]]"
tags:
  - "product"
aliases:
  - "Redis"
  - "Redis数据库"
  - "Remote Dictionary Server"
  - "Redis Vector"
---

## 描述
Redis（Remote Dictionary Server）是一种高性能的内存键值数据库，广泛应用于缓存、消息队列和实时数据存储等场景。在本案例中，团队利用 Redis 来存储[[concepts/有限状态机|有限状态机]]（FSM）的配置数据，从而实现了状态流转规则的热更新能力——无需重启服务即可动态调整 Agent 的行为约束。这一方案为高并发[[entities/客服agent|客服Agent]]场景提供了极大的灵活性和可维护性，成为企业级 Agent 架构重构中的关键基础设施组件。此外，Redis Vector 作为 Redis 提供的向量检索能力，可与 GPTCache 等工具配合，将历史问题及答案以向量形式存储，实现[[concepts/语义缓存|语义缓存]]中相似问题的快速匹配和直接返回，进一步拓展了 Redis 在大模型推理优化场景中的应用。在 Agent 应用代码结构中，Redis 还被用作历史会话管理的数据存储后端，封装在 memory-context 模块的 history_manager.py 中，与向量库连接（vector_store.py）并列，共同构成 Agent 的记忆与上下文管理系统，负责存储和管理对话历史记录，支撑 Agent 的长时记忆能力。在 Web 应用开发层面，Redis 也被推荐为 Sanic 异步框架的缓存基础设施，用于为静态和频繁访问的数据实现缓存策略，最小化阻塞 I/O 操作并提升 API 响应速度。

## 相关实体
- [[entities/客服agent|客服Agent]]
- [[entities/gptcache|GPTCache]]
- [[entities/sanic|Sanic]]

## 相关概念
- [[concepts/有限状态机|有限状态机]]
- [[concepts/状态持久化|状态持久化]]
- [[concepts/语义缓存|语义缓存]]
- [[concepts/无状态上下文|无状态上下文]]
- [[concepts/缓存策略|缓存策略]]

## 来源提及

> **Source: [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]**
> - "**热更新**|**支持**（配置存储于 Redis，动态生效）|不支持（通常需重启服务）"

> **Source: [[sources/大模型推理缓存-kv-cache与prompt-caching_ab1674|大模型推理缓存-KV-Cache与Prompt-Caching]]**
> - "工具：Redis Vector、GPTCache。"

> **Source: [[sources/agent-app代码结构_c030b6|agent-app代码结构]]**
> - "history_manager.py<br>Redis历史"
> - "memory-context/"

> **Source: [[sources/cursor提示词_bf3f6f|cursor提示词]]**
> - "使用 Redis 或内存存储等工具为静态和频繁访问的数据实现缓存。"
> - "通过异步函数处理 I/O 绑定任务、缓存策略和延迟加载来优化性能。"