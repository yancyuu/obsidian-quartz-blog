---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [method]
aliases:
  - "代码化逃逸"
  - "Code-First RPA 方法"
  - "代码优先 RPA"
---


# Code-First RPA

## 定义
Code-First RPA 是[[concepts/可逃逸架构|可逃逸架构]]中对老旧系统或无接口黑盒系统的处理策略。其核心原则是：优先使用 Playwright / Selenium 等开源代码库进行自动化操作，而非依赖可视化 RPA 工具。该策略严禁使用无法导出源码、无法 Git 管理、无法 CI/CD 的低代码 RPA 工具（如影刀），并建议用 AgentBay 或 OpenSandbox 代替。同时要求实现**读写分离**：读操作可直接暴露给 AI，写操作（如退款）必须封装为包含 Pre-check 的固定工作流，AI 仅负责触发。

## 关键特征
- **代码优先**：优先使用 Playwright、Selenium 等开源代码库进行自动化，确保所有流程可代码化、可版本控制。
- **严禁低代码 RPA**：禁用无法导出源码、无法 Git 管理、无法接入 CI/CD 管线的可视化 RPA 工具（如影刀），推荐使用 AgentBay 或 OpenSandbox 作为替代方案。
- **读写分离原则**：
  - **读操作**（如查询订单状态）可直接暴露给 AI 自由调用。
  - **写操作**（如退款、修改数据）必须封装为包含 Pre-check 的固定工作流，AI 仅负责触发，不可自由编排。
- **可逃逸性**：作为可逃逸架构的一部分，确保所有自动化逻辑可审计、可迁移、可替换，避免供应商锁定。

## 应用
- **遗留系统自动化**：对无 API 接口的老旧系统，使用 Playwright/Selenium 编写自动化脚本，替代传统可视化 RPA 工具。
- **数据读取场景**：将查询类操作（如获取订单信息、库存状态）封装为工具，直接暴露给 AI Agent 自主调用。
- **敏感写操作治理**：将退款、转账等高风险写操作封装为包含前置校验（Pre-check）的固定工作流，AI 仅发出触发指令，确保操作安全可控。
- **Agent 沙箱执行**：使用 AgentBay 或 OpenSandbox 提供隔离的执行环境，AI 在沙箱中完成自动化操作，避免直接操作生产环境。

## 相关概念
- [[concepts/可逃逸架构|可逃逸架构]]

## 相关实体
- [[entities/Playwright|Playwright]]
- [[entities/AgentBay|AgentBay]]
- [[entities/RPA|RPA]]

## 来源提及
- "Code-First RPA：优先使用 Playwright/Selenium 等开源代码库。" — [[架构/应用开发规范/"可逃逸架构"设计模式|"可逃逸架构"设计模式]]
- "严禁低代码：严禁使用无法导出源码、无法 Git 管理、无法 CI/CD 的可视化 RPA 工具，比如影刀，用agentbay代替或者用opensandbox。" — [[架构/应用开发规范/"可逃逸架构"设计模式|"可逃逸架构"设计模式]]
- "读写分离：读操作可直接暴露给 AI；写操作（如退款）必须封装为包含 Pre-check 的固定工作流，AI 仅负责触发。" — [[架构/应用开发规范/"可逃逸架构"设计模式|"可逃逸架构"设计模式]]