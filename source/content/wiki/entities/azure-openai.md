---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [product]
aliases:
  - "Azure OpenAI Service"
  - "Azure OpenAI 服务"
---


# Azure OpenAI

## 基本信息
- Type: product
- Source: [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]

## 描述
Azure OpenAI 是微软 Azure 云平台上提供的 OpenAI 模型托管服务，为开发者提供 GPT-4 等大语言模型的 API 访问能力。在 [[concepts/可逃逸架构|可逃逸架构]] 设计模式的消防演习测试 A 中，Azure OpenAI 被用作模型切换的起点——测试要求将 Agent 底层模型从 Azure OpenAI 切换到本地部署的 [[entities/Ollama|Ollama]]（Llama 3），以此检验系统架构是否真正实现了 [[concepts/模型无关性|模型无关性]]。Azure OpenAI 在此场景中代表了商业云端模型服务的典型依赖，文章暗示过度依赖此类服务存在供应商锁定风险，需要通过 [[concepts/消防演习|消防演习]] 式的切换演练来确保系统的可逃逸能力。

## 相关实体
- [[entities/Ollama|Ollama]] — 消防演习中 Azure OpenAI 的切换目标
- [[entities/GPT-4|GPT-4]] — Azure OpenAI 托管的核心模型之一
- [[entities/OpenAI|OpenAI]] — Azure OpenAI 服务的底层模型提供方

## 相关概念
- [[concepts/模型无关性|模型无关性]] — Azure OpenAI 切换测试所要验证的核心架构属性
- [[concepts/消防演习|消防演习]] — 以 Azure OpenAI 为起点的模型切换演练方法
- [[concepts/可逃逸架构|可逃逸架构]] — 强调可随时替换 Azure OpenAI 等供应商的设计模式

## 来源提及
- "现在，把你的 Agent 底层模型从 Azure OpenAI 切换到本地部署的 Ollama (Llama 3)。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "合格：更改 .env 配置文件，重启服务，5分钟内恢复运行。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]