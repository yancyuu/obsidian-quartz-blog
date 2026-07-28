---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/版本控制用rebase取代merge_3f7b45]]"]
tags: [method]
aliases:
  - "reflog"
  - "git reflog"
  - "引用日志"
---


# git reflog

## 定义
git reflog 是 Git 中用于追踪和找回 HEAD 引用变动历史的工具。它记录了本地仓库中每一次 HEAD 指针的移动（包括 commit、rebase、reset、checkout 等操作），即使提交被丢弃或分支被删除，reflog 中仍然保留其记录，因此是恢复误操作、找回丢失提交的重要手段。

## 关键特征
- 记录 HEAD 及其他引用的所有变动轨迹，包括被 rebase 或 reset 丢弃的提交
- 仅存在于本地仓库，不会被 `git push` 同步到远程
- 默认保留时间为 90 天（对于不可达提交为 30 天），过期后会被 `git gc` 自动清理
- 每条记录包含引用变动的索引标识（如 `HEAD@{0}`、`HEAD@{1}`），便于精确定位历史状态
- 是操作撤销与事故恢复的最后一道安全网

## 应用
- **rebase 后恢复提交**：当 `git rebase` 导致原始提交丢失时，通过 `git reflog` 找到 rebase 前的 HEAD 位置，再使用 `git reset --hard` 恢复
- **误删分支恢复**：分支被删除后，可通过 reflog 找到该分支最后一次指向的提交，重新创建引用
- **撤销 reset 操作**：`git reset --hard` 误操作后，reflog 可帮助回退到 reset 之前的状态
- **审计操作历史**：查看本地仓库中所有引用级别的操作记录，用于排查问题

## 相关概念
- [[concepts/rebase|rebase]]

## 相关实体
- [[entities/Git|Git]]

## 来源提及
- "Q：rebase 后找不到之前的提交？ A：用 `git reflog` 找回历史记录" — [[sources/版本控制用rebase取代merge_3f7b45|版本控制用rebase取代merge_3f7b45]]