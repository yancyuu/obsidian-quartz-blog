---
type: entity
created: 2026-06-21
updated: 2026-06-22
sources:
  - "[[sources/01-把信仰交给-ai-的血泪教训_558fff]]"
  - "[[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7]]"
tags:
  - "project"
aliases:
  - "客服智能体"
  - "客户服务Agent"
---

## 描述
客服Agent是作者在过去两年实践中落地的企业级智能体项目，旨在自动处理客户咨询和售后问题。该项目在实际运行的多轮对话场景中暴露出严重的记忆丢失问题：用户聊了三四轮后，系统突然忘记第一轮的约定，开始产生偏离上下文的回答。作者诊断其根本原因是缺乏[[concepts/显式节点图|显式节点图]]——将复杂的业务流程（如询价 → 确认 → 支付）完全交给LLM的隐式记忆来维持，一旦[[concepts/context-window压力|Context Window压力]]增大，系统便出现状态混乱。在面向5000+并发用户的高并发版本中，系统进一步暴露出算力错配（简单指令调用[[entities/openai|GPT-4]]导致成本暴增）、状态丢失（多轮对话上下文频繁断裂）和死循环（Agent在模糊意图下陷入无限递归）三大致命问题。通过引入[[concepts/agentic-rag|Agentic RAG]]分层架构、[[concepts/语义缓存|语义缓存]]、[[concepts/混合检索|混合检索]]和自研[[concepts/有限状态机|有限状态机]]，项目最终实现了单次会话成本降低86%、P99延迟从3.5s优化至1.1s、死循环率从2.4%降至0%的显著改善。这些实践案例直接促成了作者采用[[concepts/阶段机|阶段机]]和显式流程图来约束Agent行为的架构方案，重构过程中还借助了[[entities/langgraph|LangGraph]]等框架。

## 相关实体
- [[entities/信仰咨询agent|信仰咨询Agent]]
- [[entities/订餐agent|订餐Agent]]
- [[entities/openai|OpenAI]]
- [[entities/langgraph|LangGraph]]

## 相关概念
- [[concepts/显式节点图|显式节点图]]
- [[concepts/阶段机|阶段机]]
- [[concepts/context-window压力|Context Window压力]]
- [[concepts/agentic-rag|Agentic RAG]]
- [[concepts/有限状态机|有限状态机]]
- [[concepts/语义缓存|语义缓存]]
- [[concepts/混合检索|混合检索]]
- [[concepts/模型路由|模型路由]]

## 来源提及

> **Source: [[sources/01-把信仰交给-ai-的血泪教训_558fff|01-把信仰交给-ai-的血泪教训]]**
> - "在客服 Agent 中，用户聊了三四轮后，系统突然忘记了第一轮的约定，开始胡言乱语。"
> - "深层原因：缺乏显式节点图。你把复杂的业务流程（如：询价 $\to$ 确认 $\to$ 支付）扔给 LLM 隐式记忆，一旦 Context Window 压力大，它就"人格分裂"了。"

> **Source: [[sources/02-我们将企业级-agent-降低85%的血泪重构史_7c4bc7|02-我们将企业级-agent-降低85%的血泪重构史]]**
> - "本文解析了一个高并发客服 Agent 项目的架构重构过程。"
> - "系统上线后，面对 5000+ 并发用户，监控面板暴露了三个致命的"伪 AI"特征："
> - "经过 30 天的生产环境验证，架构重构带来了显著的业务指标提升"