---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/版本控制用rebase取代merge_3f7b45]]"
  - "[[sources/分支管理_563fba]]"
tags:
  - "standard"
aliases:
  - "主分支保护"
  - "master 分支管理规范"
  - "master分支保护策略"
---

## Description
master 分支保护策略是团队代码治理的核心基石，涵盖历史保护与合并来源控制两个维度。在历史保护方面，主分支永远使用 `--no-ff merge` 以保留完整历史记录，严禁对主分支执行 `rebase` 操作，从而确保团队代码历史的可追溯性和一致性。在合并来源方面，master 分支始终保持干净，仅用于正式版本发布，仅接受来自 release 分支的合并，避免因开发失误造成代码污染。主分支作为所有开发的基准分支，任何版本迭代或 bug 修复都应从该分支拉出新分支进行开发，并在发布完成且回归测试无误后，方可将内容合并至 master。通过严格控制合并来源与保留合并节点，该策略使主分支始终代表生产环境的稳定状态。

## Related Concepts
- [[concepts/merge-no-ff|--no-ff merge]]
- [[concepts/rebase|rebase]]
- [[concepts/冲突处理|冲突处理]]
- [[concepts/频繁-rebase-实践|频繁 rebase 实践]]
- [[concepts/git-rebase-i|git rebase -i（交互式变基）]]

## Related Entities
- [[entities/git|Git]]

## Mentions in Source

> **Source: [[sources/版本控制用rebase取代merge_3f7b45|版本控制（用rebase取代merge）]]**
> - "主分支（master）永远用 --no-ff merge（为了保留完整的历史记录）。"
> - "主分支（master）这是基准分支，不需要动"

> **Source: [[sources/分支管理_563fba|分支管理]]**
> - "master|主分支，保持干净，仅用于正式版本发布。版本迭代或bug修复需从该分支拉出新分支进行开发。"
> - "master 分支始终保持干净，仅接受来自 release 的合并，避免因开发失误造成污染。"
> - "发布完成并回归测试无误后，将该分支内容合并至 master。"