---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/应用开发规范_3bea14]]"]
tags: [product]
aliases:
  - "pytest-asyncio"
  - "pytest 测试框架"
---


# pytest

## 基本信息
- Type: product
- Source: [[sources/应用开发规范_3bea14|应用开发规范]]

## 描述
pytest 是 Python 生态中最流行的测试框架之一，以简洁的语法和强大的断言机制著称。在本代码规范中，pytest 被明确指定为编写异步单元测试的标准工具，需配合 pytest-asyncio 插件来处理异步测试用例。测试文件统一组织在 `tests/` 目录下，例如 `test_kb_service.py` 和 `test_user_controller.py`，以保持项目结构的一致性和可维护性。

## 相关实体
- [[entities/python|Python]]

## 相关概念
- [[concepts/测试规范|测试规范]]

## 来源提及
- "使用 `pytest + pytest-asyncio` 编写异步单元测试。" — [[sources/应用开发规范_3bea14|应用开发规范]]
- "tests/ ├── test_kb_service.py └── test_user_controller.py" — [[sources/应用开发规范_3bea14|应用开发规范]]