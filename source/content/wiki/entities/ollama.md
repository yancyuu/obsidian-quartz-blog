---
type: entity
created: 2026-07-28
updated: 2026-07-28
sources: ["[[sources/“可逃逸架构”设计模式_4e2181]]"]
tags: [product]
aliases:
  - "Ollama"
  - "本地LLM运行工具"
---


# Ollama

## 基本信息
- Type: product
- Source: [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式_4e2181]]

## 描述
Ollama 是一个用于在本地环境中部署和运行大语言模型的开源工具。它支持多种主流开源模型（如 Llama 3），使开发者能够在私有化环境中完成模型的推理与服务部署，而无需依赖云端 API。在[[concepts/安全与配置管理|安全与配置管理]]和[[concepts/接口不动协议可插拔|接口不动协议可插拔]]的架构实践中，Ollama 常被作为云端模型服务的替代方案，用于验证系统架构的[[concepts/单一职责|单一职责]]解耦能力。通过将模型从云端（如 [[entities/DeepSeek|DeepSeek]]、[[entities/GPT-4|GPT-4]]）切换到本地 Ollama，团队可以检验底层模型变更对业务逻辑的影响是否被最小化。

## 相关实体
- [[entities/DeepSeek|DeepSeek]]
- [[entities/GPT-4|GPT-4]]

## 相关概念
- [[concepts/模型无关性|模型无关性]]
- [[concepts/消防演习|消防演习]]

## 来源提及
- "现在，把你的 Agent 底层模型从 Azure OpenAI 切换到本地部署的 Ollama (Llama 3)。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]
- "合格：更改 .env 配置文件，重启服务，5分钟内恢复运行。" — [[sources/“可逃逸架构”设计模式_4e2181|“可逃逸架构”设计模式]]