---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/渐进式披露架构_780a26]]"]
tags: [other]
aliases:
  - "管理层"
  - "Context Management"
  - "技能管理层"
---


# Management

## 基本信息
- Type: other
- Source: [[sources/渐进式披露架构_780a26|渐进式披露架构]]

## 描述
Management 是架构图中的一个核心组件，负责对技能（Skill）进行统一管理。它与 Skill Registry 紧密关联，但其中的技能注册表仅记录技能名称，而不包含具体的 API 或工具定义。这种设计确保了上下文的无状态化和纯净性，有效避免了上下文污染问题。管理层的存在是[[concepts/可逃逸架构|可逃逸架构]]能够实现运行时动态加载工具的关键保障，使得 Agent 能够在需要时按需加载技能，而非在初始化时全量载入。

## 相关实体
- [[entities/Agent Runtime|Agent Runtime]]

## 相关概念
- [[concepts/Skill Registry|Skill Registry]]
- [[concepts/无状态上下文|无状态上下文]]
- [[concepts/上下文污染|上下文污染]]
- [[concepts/可逃逸架构|可逃逸架构]]
- [[concepts/路由架构与按需加载|路由架构与按需加载]]

## 来源提及
- "UQoMlL ... Management ^vBe3TUXf" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]
- "📋 Skill Registry 仅包含技能名，无工具定义 ^oaxmoF" — [[sources/渐进式披露架构_780a26|渐进式披露架构]]