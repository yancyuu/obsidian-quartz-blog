---
type: source
created: 2026-07-28
updated: 2026-07-28
source_file: "[[架构/应用开发规范/版本控制（用rebase取代merge）.md]]"
tags: [architecture, coding-standard, engineering-practice, feishu, git]
aliases: ["Git Rebase 规范", "版本控制规范：用 rebase 取代 merge"]
---

# Git Rebase 工作流规范与最佳实践 - Summary

## 来源
- 原始文件：[[架构/应用开发规范/版本控制（用rebase取代merge）.md]]
- 收录时间：2026-07-28

## 核心内容
本文档是一份关于团队协作开发中 [[concepts/rebase|Rebase]] 与 [[concepts/no-ff-merge|--no-ff merge]] 操作的工程实践规范。文档明确了两条基本原则：**只对自己的本地分支执行 rebase**，以及**主分支永远使用 --no-ff merge 以保留完整历史记录**。通过对比 merge 与 rebase 在提交历史展示上的差异，说明 rebase 能产生更整洁的线性历史。文档还涵盖了标准操作流程、[[concepts/冲突处理|冲突处理]]指南、远程分支变基后的同步策略，以及 [[entities/git|Git]] [[concepts/git-submodule|子模块]]的更新方法，是一份覆盖完整的 Git 协作开发指南。

## 关键实体
- [[entities/git|Git]] — 核心讨论对象，分布式版本控制系统
- [[entities/common_sdk|common_sdk]] — 通过子模块管理的共享开发工具包
- [[entities/ai_sdk|ai_sdk]] — 通过子模块管理的 AI 功能共享开发工具包

## 关键概念
- [[concepts/rebase|Rebase]] — 将当前分支提交基于另一分支最新状态重新应用的方法
- [[concepts/no-ff-merge|--no-ff merge]] — 强制创建合并提交以保留完整历史的主分支合并策略
- [[concepts/force-with-lease|--force-with-lease]] — rebase 后安全强制推送的选项
- [[concepts/git-submodule|Git Submodule]] — 管理外部代码库依赖的机制
- [[concepts/冲突处理|冲突处理]] — 代码冲突解决的标准流程
- [[concepts/git-cherry-pick|Git Cherry-pick]] — 将指定提交重新应用到当前分支的恢复策略
- [[concepts/git-reflog|Git Reflog]] — 找回丢失提交历史的工具
- [[concepts/master-分支保护策略|Master 分支保护策略]] — 主分支代码管理规范
- [[concepts/频繁-rebase-实践|频繁 Rebase 实践]] — 每日同步主分支代码的工作流方法
- [[concepts/git-rebase-i|Git Rebase -i]] — 整理和优化提交历史的交互式变基工具

## 要点
- **只对自己的本地分支执行 rebase**，严禁对主分支和他人正在使用的分支执行 rebase
- **主分支永远使用 --no-ff merge**，以保留完整、可追溯的历史合并记录
- **rebase 前必须先 `git pull`** 获取最新的基准分支代码，确保本地分支基于最新状态变基
- **rebase 后推送必须使用 `--force-with-lease`** 而非普通 push，避免覆盖他人工作
- **[[concepts/git-submodule|子模块]]更新时不要使用 `--remote` 选项**，以免检出非固定版本导致不一致
- **使用 `git reflog` 可以找回** rebase 后丢失的提交，是恢复误操作的重要手段
- **建议每天至少执行一次 rebase**，及早发现并解决冲突，降低集成风险

---