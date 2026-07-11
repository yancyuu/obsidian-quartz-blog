---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/01-把信仰交给-ai-的血泪教训_558fff]]"]
tags: [project]
aliases:
  - "企业问答智能体"
  - "IT流程问答Agent"
---


# 企业问答Agent

## 基本信息
- Type: project
- Source: [[sources/01-把信仰交给-ai-的血泪教训_558fff]]

## 描述
企业问答Agent是作者实际落地的企业知识库项目，旨在回答员工关于IT流程、合同和政策等方面的内部问题。该项目在实际运行中暴露出两大典型问题：一是知识库缺乏版本控制，Agent引用了三年前的过期文档，导致员工依据过时信息产生操作失误；二是在解析复杂合同和政策时，由于RAG检索的Chunk粒度不当，仅命中部分文本便在信息不全的情况下"自信地胡说"。作者将根本原因归结为知识缺乏版本控制与权威性校验机制，以及RAG系统缺乏自我校对能力。该案例直接推动了[[concepts/数据分层隔离|数据分层隔离]]和[[concepts/反思型RAG|反思型RAG]]修复方案的落地实施。

## 相关实体
- [[entities/信仰咨询Agent|信仰咨询Agent]]
- [[entities/订餐Agent|订餐Agent]]
- [[entities/客服Agent|客服Agent]]

## 相关概念
- [[concepts/数据分层隔离|数据分层隔离]]
- [[concepts/反思型RAG|反思型RAG]]
- [[concepts/结构化检索|结构化检索]]

## 来源提及
- "企业问答 Agent 在回答 IT 流程时，引用了三年前的过期文档，导致员工操作失误。" — [[sources/01-把信仰交给-ai-的血泪教训_558fff|01. 把信仰交给 AI 的血泪教训]]
- "同时，在解析复杂合同或政策时，RAG 检索只命中了一小部分文本（Chunk 粒度不当），使得 Agent 在信息不全的情况下'自信地胡说'。" — [[sources/01-把信仰交给-ai-的血泪教训_558fff|01. 把信仰交给 AI 的血泪教训]]