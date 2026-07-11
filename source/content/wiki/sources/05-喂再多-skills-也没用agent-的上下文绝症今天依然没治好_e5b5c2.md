---
type: source
created: 2026-06-24
updated: 2026-06-24
source_file: "[[👩‍💻 个人笔记/公众号/05. 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好.md]]"
tags: [ai-agent, writing, personal-note, context-engineering, mcp, wechat-article]
aliases: ["Agent 的上下文绝症", "Claude Skills 批判", "Agent 上下文问题深度分析"]
---

# 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好 - 摘要

## 来源
- 原始文件: [[👩‍💻 个人笔记/公众号/05. 喂再多 Skills 也没用：Agent 的上下文绝症，今天依然没治好.md]]
- 收录日期: 2026-06-24

## 核心内容
本文是一篇针对 [[entities/anthropic|Anthropic]] 最新发布的 [[entities/claude-skills|Claude Skills]] 的犀利技术批判文章。作者指出，Claude Skills 宣传的核心概念 [[concepts/progressive-disclosure|Progressive Disclosure（渐进式披露）]] 本质上只是 1960 年代就存在的 [[concepts/手动分页|手动分页]] 技术的换皮之作。从 [[concepts/function-calling|Function Calling]] 到 [[concepts/mcp|MCP]] 再到 Claude Skills，整个行业三代技术方案本质上都是在用越来越复杂的工程化补丁，掩盖 [[concepts/transformer|Transformer]] 架构 [[concepts/上下文窗口|上下文窗口]] 又贵、又短、又容易遗忘的根本缺陷。文章揭示了 [[concepts/上下文欺骗循环|上下文欺骗循环]] 的三大症状——抖动、[[concepts/状态丢失|状态丢失]]（逻辑断层）和 [[concepts/io阻塞|延迟叠加]]，并指出当前 Agent 开发者被迫沦为操作系统调度员，承担 [[concepts/agent内存管理|内存管理]] 和 [[concepts/进程调度|进程调度]] 的沉重负担。作者呼吁：只要 [[concepts/transformer|Transformer]] 的 O(N²) 复杂度和 [[concepts/kv-cache|KV Cache]] 显存占用还在，真正的出路可能在于 [[concepts/非transformer架构|非 Transformer 架构]] 的革命性突破。

## 关键实体
- [[entities/anthropic|Anthropic]] — Claude Skills 的发布方，被批评用营销词汇掩盖技术缺陷
- [[entities/claude-skills|Claude Skills]] — 被宣传为 Agent "工业革命"的产品功能，实为"手动分页"换皮

## 关键概念
- [[concepts/progressive-disclosure|Progressive Disclosure（渐进式披露）]] — Claude Skills 的核心营销概念
- [[concepts/手动分页|手动分页]] — 1960 年代的老技术，被指为渐进式披露的本质
- [[concepts/上下文窗口压力|上下文窗口压力]] — 让所有 AI 厂商夜不能寐的根本困境
- [[concepts/上下文欺骗循环|上下文欺骗循环]] — 作者揭示的 Agent 恶性循环机制
- [[concepts/function-calling|Function Calling]] — 第一代上下文"补丁"
- [[concepts/mcp|MCP（Model Context Protocol）]] — 第二代上下文"补丁"
- [[concepts/状态丢失|状态丢失]] — Agent 换页时的短期记忆丢失
- [[concepts/transformer|Transformer]] — 当前 LLM 的主流架构，O(N²) 复杂度成瓶颈
- [[concepts/kv-cache|KV Cache]] — Transformer 推理加速机制，显存占用是根本障碍
- [[concepts/上下文窗口|上下文窗口]] — 被形容为"又贵又短又健忘的金鱼脑"
- [[concepts/非transformer架构|非 Transformer 架构]] — 真正解决上下文问题的可能方向
- [[concepts/agent内存管理|Agent 内存管理]] — 开发者被迫承担的操作系统级职责
- [[concepts/进程调度|进程调度]] — 开发者需处理的 Skill 优先级管理
- [[concepts/io阻塞|I/O 阻塞]] — 按需加载策略引入的延迟副作用

## 要点
- **核心批判**：Claude Skills 的"渐进式披露"本质上就是 1960 年代的"手动分页"技术，并非真正的创新，被比喻为"内存只有 640K 的 DOS 系统，靠插软盘弥补"。
- **根本瓶颈**：[[concepts/transformer|Transformer]] 架构的上下文窗口存在 O(N²) 计算复杂度和 [[concepts/kv-cache|KV Cache]] 显存占用的根本缺陷，是所有 Agent 方案的"绝症"。
- **三代补丁**：[[concepts/function-calling|Function Calling]]（给锤子）→ [[concepts/mcp|MCP]]（给说明书）→ Claude Skills（把说明书锁柜子里），本质上都是在"拆东墙补西墙"。
- **三大症状**：[[concepts/上下文欺骗循环|上下文欺骗循环]] 包含抖动（频繁切换）、逻辑断层（[[concepts/状态丢失|状态丢失]]）和延迟叠加（昂贵 I/O），厂商不敢在发布会上展示。
- **开发者困境**：优秀 Agent 开发者被迫沦为"操作系统调度员"，必须手动处理 [[concepts/agent内存管理|内存管理]]、[[concepts/进程调度|进程调度]] 和 [[concepts/io阻塞|I/O 阻塞]]。
- **未来出路**：真正的解决方案可能需要等待 [[concepts/非transformer架构|非 Transformer 架构]]（如 RNN/SSM/RWKV）实现真正的无限上下文，而非继续打工程化补丁。

---