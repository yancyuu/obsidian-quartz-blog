---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/应用开发规范_3bea14]]"]
tags: [method]
aliases:
  - "RPC风格命名规范"
  - "模块即命名空间"
  - "RPC-style Routing"
---


# RPC风格路由

## 定义
RPC 风格路由是一种后端接口定义的统一规范，基于 HTTP/Sanic + JSON 实现。它通过统一路径前缀和模块化命名（如 `POST /kb/get`、`POST /kb/create`），使前端或其他服务能够通过"模块名 + 操作名"直观地调用对应 URL，从而提高接口的易读性和可维护性。

## 关键特征
- **模块即命名空间**：按业务模块（如 KB、Policy、User）划分路由命名空间，路径结构清晰直观
- **统一路径前缀**：在 `service/http/` 目录下，每个模块通过 Sanic Blueprint 定义路由，保持一致的路径前缀
- **操作语义明确**：URL 路径采用"模块名 + 操作名"格式（如 `/kb/create`），调用方无需关心实现细节
- **基于 HTTP + JSON**：使用 HTTP 协议传输，请求与响应均采用 JSON 格式，兼具可读性与通用性
- **支持版本迭代**：便于未来通过添加路径前缀（如 `/v2/`）进行接口版本管理

## 应用
- 后端微服务或单体应用中，为前端提供统一的 API 调用入口
- 多服务间通信，调用方仅凭"模块名 + 操作名"即可定位目标接口
- 团队协作开发中，降低接口沟通成本，新成员可快速理解 API 结构
- 接口版本演进时，通过路径前缀平滑迁移，不影响存量调用

## 相关概念
- [[concepts/单一职责|单一职责]]
- [[concepts/接口不动协议可插拔|接口不动协议可插拔]]

## 相关实体
- [[entities/Python|Python]]

## 来源提及
- "按模块做命名空间（RPC 风格命名规范）HTTP/Sanic + RPC + JSON" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "统一路径前缀：在 service/http/ 目录下，为每个模块（如 KB、Policy、User）用 Sanic Blueprint 定义 RPC 风格的路由" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "模块即命名空间：前端或其他服务只需根据"模块名 + 操作名"调用对应 URL，无需关心实现细节。" — [[sources/应用开发规范_3bea14|应用开发规范]]