---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0426🧘以人为中心的agent_d84722]]"]
tags: [method]
aliases:
  - "编码器"
  - "编码器智能体"
  - "Coder Agent"
---


# Coder

## 定义
Coder（编码器）是 [[entities/autogen|AutoGen]] 旗下 Magentic-UI 多智能体架构中的专门化编码智能体组件。它配备 Docker 代码执行容器，能够编写和执行 Python 及 shell 命令。Coder 作为多智能体团队的一员，接收协调器（Orchestrator）委派的编码相关子任务，并在安全的沙盒环境中执行，体现了模块化的多智能体协作设计思路。

## 关键特征
- **Docker 沙盒执行**：配备独立的 Docker 代码执行容器，确保代码在隔离的安全环境中运行
- **多语言支持**：能够编写和执行 Python 代码及 shell 命令
- **任务委派机制**：作为专门化智能体，接收协调器分配的编码相关子任务
- **能力隔离设计**：将代码执行能力与浏览器操作、文件处理等能力分离，体现模块化架构理念
- **多智能体协作**：作为 [[concepts/多智能体协作|多智能体协作]] 团队中的编码专家角色存在

## 应用
- 在多智能体工作流中承担代码编写与执行任务，如数据处理脚本、自动化工具开发
- 在安全的 Docker 容器中执行用户请求的计算任务，避免对宿主环境造成风险
- 与其他专门化智能体（如浏览器操作智能体、文件处理智能体）协同完成复杂任务
- 支持快速原型开发和代码验证场景

## 相关概念
- [[concepts/多智能体协作|多智能体协作]]
- [[concepts/planner|planner]]
- [[concepts/agent|agent]]
- [[concepts/模块化先于服务化|模块化先于服务化]]

## 相关实体
- [[entities/autogen|AutoGen]]

## 来源提及
- "编码器(Coder)：配备Docker代码执行容器的LLM智能体，可以编写和执行Python及shell命令。" — [[sources/2025-0426🧘以人为中心的agent_d84722|2025-0426🧘以人为中心的agent_d84722]]