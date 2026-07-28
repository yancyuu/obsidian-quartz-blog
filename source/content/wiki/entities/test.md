---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/分支管理_563fba]]"]
tags: [other]
aliases:
  - "测试环境分支"
  - "test分支"
---


# test

## 基本信息
- Type: other
- Source: [[sources/分支管理_563fba|分支管理_563fba]]

## 描述
test 是项目中的测试环境发布分支，承担着所有开发完成并联调提测代码的汇总功能。该分支上的代码会被部署到测试环境，供 QA 团队进行功能测试与回归测试。在多分支并行开发的场景中，多个开发分支需要按照版本号顺序依次合并至 test 分支进行提测或联调。它是开发流程中保证代码质量的关键检查点，在提测通过后，代码会经过 rebase 操作合并至 release 分支进行后续发布流程。

## 相关实体
- [[entities/release|release]]

## 相关概念
- [[concepts/灰度与回滚|灰度与回滚]]
- [[concepts/冲突处理|冲突处理]]
- [[concepts/测试规范|测试规范]]

## 来源提及
- "test|测试环境发布分支，所有开发完成并联调提测的代码合并至该分支，部署到测试环境。" — [[sources/分支管理_563fba|分支管理]]
- "可以按照版本号的顺序依次合并test分支进行（提测或者联调） 然后依次进行合并test rebase 并合并到 release" — [[sources/分支管理_563fba|分支管理]]
- "提测前将代码合并至 test，并部署至测试环境，供QA进行功能与回归测试；" — [[sources/分支管理_563fba|分支管理]]