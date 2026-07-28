---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/应用开发规范_3bea14]]"]
tags: [product]
aliases:
  - "Gunicorn"
  - "Green Unicorn"
---


# gunicorn

## 基本信息
- Type: product
- Source: [[sources/应用开发规范_3bea14|应用开发规范]]

## 描述
Gunicorn 是一个被广泛使用的 Python WSGI HTTP 服务器。它采用 pre-fork worker 模型，能够高效地处理来自 Web 服务器的并发请求并将其转发给 Python 应用。在[[concepts/Dockerfile配置规范|Dockerfile配置规范]]的实践中，Gunicorn 被用作生产环境的应用服务入口，通过 `config.py` 配置文件来定义运行参数，并启动 `main:app` 作为应用实例。它常与 [[entities/python|Python]] Web 框架（如 Flask、Django）搭配使用，是 Python 应用容器化部署的核心组件。

## 相关实体
- [[entities/python|Python]]

## 相关概念
- [[concepts/Dockerfile配置规范|Dockerfile配置规范]]

## 来源提及
- "CMD ["gunicorn", "-c", "config.py", "main:app"]" — [[sources/应用开发规范_3bea14|应用开发规范]]