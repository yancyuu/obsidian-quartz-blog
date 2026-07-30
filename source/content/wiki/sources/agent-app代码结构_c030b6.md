---
type: source
created: 2026-07-28
updated: 2026-07-28
source_file: "[[../../架构/应用开发规范/excalid/agent-app代码结构]]"
tags:
  - excalidraw
aliases:
  - Agent App 代码结构图
  - agent_app 架构图
---

# Agent App 架构图（Excalidraw） - 摘要

## 来源
- 原始文件：[[../../架构/应用开发规范/excalid/agent-app代码结构]]
- 收录日期：2026-07-28

## 核心内容
本来源是一份 Excalidraw 格式的架构设计图，展示了一个典型 [[entities/agent_app|agent_app]] 项目的完整目录结构与模块组织方式。整体架构采用分层设计：入口配置层使用 [[entities/fastapi|FastAPI]] 或 [[entities/sanic|Sanic]] 作为 API 入口，配合 [[entities/configsettings-py|settings.py]] 和 [[entities/env|.env]] 管理配置；业务代理层由独立的业务 Agent（如 [[entities/coding_agent|coding_agent]]、[[entities/research_agent|research_agent]]）构成，每个 Agent 形成完整的 [[concepts/业务闭环|业务闭环]]；通用功能模块层（[[entities/modules|modules]]）提供编排、记忆、工具等基础设施。架构的核心设计理念为 [[concepts/可逃逸设计|可逃逸设计]]——工具定义集中在 modules 中，Agent 仅引用 Schema，通过 [[concepts/继承|继承]]、[[concepts/挂载|挂载]] 和 [[concepts/使用|使用]] 三种方式实现解耦。编排层由 [[entities/router-py|router.py]]（[[concepts/意图路由|意图路由]]）和 [[entities/state_graph-py|state_graph.py]]（[[entities/langgraph|LangGraph]] 封装）组成；记忆层整合 [[concepts/向量库连接|向量库连接]] 与 [[entities/history_manager-py|history_manager.py]]（[[entities/redis|Redis]] 历史管理）；工具层通过 [[entities/mcp_server-py|mcp_server.py]]（[[concepts/协议封装|协议封装]]）和 [[entities/base_tool-py|base_tool.py]]（[[entities/pydantic|Pydantic]] 基类）标准化工具接入。

## 关键实体
- [[entities/agent_app|agent_app]] — 顶层项目结构
- [[entities/fastapi|FastAPI]] / [[entities/sanic|Sanic]] — API 入口框架
- [[entities/python|Python]] — 编程语言基础
- [[entities/langgraph|LangGraph]] — 状态图编排框架
- [[entities/redis|Redis]] — 会话历史存储后端
- [[entities/pydantic|Pydantic]] — 数据验证与 Schema 定义库
- [[entities/core-agent|core-agent]] — 核心 Agent 基类模块
- [[entities/modules|modules]] — 通用功能模块目录
- [[entities/coding_agent|coding_agent]] / [[entities/research_agent|research_agent]] — 具体业务代理
- [[entities/router-py|router.py]] — 意图路由文件
- [[entities/state_graph-py|state_graph.py]] — LangGraph 封装组件
- [[entities/mcp_server-py|mcp_server.py]] — MCP 协议封装文件
- [[entities/base_tool-py|base_tool.py]] — 工具 Pydantic 基类文件
- [[entities/history_manager-py|history_manager.py]] — 历史管理器文件
- [[entities/schemas|schemas/]] — 通用 Schema 定义目录
- [[entities/prompt_templates|prompt_templates/]] — 通用 Prompt 模板目录
- [[entities/agent-py|agent.py]] — Agent 核心逻辑文件

## 关键概念
- [[concepts/业务闭环|业务闭环]] — 每个 Agent 自包含 Prompt/Tool/Logic
- [[concepts/可逃逸设计|可逃逸设计]] — 工具与 Schema 分离，实现解耦
- [[concepts/应用入口与配置|应用入口与配置]] — 系统最外层基础设施
- [[concepts/意图路由|意图路由]] — 智能请求分发机制
- [[concepts/协议封装|协议封装]] — MCP 协议标准化工具接入
- [[concepts/向量库连接|向量库连接]] — 语义检索能力支撑
- [[concepts/agent基类|Agent 基类]] — 通用行为封装
- [[concepts/工具绑定|工具绑定]] — Agent 声明式工具注册
- [[concepts/核心逻辑|核心逻辑]] — Agent 核心行为与决策流程
- [[concepts/orchestration|orchestration]] — 编排调度模块
- [[concepts/tools-actions|tools-actions]] — 工具与动作模块
- [[concepts/memory-context|memory-context]] — 记忆与上下文管理模块
- [[concepts/agents目录结构|agents 目录结构]] — 业务代理模块化规范
- [[concepts/继承|继承]] / [[concepts/挂载|挂载]] / [[concepts/使用|使用]] — 三种模块交互模式

## 要点
- **分层架构设计**：从入口配置层 → 业务代理层 → 通用功能模块层，职责分明
- **业务闭环原则**：每个 Agent 包含独立的 [[concepts/专用prompt|专用 Prompt]]、[[concepts/工具绑定|工具绑定]]、[[concepts/核心逻辑|核心逻辑]] 和 [[concepts/专用测试|专用测试]]，可独立开发与部署
- **可逃逸设计核心**：[[concepts/tools定义在-modules-中agent-只引用-schema|Tools 定义在 modules 中，Agent 只引用 Schema]]，通过 [[concepts/继承|继承]] 和 [[concepts/挂载|挂载]] 机制实现工具层与 Agent 逻辑的彻底解耦
- **编排层双引擎**：[[concepts/意图路由|意图路由]]（router.py）负责请求分发，[[entities/state_graph-py|state_graph.py]] 负责基于 [[entities/langgraph|LangGraph]] 的状态流转编排
- **记忆系统双层架构**：[[concepts/向量库连接|向量库连接]] 提供语义检索能力，[[entities/redis|Redis]] 历史管理保障多轮对话上下文连贯
- **协议标准化**：通过 [[concepts/协议封装|MCP 协议封装]] 和 [[entities/pydantic|Pydantic]] 基类统一工具接入规范，保障系统可扩展性