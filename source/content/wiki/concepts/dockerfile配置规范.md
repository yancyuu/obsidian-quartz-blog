---
type: concept
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/应用开发规范_3bea14]]"]
tags: [standard]
aliases:
  - "Docker构建规范"
  - "容器化部署规范"
---


# Dockerfile配置规范

## 定义
该规范定义了标准化的两阶段 Docker 构建流程：第一阶段使用 Poetry 导出 `requirements.txt`，第二阶段使用 pip 安装依赖以获得更轻量的运行时镜像。配置包括设置 Debian 和 PyPI 国内镜像源加速、配置时区为 `Asia/Shanghai`、创建非 root 用户 `appuser` 运行应用、设置环境变量等。Dockerfile 在不同项目间保持统一，唯一不同的是项目名称。

## 关键特征
- **两阶段构建**：第一阶段（builder）用 Poetry 导出依赖列表，第二阶段用 pip 安装，剥离 Poetry 运行时以减小镜像体积
- **镜像源加速**：配置 Debian apt 和 PyPI 的国内镜像源，提升构建速度
- **非 root 用户运行**：创建 UID 为 5678 的 `appuser`，提升容器运行安全性
- **统一时区**：设置 `Asia/Shanghai` 时区，保证日志和时间戳一致性
- **跨项目一致性**：所有项目共用同一套 Dockerfile 模板，仅项目名称不同，降低维护成本

## 应用
- 企业级 Python 应用的容器化打包与部署
- CI/CD 流水线中的标准化镜像构建环节
- 多项目微服务架构下的统一容器构建规范，确保构建行为一致

## 相关概念
- [[concepts/依赖管理规范|依赖管理规范]]
- [[concepts/配置驱动|配置驱动]]

## 相关实体
- [[entities/poetry|Poetry]]
- [[entities/gunicorn|gunicorn]]

## 来源提及
- "**Dockerfile** 配置保持统一，唯一不同的是项目名称。其他配置无需修改。" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "# 推荐方案：Poetry 导出 + pip 安装" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "创建非 root 用户\n    RUN adduser -u 5678 --disabled-password --gecos \"\" appuser && chown -R appuser /app" — [[sources/应用开发规范_3bea14|应用开发规范]]