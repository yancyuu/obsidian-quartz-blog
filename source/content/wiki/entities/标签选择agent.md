---
type: entity
created: 2026-06-24
updated: 2026-06-24
sources: ["[[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060]]"]
tags: [project]
aliases:
  - "The Classifier"
  - "分类Agent"
---


# 标签选择Agent

## 基本信息
- Type: project
- Source: [[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060|07.我如何用 Agent 砍掉团队30的"垃圾时间"]]

## 描述

标签选择Agent是VOC（Voice of Customer）舆情分析系统的核心组件，被誉为整个系统的"核心大脑"。该Agent的主要职责是对用户评论进行自动分类，将其归入预设的业务标签体系中。它通过[[concepts/few-shot-prompting|Few-Shot Prompting]]（少样本提示）技术来理解和学习业务逻辑，从而实现高质量的自动化分类。

该Agent在Prompt策略上的一个关键设计是：不仅要求输出分类结果，还要求输出"置信度"。当置信度低于0.8时，评论会被自动转给人工确认（[[concepts/human-in-the-loop|Human-in-the-loop]]），从而在保证数据准确性的同时最大化自动化率。此外，为防止[[concepts/幻觉控制|大模型幻觉]]问题，其输出被严格限制在预设的JSON标签列表中，确保分类结果始终在可控范围内。

## 相关实体
- [[entities/飞书|飞书]] — 系统集成协作平台，用于人工审核与数据流转
- [[entities/标签分析Agent|标签分析Agent]] — 下游协作Agent，负责对分类后的标签进行深度分析

## 相关概念
- [[concepts/few-shot-prompting|Few-Shot Prompting]] — 核心提示工程技术，使Agent通过少量样本理解业务逻辑
- [[concepts/human-in-the-loop|Human-in-the-loop]] — 人机协同机制，低置信度结果自动转人工确认
- [[concepts/幻觉控制|幻觉控制]] — 通过JSON标签列表约束输出，防止模型产生无效分类

## 来源提及
- "这是系统的核心大脑。我们通过 **Few-Shot Prompting (少样本提示)** 让 Agent 理解业务逻辑。" — [[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060|07.我如何用 Agent 砍掉团队30的"垃圾时间"]]
- "_Prompt 策略_：不只让它分类，还要求它输出"置信度"。置信度低于 0.8 的自动转给人工确认，确保数据的准确性，同时最大化自动化率。" — [[sources/07-我如何用-agent-砍掉团队30的“垃圾时间”_d98060|07.我如何用 Agent 砍掉团队30的"垃圾时间"]]