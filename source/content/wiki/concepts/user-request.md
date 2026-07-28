---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/渐进式披露架构_780a26]]"]
tags: [term]
aliases:
  - "用户请求"
  - "👤 User Request"
---


# User Request

## 定义
User Request（用户请求）是渐进式披露架构中的入口点，代表终端用户向 Agent 系统发出的交互指令。用户请求触发整个处理流程：输入指令后经 L1 Router 进行意图匹配，激活特定技能，再动态建立连接调用后端工具完成任务。该流程体现了纯意图驱动、避免上下文污染的核心设计哲学。

## 关键特征
- 作为架构流程的起点，所有后续路由与工具调度均由用户请求触发
- 通过意图匹配（而非预加载全部能力）来确定需要激活的技能，实现按需加载
- 请求处理遵循纯意图驱动原则，避免无关信息进入上下文造成污染
- 用户请求与具体后端工具解耦，运行时动态建立连接

## 应用
- 用户向客服 Agent 发送"查库存"指令，系统经 L1 Router 匹配意图后激活库存查询技能，动态调用后端库存接口
- 用户输入自然语言指令，Agent 系统据此判断所需技能集并按需加载对应的 Worker 与工具链

## 相关概念
- [[concepts/l1-router|IntentClassifier]]
- [[concepts/路由架构与按需加载|按需加载]]
- [[concepts/无状态上下文|上下文污染]]

## 相关实体
- [[entities/agent-runtime|Agent Runtime]]
- [[entities/l1-router|L1 Router]]

## 来源提及
- "👤 User Request ^BoRhihGf" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]
- "1. 输入指令 ^MYfTnOyD ... 2. 匹配意图 ^mZ0vXu" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]