---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/版本控制用rebase取代merge_3f7b45]]"
  - "[[sources/分支管理_563fba]]"
tags:
  - "method"
aliases:
  - "变基"
  - "git rebase"
---

## Related Concepts
- [[concepts/merge-no-ff|merge --no-ff]]
- [[concepts/冲突处理|冲突处理]]
- [[concepts/force-with-lease|--force-with-lease]]
- [[concepts/git-cherry-pick|git cherry-pick]]
- [[concepts/master-分支保护策略|master 分支保护策略]]
- [[concepts/频繁-rebase-实践|频繁 rebase 实践]]

## Related Entities
- [[entities/git|Git]]

## Mentions in Source

> **来源：[[sources/版本控制用rebase取代merge_3f7b45|版本控制（用rebase取代merge）]]**
> - "只 rebase 自己的本地分支（比如自己的开发分支dev，dev_intention等）（千万别动别人在用的分支）"
> - "rebase 就像把你们的修改按时间顺序整齐抄写到最新版本上"
> - "每天开始工作前：git checkout master, git pull, git checkout feature/login, git rebase main  # 把主分支更新合并到你的分支"

> **来源：[[sources/分支管理_563fba|分支管理]]**
> - "然后依次进行合并test rebase 并合并到 release"
> - "需要手动将B分支rebase到master，按照顺序一次提测上线 形成闭环"