---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/agent-app代码结构_c030b6]]"]
tags: [standard]
aliases:
  - "agents模块"
  - "业务代理目录"
---


# agents目录结构

## 定义
agents 目录结构是 agent_app 中存放具体业务代理的模块化设计规范。每个业务 Agent（如 coding_agent 和 research_agent）都包含 agent.py（核心逻辑）、tools.py（工具绑定）、prompts.py（专用 Prompt）和 tests（专用测试），形成完整的业务闭环。这种结构确保每个 Agent 包含自己的 Prompt/Tool/Logic，实现了单一职责和模块间的解耦。

## 关键特征
- **模块化设计**：每个业务 Agent 作为独立模块存在，包含各自完整的逻辑、工具与提示词
- **统一文件结构**：各 Agent 内部遵循一致的文件组织——`agent.py`（核心逻辑）、`tools.py`（工具绑定）、`prompts.py`（专用提示词）、`tests`（专用测试）
- **单一职责**：每个 Agent 只负责一个具体业务领域，职责边界清晰
- **模块解耦**：Agent 之间相互独立，修改或新增某个 Agent 不影响其他模块
- **业务闭环**：每个 Agent 目录内包含从定义到测试的全部要素，形成自包含的业务单元

## 应用
- 在 agent_app 项目中按业务领域组织代码，如 `agents/coding_agent/`、`agents/research_agent/` 分别承载编程代理和研究代理的完整逻辑
- 新增业务代理时，复制已有 Agent 目录结构并替换内部逻辑，快速搭建新的业务模块
- 团队协作中，不同开发者可并行开发各自的 Agent 模块，互不干扰

## 相关概念
- [[concepts/业务闭环|业务闭环]]
- [[concepts/单一职责|单一职责]]
- [[concepts/模块解耦|模块解耦]]
- [[concepts/核心逻辑|核心逻辑]]
- [[concepts/工具绑定|工具绑定]]
- [[concepts/专用prompt|专用prompt]]
- [[concepts/专用测试|专用测试]]

## 相关实体
- [[entities/agent_app|agent_app]]
- [[entities/coding_agent|coding_agent]]
- [[entities/research_agent|research_agent]]

## 来源提及
- "agents/ 具体业务代理" — [[架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]
- "每个 Agent 包含自己的Prompt/Tool/Logic" — [[架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]
- "agent.py 核心逻辑" — [[架构/应用开发规范/excalid/agent-app代码结构|agent-app代码结构]]