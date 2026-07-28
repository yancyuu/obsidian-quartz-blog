---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources:
  - "[[sources/版本控制用rebase取代merge_3f7b45]]"
  - "[[sources/应用开发规范_3bea14]]"
tags:
  - "project"
aliases:
  - "ai-sdk"
  - "AI SDK"
  - "AI软件开发工具包"
---

## 相关实体
- [[entities/common_sdk|common_sdk]]
- [[entities/langchain|langchain]]
- [[entities/langgraph|langgraph]]

## 相关概念
- [[concepts/git-submodule|git submodule]]
- [[concepts/模块解耦|模块解耦]]

## 来源提及

> **来源：[[sources/版本控制用rebase取代merge_3f7b45|版本控制用rebase取代merge_3f7b45]]**
> - "如何更新sdk（common_sdk ai_sdk）"
> - "sdk的修改也会放到版本管理里面，也就是说直接在项目目录下执行下面两行"

> **来源：[[sources/应用开发规范_3bea14|应用开发规范_3bea14]]**
> - "ai_sdk/                 # ai-SDK：如大模型、向量搜索、AI能力封装"
> - "如果需要修改 ai_sdk 或 common_sdk 中的依赖，请分别在各自的 pyproject.toml 文件中进行修改。"
> - "RUN poetry export \        --with ai-sdk,common-sdk \        --format requirements.txt \        --output requirements.txt"