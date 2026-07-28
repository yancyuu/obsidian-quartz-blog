---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/版本控制用rebase取代merge_3f7b45]]"]
tags: [method]
aliases:
  - "submodule"
  - "子模块"
  - "Git Submodule"
---


# git submodule

## 定义
git submodule 是 Git 版本控制系统中的一种机制，用于在一个主项目仓库中嵌入和管理外部依赖代码库（如 SDK）。通过 submodule，主项目可以记录所依赖的外部库的特定 commit，确保团队成员检出一致的依赖版本。

## 关键特征
- **版本固定性**：submodule 记录的是外部依赖库的特定 commit hash，而非分支或标签，保证所有开发者使用完全一致的依赖版本。
- **嵌套仓库结构**：submodule 本质上是一个独立的 Git 仓库，嵌套在主项目仓库目录中，拥有独立的 `.git` 配置和提交历史。
- **两步初始化流程**：克隆或拉取主项目后，需依次执行 `git submodule init`（初始化本地配置）和 `git submodule update`（检出对应 commit 的代码）才能获取 submodule 内容。
- **变更可追踪**：对 submodule 中代码的修改也会纳入版本管理，可以在主项目中提交对这些变更的引用。

## 应用
- **SDK 版本管理**：在项目中集成 `common_sdk` 和 `ai_sdk` 等外部 SDK 时，使用 submodule 将其作为子仓库管理，确保团队成员使用统一的 SDK 版本。
- **多仓库协作**：当项目依赖多个独立维护的代码库时，submodule 提供了一种轻量级的方式将它们组合在一起，而无需合并为一个巨型仓库。
- **共享公共组件**：多个项目共享同一套公共组件或工具库时，通过 submodule 引用，保持组件代码的单一来源。

## 相关概念
- [[concepts/rebase|rebase]]

## 相关实体
- [[entities/git|Git]]

## 来源提及
- "如何更新sdk（common_sdk ai_sdk）sdk的修改也会放到版本管理里面，也就是说直接在项目目录下执行下面两行" — [[架构/应用开发规范/版本控制（用rebase取代merge）|版本控制（用rebase取代merge）]]
- "git submodule init, git submodule update" — [[架构/应用开发规范/版本控制（用rebase取代merge）|版本控制（用rebase取代merge）]]
- "切记 不要用git submodule update --remote （remote 不是固定版本检出）" — [[架构/应用开发规范/版本控制（用rebase取代merge）|版本控制（用rebase取代merge）]]