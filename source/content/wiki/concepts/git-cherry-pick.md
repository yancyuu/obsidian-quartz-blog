---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/版本控制用rebase取代merge_3f7b45]]"]
tags: [method]
aliases:
  - "cherry-pick"
  - "git cherry-pick"
---


# git cherry-pick

## 定义
`git cherry-pick` 是 Git 中用于将指定的一个或多个提交重新应用到当前分支的方法。在 rebase 冲突处理场景中，当远程分支已被 rebase 但本地仍有未推送的提交时，建议先将本地提交保存到临时分支，重置当前分支到远程最新状态后，再使用 `cherry-pick` 将本地提交逐一应用回来，从而在保留本地工作的同时完成恢复。

## 关键特征
- **选择性应用提交**：可以精确地将某个或某段提交范围（如 `branch~n..branch`）应用到当前分支，而不引入分支上的其他变更。
- **冲突恢复策略的核心工具**：在 rebase 导致历史分歧时，配合临时分支使用，可有效避免本地提交丢失。
- **生成新提交**：cherry-pick 会基于原提交的内容和提交信息在当前分支上创建新的提交（新 commit hash），而非简单移动指针。
- **支持批量操作**：可通过区间语法 `temp-login~n..temp-login` 一次性按顺序应用多个连续提交。

## 应用
- **rebase 冲突恢复**：当远程分支被 rebase 重写历史后，将本地未推送的提交通过 cherry-pick 逐一搬移到已更新至远程最新的分支上。
- **跨分支移植提交**：将某个 bug 修复或功能提交从一个分支精确地应用到另一个分支，而无需合并整个分支。
- **回退后重建**：当分支因操作失误需要 reset 到某个历史点时，先用临时分支保存工作，再 cherry-pick 恢复所需提交。

## 相关概念
- [[concepts/rebase|rebase]]

## 相关实体
- [[entities/git|Git]]

## 来源提及
- "如果你还有本地提交，可先将它们存为临时分支" — [[../../架构/应用开发规范/版本控制（用rebase取代merge）|版本控制（用rebase取代merge）]]
- "git branch temp-login, # 重置后再 cherry-pick 回来, git cherry-pick temp-login~n..temp-login" — [[../../架构/应用开发规范/版本控制（用rebase取代merge）|版本控制（用rebase取代merge）]]