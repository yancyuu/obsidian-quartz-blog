---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/版本控制用rebase取代merge_3f7b45]]"
  - "[[sources/分支管理_563fba]]"
tags:
  - "product"
aliases:
  - "Git"
  - "git"
---

## 描述
Git 是一个分布式版本控制系统，是团队协作代码管理的核心工具。在本文档中，Git 作为核心讨论对象，文档详细描述了 rebase 和 merge 操作的标准流程、冲突处理方法以及最佳实践。文中涉及大量 Git 命令，包括 `git rebase`、`git merge --no-ff`、`git push --force-with-lease`、`git submodule update` 等。所有规范都围绕如何在团队（如使用[[entities/飞书|飞书]]的团队）中安全、高效地使用 Git 展开，涵盖误操作恢复、子模块管理、强制推送安全策略等多个方面。此外，Git 作为底层工具，支撑了从 master 拉取分支、分支间合并、打 Tag 发布等全部工作流，分支管理规范中的版本迭代、bug 修复分支创建及灰度上线流程均依赖 Git 的分支操作能力。

## 相关实体
- [[entities/飞书|飞书]]

## 相关概念
- [[concepts/rebase|rebase]]
- [[concepts/merge-no-ff|merge --no-ff]]
- [[concepts/git-submodule|git submodule]]
- [[concepts/git-cherry-pick|git cherry-pick]]
- [[concepts/git-reflog|git reflog]]
- [[concepts/master-分支保护策略|master分支保护策略]]
- [[concepts/频繁-rebase-实践|频繁 rebase 实践]]

## 来源提及

**Source: [[sources/版本控制用rebase取代merge_3f7b45|版本控制用rebase取代merge_3f7b45]]**
- "使用 `--no-ff`（no fast-forward）合并选项时，Git 强制创建一个新的合并提交，即使你进行的变更可以通过"快进"（fast-forward）来合并。"
- "Q：误操作了 rebase 怎么办？ A：立即 `git rebase --abort`"
- "切记 不要用git submodule update --remote （remote 不是固定版本检出）"

> **Source: [[sources/分支管理_563fba|分支管理_563fba]]**
> - "版本迭代或bug修复需从该分支拉出新分支进行开发。"
> - "需要手动将B分支rebase到master，按照顺序一次提测上线形成闭环"