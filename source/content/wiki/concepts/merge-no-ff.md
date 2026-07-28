---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/版本控制用rebase取代merge_3f7b45]]"
tags:
  - "method"
aliases:
  - "--no-ff"
  - "no fast-forward merge"
  - "--no-ff merge"
---

## Description
`merge --no-ff`（no fast-forward，非快进合并）是 Git 中用于主分支合并的指定方法。该选项强制 Git 创建一个新的合并提交，即使变更可以通过快进方式合并。这确保了主分支中每次合并都有一个明确的合并记录节点，在线上历史中表现为一个凸起节点，便于追溯和查阅。文档将其列为版本控制的基本原则之一：主分支永远使用 `--no-ff` 合并，以保留完整的历史记录。每次合并产生的凸起节点使团队成员能够清晰地识别每次功能合并的范围和时间点，是主分支保护策略的重要组成部分。

## 关键特征
- 强制创建新的合并提交（merge commit），即使快进合并可用
- 在 Git 历史图中表现为一个明显的凸起节点，包含两个父提交
- 保留分支的完整历史轨迹，使每次功能合并都可追溯
- 与默认的快进合并（fast-forward）不同，不会将分支提交直接线性拼接到目标分支

## 应用
- 团队协作开发中，将功能分支（feature branch）合并到主分支（master/main）时使用，确保每次合并都有清晰的记录
- 代码审查（code review）后合并代码，通过合并提交明确标记合入点和范围
- 版本发布管理中，保留每次功能迭代或修复的完整历史脉络

## 相关概念
- [[concepts/rebase|rebase]]

## 相关实体
- [[entities/Git|Git]]

## 来源提及

> **来源：[[sources/版本控制用rebase取代merge_3f7b45|版本控制（用rebase取代merge）]]**
> - "主分支（master）永远用 --no-ff merge（为了保留完整的历史记录）。"
> - "使用 `--no-ff`（no fast-forward）合并选项时，Git 强制创建一个新的合并提交，即使你进行的变更可以通过"快进"（fast-forward）来合并。"
> - "每一次被merge的多个提交在线上就有一个凸起，方便查阅，否则就变成了很不明显的一条线"