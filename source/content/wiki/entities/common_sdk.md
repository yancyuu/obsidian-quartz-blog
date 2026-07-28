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
  - "common-sdk"
  - "共享SDK"
---

## 相关实体
- [[entities/ai_sdk|ai_sdk]]
- [[entities/python|Python]]

## 相关概念
- [[concepts/git-submodule|git submodule]]
- [[concepts/模块解耦|模块解耦]]
- [[concepts/模块化先于服务化|模块化先于服务化]]

## 来源提及

> **来源：[[sources/版本控制用rebase取代merge_3f7b45|版本控制用rebase取代merge_3f7b45]]**
> - "sdk的修改也会放到版本管理里面，也就是说直接在项目目录下执行下面两行"
> - "切记 不要用git submodule update --remote （remote 不是固定版本检出）"

> **来源：[[sources/应用开发规范_3bea14|应用开发规范_3bea14]]**
> - "common_sdk/             # 通用工具：日志、异常、鉴权、数据库连接池等可复用模块"
> - "common_sdk/ai_sdk中不要做任何实例的创建，都在app中进行实例的创建。"
> - "正确应该在app中创建utils然后实例化，因为不同app实例化配置可能不同，common_sdk中的client需要保持通用且可配置。"