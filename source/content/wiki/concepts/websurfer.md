---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/2025-0426🧘以人为中心的agent_d84722]]"]
tags: [method]
aliases:
  - "网络浏览器智能体"
  - "WebSurfer智能体"
  - "网页浏览Agent"
---


# WebSurfer

## 定义
WebSurfer 是 [[entities/autogen|AutoGen]] 旗下的 Magentic-UI 架构中配备可控浏览器的 LLM 智能体。它能够执行点击、输入、滚动和访问页面等浏览器操作，底层使用 [[entities/playwright|Playwright]] 框架实现网页自动化，将[[concepts/planner|协调器]]发出的自然语言任务翻译成一系列浏览器操作计划。WebSurfer 模拟人类在浏览器中的操作行为，充当自动化的"鼠标+键盘+眼睛"，是[[concepts/以人为中心的agent|以人为中心的Agent]]设计中执行层的关键组件。

## 关键特征
- **可控浏览器操作**：具备点击、输入、滚动、访问页面等完整的浏览器交互能力
- **基于 Playwright 框架**：底层使用 [[entities/playwright|Playwright]] 实现网页自动化，支持打开网页、点击按钮、输入文本、上传文件、切换标签页、读取 DOM 元素信息等操作
- **自然语言到操作计划的翻译**：将上层协调器发出的自然语言任务指令翻译为一系列可执行的浏览器操作步骤
- **拟人化操作模式**：模拟人类在浏览器中的真实操作行为，充当自动化的"鼠标+键盘+眼睛"
- **执行层定位**：在 Magentic-UI 的多智能体架构中，WebSurfer 定位于任务执行层，负责实际的环境交互

## 应用
- 在 Magentic-UI 架构中作为核心执行智能体，接收协调器分配的子任务并执行浏览器操作
- 自动化网页信息采集与表单填写等需要真实浏览器交互的任务场景
- 复杂的多步骤网页操作流程，如在线购物流程、预订系统操作、数据录入等
- 配合[[concepts/工具图谱|工具图谱]]和其他智能体完成端到端的自动化工作流

## 相关概念
- [[concepts/agent|智能体]]
- [[concepts/工具图谱|工具图谱]]
- [[concepts/以人为中心的agent|以人为中心的agent]]
- [[concepts/planner|planner]]
- [[concepts/多智能体协作|多智能体协作]]

## 相关实体
- [[entities/autogen|AutoGen]]
- [[entities/playwright|Playwright]]

## 来源提及
- "网络浏览器(WebSurfer)：配备可控浏览器的LLM智能体，能够点击、输入、滚动和访问页面。" — [[sources/2025-0426🧘以人为中心的agent_d84722|2025-0426🧘以人为中心的agent_d84722]]
- "通过 Playwright，WebSurfer 可以控制真实浏览器完成以下操作：打开网页、点击按钮、输入文本、上传文件、切换标签页、读取 DOM 元素信息" — [[sources/2025-0426🧘以人为中心的agent_d84722|2025-0426🧘以人为中心的agent_d84722]]