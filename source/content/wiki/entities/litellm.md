---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [product]
aliases:
  - "LiteLLM"
  - "LLM Gateway"
  - "AI模型网关"
---


# LiteLLM

## 基本信息
- Type: product
- Source: [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]

## 描述
LiteLLM 是一个 AI 模型网关/代理工具，在「可逃逸架构」设计模式中被推荐为实现[[concepts/模型无关性|模型无关性]]原则的关键基础设施。作者要求所有大模型调用必须通过 LiteLLM 或类似的网关层进行，而不是在业务代码中直接硬编码特定模型的 API 调用。这一做法使得团队能够在不修改业务代码的前提下，通过修改配置即可快速切换底层大模型供应商（如从 GPT-4 切换到 DeepSeek 等国产模型），是「可逃逸架构」四大原则中模型无关性的核心实现手段。与 [[entities/OneAPI|OneAPI]] 类似，LiteLLM 充当了应用层与模型层之间的[[concepts/模型路由|模型路由]]中介。

## 相关实体
- [[entities/DeepSeek|DeepSeek]] — 可通过 LiteLLM 网关接入的国产大模型之一
- [[entities/GPT-4|GPT-4]] — 可通过 LiteLLM 网关接入的 OpenAI 旗舰模型
- [[entities/OneAPI|OneAPI]] — 同类 AI 模型网关工具，功能与 LiteLLM 类似

## 相关概念
- [[concepts/模型无关性|模型无关性]] — LiteLLM 所支撑的核心架构原则
- [[concepts/可逃逸架构|可逃逸架构]] — LiteLLM 作为关键基础设施服务于该架构模式
- [[concepts/模型路由|模型路由]] — LiteLLM 网关层的核心能力之一

## 来源提及
- "必须通过 OneAPI / LiteLLM 等网关层调用。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "切换到国产模型，是改一行配置（Config），还是要去改代码？改代码即不合格。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]