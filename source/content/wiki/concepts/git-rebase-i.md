---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/版本控制用rebase取代merge_3f7b45]]"]
tags: [method]
aliases:
  - "interactive rebase"
  - "交互式变基"
---


# git rebase -i

## 定义
`git rebase -i`（交互式变基）是 Git 中用于整理和优化提交历史的强大工具。它允许开发者在推送代码前，以交互式方式对一系列提交进行合并、重排、修改提交信息等操作，从而保持提交历史的清晰和有意义。文档将其列为 Git 工作流的最佳实践之一。

## 关键特征
- **交互式操作**：启动后会打开文本编辑器，列出指定范围内的所有提交，供用户逐条选择操作方式
- **提交整理能力**：支持 squash（合并提交）、reword（修改信息）、reorder（重排顺序）、drop（丢弃提交）等多种操作
- **历史线性化**：通过变基重写提交历史，避免不必要的合并提交，使提交记录呈现清晰的线性结构
- **推送前最佳实践**：建议在本地完成提交整理后再推送到远程仓库，避免影响协作者

## 应用
- 开发者在完成一个功能后，将多个细碎的 WIP（Work In Progress）提交合并为一个有意义的提交
- 修正历史提交中的拼写错误或补充更清晰的提交信息
- 在代码评审（Code Review）前，整理提交历史使其更易于审阅
- 将某个分支上的提交重新排列，以便于选择性合并或回滚

## 相关概念
- [[concepts/rebase|rebase]]
- [[concepts/merge-no-ff|merge-no-ff]]
- [[concepts/force-with-lease|force-with-lease]]
- [[concepts/git-cherry-pick|git-cherry-pick]]

## 相关实体
*暂无相关实体*

## 来源提及
- "使用 `git rebase -i` 整理提交记录" — [[sources/版本控制用rebase取代merge_3f7b45|版本控制用rebase取代merge_3f7b45]]