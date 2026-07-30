---
type: source
created: 2026-07-28
updated: 2026-07-28
source_file: "[[../../架构/应用开发规范/cursor提示词]]"
tags:
  - ai-agent
  - architecture
  - python
  - coding-standard
  - engineering-practice
  - prompt-engineering
aliases:
  - AI Agent 工程实践规范
  - Cursor 提示词规范
---

# AI Agent 专用 Prompt 与工程实践规范（Cursor Directory） - Summary

## 来源
- Original file: [[../../架构/应用开发规范/cursor提示词]]
- Ingested: 2026-07-28

## 核心内容
本文档是一份面向 AI Agent 的 Python Web 开发专家指南，参考 [[entities/cursor-directory|Cursor Directory]] 的配置理念，为两类智能体（代码编写与代码阅读）定义了详细的系统级 [[concepts/专用prompt|专用prompt]] 规范。文档要求所有 Agent 配置 [[concepts/web-research|Web Research]] 工具（MCP 服务），在遇到报错时优先使用外部搜索查询相关框架或错误内容，确定问题后再编写代码。

文档核心编程哲学为 [[concepts/函数式编程|函数式编程]] 与声明式风格，倡导使用纯函数、严格遵循 [[concepts/类型提示|类型提示]]，并采用 [[concepts/roro模式|RORO模式]] 进行参数传递。在错误处理方面，强调使用 [[concepts/守卫子句|守卫子句]] 提前返回。整体技术栈采用 [[entities/sanic|Sanic]] 异步框架，集成 [[entities/tortoise-orm|Tortoise ORM]] 处理数据层，利用 [[entities/pydantic|Pydantic]] 进行数据验证，并以 [[entities/redis|Redis]] 作为缓存基础设施，全面践行 [[concepts/异步io|异步I/O]] 与 [[concepts/性能优化|性能优化]] 的工程最佳实践。

## 关键实体
- [[entities/cursor-directory|Cursor Directory]]：AI 编码助手 Prompt 配置模板的资源平台
- [[entities/sanic|Sanic]]：基于 Python 的高性能异步 Web 框架
- [[entities/tortoise-orm|Tortoise ORM]]：专为 Python 异步应用设计的 ORM 库
- [[entities/pydantic|Pydantic]]：Python 的数据验证与序列化库
- [[entities/redis|Redis]]：用于性能优化的缓存基础设施

## 关键概念
- [[concepts/专用prompt|专用prompt]]：为不同类型 AI Agent 配置针对性系统级 Prompt 的方法论
- [[concepts/web-research|Web Research]]：用于 Agent 内部知识不足时查询外部信息的外部搜索 MCP 工具
- [[concepts/函数式编程|函数式编程]]：以纯函数、声明式风格替代类的核心编程范式
- [[concepts/类型提示|类型提示]]：强制所有函数签名使用类型注释的编码标准
- [[concepts/守卫子句|守卫子句]]：优先处理错误和边缘情况以避免深度嵌套的方法
- [[concepts/异步io|异步I/O]]：通过异步非阻塞操作最小化 I/O 阻塞的技术路径
- [[concepts/roro模式|RORO模式]]：接收对象并返回对象的核心设计原则
- [[concepts/错误处理|错误处理]]：包含异常处理机制与自定义错误类型的系统化策略
- [[concepts/中间件|中间件]]：用于处理日志记录和错误监控等横切关注点的编程模式
- [[concepts/性能优化|性能优化]]：涵盖异步调用、缓存策略与延迟加载的多层面优化实践
- [[concepts/延迟加载|延迟加载]]：处理大型数据集以减少初始加载开销的技术
- [[concepts/事务支持|事务支持]]：确保数据库操作数据一致性的关键特性
- [[concepts/生命周期事件|生命周期事件]]：管理应用启动和关闭资源的机制

## 要点
- 为代码编写和代码阅读两类智能体分别定义了结构化的系统级 Prompt，是 Prompt Engineering 在实际开发中落地的典型范例。
- **核心编程规范**：倡导函数式、声明式编程，优先使用纯函数避免类；强制类型提示；优先使用 Pydantic 模型而非原始字典进行输入验证。
- **错误处理策略**：使用守卫子句（Guard Clause）和提前返回（if-return 模式），避免深度嵌套；使用自定义错误类型或错误工厂实现统一处理。
- **技术栈选型**：确定 Sanic 框架 + Pydantic + Tortoise ORM + Redis 的技术组合，全面采用异步非阻塞架构。
- **性能优化方法**：最小化阻塞 I/O 操作；对所有数据库调用和外部 API 请求使用异步操作；结合缓存策略和延迟加载处理大型数据集。
- **外部知识增强**：所有 Agent 均需配置 web research 工具，遇到报错类问题时必须优先调用外部搜索工具查询信息后再编写代码。

---