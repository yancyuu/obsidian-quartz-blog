---
type: entity
created: 2026-06-23
updated: 2026-06-23
sources: ["[[sources/04-gpt-5-2-史诗级翻车谷歌这次居然赢麻了_e3bee2]]"]
tags: [project]
aliases:
  - "Raptor项目"
  - "Raptor RAG"
---


# Raptor

## 基本信息
- Type: project
- Source: [[sources/04-gpt-5-2-史诗级翻车谷歌这次居然赢麻了_e3bee2|04. GPT-5.2 史诗级翻车？谷歌这次居然赢麻了！]]

## 描述

Raptor 是一个与 RAG（检索增强生成）树构建逻辑相关的开源项目，其核心功能是实现层次化的树状知识结构构建。该项目在某次 [[entities/gpt-5-2|GPT-5.2]] 与 [[entities/gemini-3-pro|Gemini 3 Pro]] 的代码能力对比测试中被用作基准项目。测试任务是将其中的树构建逻辑抽取为独立文件，实现[[concepts/模块解耦|模块解耦]]。在此测试中，[[entities/gemini-3-pro|Gemini 3 Pro]] 完美完成了[[concepts/代码重构|代码重构]]任务，新建了 `raptor_tree_builder.py` 文件，逻辑聚拢且核心模型完整保留；而 [[entities/gpt-5-2|GPT-5.2]] 不仅未能理解解耦的含义，还将源文件改坏，表现出现了显著差距。

## 相关实体
- [[entities/gpt-5-2|GPT-5.2]]
- [[entities/gemini-3-pro|Gemini 3 Pro]]

## 相关概念
- [[concepts/代码重构|代码重构]]
- [[concepts/模块解耦|模块解耦]]

## 来源提及
- "任务：基于 Raptor 项目，把树构建逻辑抽取成独立文件（划重点：独立文件，去依赖）。" — [[sources/04-gpt-5-2-史诗级翻车谷歌这次居然赢麻了_e3bee2|04. GPT-5.2 史诗级翻车？谷歌这次居然赢麻了！]]
- "Gemini 3 Pro：完美。新建 `raptor_tree_builder.py`，逻辑聚拢，核心模型不丢。" — [[sources/04-gpt-5-2-史诗级翻车谷歌这次居然赢麻了_e3bee2|04. GPT-5.2 史诗级翻车？谷歌这次居然赢麻了！]]