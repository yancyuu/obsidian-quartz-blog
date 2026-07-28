---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [product]
aliases:
  - "Selenium WebDriver"
  - "Selenium自动化测试框架"
---


# Selenium

## 基本信息
- Type: product
- Source: [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式_4e2181]]

## 描述

Selenium 是一个经典的开源浏览器自动化测试工具，在[[concepts/可逃逸架构|可逃逸架构]]设计模式中被推荐为「Code-First RPA」策略的优选方案之一，与 [[entities/Playwright|Playwright]] 并列。作者主张，对于老旧系统或无接口的黑盒系统，应优先使用 Selenium 这类可以通过代码管理、纳入 Git 版本控制和 CI/CD 流程的自动化工具，而非低代码 RPA 平台。这一建议是[[concepts/可逃逸架构|可逃逸架构]]在存量系统改造场景下的具体应用：通过选择可代码化的工具，确保自动化流程不会被锁定在无法版本控制的平台中，从而保留未来替换和演化的能力。

## 相关实体
- [[entities/Playwright|Playwright]]

## 相关概念
- [[concepts/Code-First-RPA|Code-First RPA]]
- [[concepts/可逃逸架构|可逃逸架构]]

## 来源提及
- "Code-First RPA：优先使用 Playwright/Selenium 等开源代码库。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "严禁低代码：严禁使用无法导出源码、无法 Git 管理、无法 CI/CD 的可视化 RPA 工具。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]