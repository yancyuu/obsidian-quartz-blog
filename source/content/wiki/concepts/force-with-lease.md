---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/版本控制用rebase取代merge_3f7b45]]"]
tags: [method]
aliases:
  - "force-with-lease"
  - "git push --force-with-lease"
  - "安全强制推送"
---


# --force-with-lease

## 定义
`--force-with-lease` 是 Git 中用于在执行 `rebase`（变基）操作后进行安全强制推送的命令选项。由于 rebase 会重写提交历史，导致本地与远程分支的 commit 不再线性一致，普通的 `git push` 会被远程仓库拒绝，因此必须使用强制推送。与普通的 `--force` 不同，该选项会在检测到远程分支存在他人新提交时主动拒绝推送，从而防止覆盖协作者的工作成果。

## 关键特征
- **安全性保障**：在推送前检查远程分支是否有他人新的提交，若有则拒绝推送，避免盲目覆盖。
- **适用于变基场景**：专门用于解决 `git rebase` 后本地 commit 历史被重写，无法通过常规 push 同步的问题。
- **优于 --force**：相比直接使用 `--force`，它提供了一种"租约"机制，确保不会因为本地引用过期而误删远程新增代码。

## 应用
在团队协作开发中，当开发者完成了 `rebase` 操作（例如拉取了主干最新代码并重新排列了自己的提交）后，需要将本地分支推送到远程仓库时，应始终使用 `git push origin <branch-name> --force-with-lease` 替代普通的 `--force`，以确保不会意外覆盖其他团队成员推送的代码。

## 相关概念
- [[concepts/rebase|rebase]]

## 相关实体
- [[entities/Git|Git]]

## 来源提及
- "git push origin feature/login --force-with-lease # 注意必须强制推送！为什么？因为你变了基，不强制推送推不了。" — [[架构/应用开发规范/版本控制（用rebase取代merge）|版本控制（用rebase取代merge）]]
- "git push origin feature/login --force-with-lease" — [[架构/应用开发规范/版本控制（用rebase取代merge）|版本控制（用rebase取代merge）]]