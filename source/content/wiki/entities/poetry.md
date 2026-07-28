---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/应用开发规范_3bea14]]"]
tags: [product]
aliases:
  - "Python Poetry"
  - "Poetry 依赖管理工具"
---


# Poetry

## 基本信息
- Type: product
- Source: [[sources/应用开发规范_3bea14|应用开发规范]]

## 描述
Poetry 是 Python 项目的依赖管理工具，在应用开发规范中被指定为标准的依赖包管理方案。所有包版本固定在 `pyproject.toml` 文件中，开发者通过 `poetry install` 命令安装依赖。在 Docker 构建流程中，采用两阶段策略：首先使用 Poetry 导出完整的 `requirements.txt` 文件，随后在运行时镜像中通过 pip 安装，从而实现更轻量的生产镜像。该工具同时兼顾开发环境的可复现性与生产部署的轻量化需求。

## 相关实体
- [[entities/python|Python]]

## 相关概念
- [[concepts/依赖管理规范|依赖管理规范]]

## 来源提及
- "固定依赖包版本，写入 **`pyproject.toml`**：** 使用 **Poetry** 管理项目依赖，所有包的版本固定在 `pyproject.toml` 文件中" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "使用 **Poetry** 安装依赖包，命令如下：poetry install" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "# 第一阶段：使用 Poetry 导出完整的 requirements.txt" — [[sources/应用开发规范_3bea14|应用开发规范]]