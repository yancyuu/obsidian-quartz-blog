---
tags:
  - architecture
  - design-proposal
  - feishu-import
---

# AI Agent 系统架构设计

# AI Agent 系统架构设计

## 架构概述

本架构为企业级 AI Agent 架构，采用\*\*领域驱动单体架构 + 弹性分布式部署\*\*模式，旨在快速验证业务价值，同时保持架构的可演进性。  

## 系统分层架构

![图片展示了AI Agent系统分层架构。从应用视角接收API调用，经Agent处理后，数据存储和业务系统分离。业务系统包括现有业务系统、操作任务系统等。Agent处理后，数据存储有Redis、PostgreSQL等，业务系统有Lark、JIRA等。系统还包含工具适配、与业务系统适配、与AI引擎适配等模块，如工具适配有ACP生产端后台、API经验工具等，与AI引擎适配有推理引擎、推理服务等。该图与上下文介绍的架构概述及分层架构内容相呼应。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGQ0ZjRmOTc5M2ZmNTZmNDE3ODdmMzNjMjNkYzNiZWVfNmFhYjdhY2UzMTljOTQwYjNkNTc4YWE0ZTIxNWIzYTdfSUQ6NzYxMTA3MzQ2Mzc3OTk3MDIyOF8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)



## 应用层架构  

![图片展示了AI Agent系统架构设计的应用层架构。从APP/Web和飞书/飞书工作台的用户流量出发，经应用网关（含API网关、用户鉴权）后，进入Agent网关。Agent网关后是Agent运行时（DDoS+分布式部署），包含管理Agent（Agent/Marketing）和产品Agent（Agent/Product），分别处理知识查询、知识问答、评估、意图识别、提示词工程、工具集成等功能。此外，还有工具适配层，如产数API、以图识物等，以及模型层，包括LLM、LMA、ASR等。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTE5ZWUyYThiYTA1NWFiNzViZGY1MzMxMTllYjFmZmZfMjU5Mjc4ZjlkOGNhNjEyMGM1Mjk0YTcyNzBmYTVhY2FfSUQ6NzYxMTA3MzMwMTkwOTIyODQ4N18xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

  

### 架构风格与核心原则

#### 为什么选择领域驱动单体而非微服务？

| 对比维度 | 传统微服务 | 本项目选型 |
|-|-|-|
| 并发模型 | 请求-响应，并发均匀 | GPU计算并发 + 物理链路并发，差异巨大 |
| 部署复杂度 | 高，需要服务治理 | 低，单体快速迭代 |
| 团队规模 | 需要成熟 DevOps 团队 | 人力有限，聚焦业务验证 |
| 扩展性 | 按服务独立扩展 | 按领域弹性扩展 |

**核心** 

AI Agent 的流量并发计算与传统软件设计不同：  
\- **GPU 计算并发**\* 模型推理的并行度，受显存和算力限制  
\- **物理链路并发**: Agent 到工具/模型的网络连接数  
\- **场景差异**: 不同 Agent（客服/营销/产品）在不同场景下并发需求差异极大  

设计原则  
1. **快速验证优先**: 前期聚焦业务价值验证，架构可演进  
2. **领域驱动**: 按业务域划分模块，而非技术层  
3. **弹性部署**: 单体架构，但可按域独立扩缩容  
4. **工具可读性**: 保证工具接口清晰，便于后续迁移到 MCP  

### 领域划分

┌─────────────────┐  
│                  Agent Runtime (单体)                │  
├─────────────────┤  
│     客服域       │     营销域       │     产品域       │  
│  Customer    │   Marketing     │    Product      │  
├─────┼────────┼──────┤  
│ - 智能问答       │ - 内容生成       │ - 需求分析       │  
│ - 工单处理       │ - 活动策划       │ - 竞品调研       │  
│ - 投诉处理       │ - 用户触达       │ - 功能设计       │  
│ - 知识检索       │ - 数据分析       │ - 文档生成       │  
└─────┴─────┴─────────┘  

## 引入AI 网关

### AI 网关定位

作为企业级 AI 流量中枢，网关负责：

- 流量路由：Model API / Agent API / MCP 工具的统一入口
- 流量治理：Token 级限流、消费者级别限流、并发控制
- 安全防护：消费者鉴权、AI 安全护栏、审计追溯
- 计量计费：按消费者维度统计 Token 消费

![图片展示了AI网关Nigress的核心价值架构。左侧为客户端，有Model API、Agent API、应用等。中间是AI网关，包含MCP服务、Agent API、Model API等，如REST to MCP、Agent代理、多模型流量分发等。右侧是后端服务，有模型、Agent、传统服务&MCP服务等，如Qwen、Deepseek、Dify等。该图与上下文紧密相关，直观呈现了AI网关作为企业级AI流量中枢的功能与架构，包括流量路由、治理、安全防护、计量计费等。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2QzMDgzMTkwMjVmYWI0M2Y3ZTdmNzhiM2I4NGNjMWRfMzRmZTI4ZmQwNzM4NDU2ZjE0MjgzNmNmZWY3MTJjMDRfSUQ6NzYxMTA3Mjg0NzI2ODQxNjczOF8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

  
作为企业级 AI 流量中枢，网关通过服务动态感知后端资源变化，实现流量路由、治理和安全防护的统一管理。

### 消费者模型

设计原则：消费者按"身份类型"划分，不按"服务实例"划分

| 消费者类型          <br/>          <br/>          <br/>        | 粒度建议 | 示例 | 命名规则 |
|-|-|-|-|
| 内部服务 | 按领域类型 | agent-customer，agent-product，agent-marketing。 | agent-{domain} |
| 内部测试 | 按部门 | test-product | test-{dept} |
| 业务应用 | 按业务系统 | biz-openwebui，biz-tianrun，biz-feishu | biz-{system} |

避免：同一类型的多个实例创建多个消费者（会导致消费者爆炸）



### 消费者鉴权配置

**多租户的情况，使用AI网关中的jwt鉴权方式，一般应用层都需要使用这种方式，比如 agent-customer，agent-product，agent-marketing ,  JSON Web Token (JWT) 用于在客户端和服务端之间以JSON对象的形式安全地传输信息。**

**目前所有的消费者都有apikey的认证方式，暂时只有biz-feishu有jwt鉴权的方式(为了满足企业内部快捷字段使用需要分到部门和人的问题)**

**消费者配置apikey还是jwt基于如下原则：**

<bitable table-id="tblOnUj5tSrNYNIZ" token="XICMbrDhgadW08slV66cruCBnqb"></bitable>

### 接入流程

- 初始化 Agent 内部 API Key

└── poetry run python -m scripts.init_system

- 将 Agent 添加到网关（作为外部服务） 

![图片展示的是AI Agent系统中服务管理界面。界面上方有“服务”和“来源”两个选项卡，当前选中“服务”。下方列表显示了多个服务，如marketing-agent-prod、product-agent-prod等，每项服务有服务名称、健康检查状态、服务地址、端口、服务来源、命名等信息，如marketing-agent-prod的健康检查状态为健康，服务地址为http://47.111.97.84，端口为8001，服务来源为Agent服务。列表右侧有“编辑”和“健康检查配置”操作选项。该图与上下文介绍的将Agent添加到网关（作为外部服务）的流程相关，展示了服务管理界面。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2M1ZTVlM2UyZmQ5NjU2ZTZhNDkyYjM4Mzg3MWJmNzJfNGQzNTNjZjFlNzAyYjNhNDJjNGZjMDExYmVlOTFjNTBfSUQ6NzYyMDM0MDM3NDExNjY0OTkyOV8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

- 申请消费者

└── 联系 <cite type="user" user-id="ou_188ea43430d6d9cc985f593cfdfa855a" user-name="yancy(于晓婕)"></cite> 申请

└── 获取消费者 API Key   

![图片展示的是AI Agent系统中消费者管理界面。界面上方有“消费者”标题，下方提示消费者是客户端访问API的凭证，启用消费者需舂需在对应接口/路由中开启消费者认证，并创建消费者与接口/路由的授权关系。列表中显示了多个消费者信息，如消费者名称、状态、创建时间、描述及操作（停用、删除），如agent - marketing、biz - openwebui等，其中biz - feishu被红色框突出显示。该图片与文档中消费者配置相关，直观呈现了消费者管理的具体情况。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWFlNGVmMGZkOTg3MWQ0NDJlMThkZGNhZjlmNjAzNzVfNDdiYjMzM2ZmZTJmMGRlNGE3NjU1YTI5ODc5MTRiMTNfSUQ6NzYyMDQwMTA2MTc0ODI4MDUxMF8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

- 调用时使用该 API Key 鉴权

### 网关核心能力  

![图片展示了AI网关的访问模式架构。左侧为用户，可访问Model API、MCP Server、Agent API。右侧是AI网关，进行主被动健康检测，可访问AI服务、Agent服务、容器服务、Nacos服务、DNS服务、固定地址、SAE服务、FC服务、计算巢MCP服务。该图与上下文紧密相关，直观呈现了AI网关在模型访问、工具访问、Agent访问等场景下的访问模式及服务类型，是对AI网关核心能力中访问模式部分的图示说明。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjlhMDAxY2ExNGM2NWRkNWI0OTIyMTg5MzI1YmIzNWJfZWU0ZDZjMGFlNjlmNDdmYTc1MDc5ZDgxOWQwNWNjMGZfSUQ6NzYxMTA3NDc3MjI1NjM0NTI3NF8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

| 能力 \| | 描述 |
|-|-|
| 多模型统一代理 | Qwen、Deepseek、百炼、私有模型 |
| MCP智能协议转换 | REST to MCP、HTTP to MCP |
| 模型 Fallback | 主模型不可用时自动切换 |
| AI 安全护栏 | Prompt 注入检测、内容审核、敏感信息过滤 |
| Token 计量计费 | 按 Token 消费计费，支持配额管理 |
| 流量路由 | 按 Agent/场景/模型智能路由 |

支持的后端服务类型  
\- AI 服务（模型）✅  
\- Agent 服务✅  
\- 容器服务✅  
\- MSE Nacos 服务  
\- DNS 域名  
\- 固定地址  
\- SAE Kubernetes 服务  
\- 函数计算 FC  
\- MCP 服务✅  

### AI 网关访问模式

#### 模型访问

![图片展示了AI网关的架构。左侧为用户，右侧是AI网关，包含SSL证书、IP黑名单、消费者鉴权、Model API、API-KEY管理、WAF防护等。中间有搜索增强、观测&评测、限流、缓存等模块，以及KMS、AI安全护栏。右侧有qwen、deepseek等模型，分别指向PAI上自建模型、FC上自建模型等。该图直观呈现了AI网关的组成部分及模型访问流程，与上下文介绍的AI网关核心能力、访问模式等内容相呼应。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGEyMWJhYmQ5MjFlNWI0YWFhZTRkNjZjN2UzZDJjNjVfZWI0MmRjYjMwM2Y1ZTZkYTgzZWZkNzgxODQ2MDhhYjhfSUQ6NzYxMTA3NTc2NjkwMTc4NzU3OV8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

####   
工具访问

![图片展示了AI网关的访问模式架构。左侧为用户，通过SSE + HTTP、StreamableHTTP访问。中间是AI网关，包含SSL证书、IP黑名单、消费者鉴权、WAF防护、MCP Server、后端服务鉴权、观测&评测、限流、密钥等组件。右侧有Nacos AI Registry、存量HTTP服务、托管MCP Server。底部有SLS、Redis、KMS。该图与上下文介绍的AI网关访问模式相关，直观呈现了模型、工具、Agent等访问时的架构组成及数据流向。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDEwZGRjZTE0MTJmODk0Y2U1ZjQ1YmUxN2I1ZmEzYzhfMTE2YTE3NjJjYjk2NzQ2ZTFjMTIwZGI3MWNlZGM5OTFfSUQ6NzYxMTA3NTgxNjA2NDA0NDIzNV8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

####   
Agent 访问  

![图片展示了AI网关的访问模式架构。左侧有人物图标，经SSL证书、IP黑名单、消费者鉴权、WAF防护等安全措施后，进入AI网关。网关内有灰度发布、主被动健康检测、Proxy、A2A、REST to A2A等功能。右侧有Nacos AI Registry，网关与低代码、高代码、存量HTTP应用等交互，下方还有SLS、Redis、KMS等组件。该图与上下文介绍的AI网关访问模式相关，直观呈现了模型、工具、Agent等访问AI网关的流程及涉及的安全与功能模块。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDQwNmVkNDQ3Y2YyYzg3MTAwNjg5ZWUwN2U3ZTAxMzFfMjFhYmYyMzA5NDU0Yjc1NTgzZTQ5OTNjYjk5MDFmYWVfSUQ6NzYxMTA3NjAzMjY4NjM2MTUzMV8xNzg1MzIxNjI0OjE3ODUzMjUyMjRfVjM)

## 部署环境选型：FC vs K8s

### 决策矩阵

| 维度 | FC (函数计算) | K8s (容器服务) |
|-|-|-|
| 适用场景 | 事件驱动、流量波动大、快速验证 | 稳定高负载、内控要求、深度自定义 |
| 冷启动 | 有冷启动延迟 | 无冷启动问题  |
| GPU 支持 | 有限 | 完整支持（GPU/MIG/私有 LVM） |
| 合规性 | 公有云 | 可专有网络/专有集群 |
| 运维成本 | 低，Serverless | 高，需要容器团队 |
| 成本模型 | 按调用计费 | 按资源预留计费 |

### 本项目选择：K8s

理由:

- skg 已有成熟的 K8s 运维体系
- 后续需要部署私有模型（GPU 调度）
- 内网合规要求
- 长期稳定运行的高性价比  

何时考虑 FC？

- 快速验证新 Agent 场景
- 突发性流量（Scale-to-Zero）
- 事件驱动型任务（队列/对象存储触发）  
  

## 并发模型设计

### 双层并发模型

- 并发参数定义

| Agent 类型 | GPU 计算并发  | 物理链路并发 | 说明 |
|-|-|-|-|
| 客服 Agent | 8-16 | 32-64 | 高频问答，工具调用多 |
| 营销 Agent  | 4-8 | 16-32 | 内容生成为主，调用适中 |
| 产品 Agent | 2-4 | 8-16  | 深度分析，单次推理长 |



## MCP 策略

### 阶段规划

| 阶段 | 策略 | 说明 |
|-|-|-|
| 前期 | API 直接调用 | 工具以 API 形式提供，保证接口清晰可读 |
| 中期 | 局部 MCP 化 | 核心工具封装为 MCP Service |
| 后期 | MCP Registry  | MSE Nacos 统一管理，存量业务 0 改造 |

### 工具开发规范

确保api可读性强

  
MSE Nacos + MCP Registry（后期规划）

<readonly-block type="isv"></readonly-block>





## 飞书集成策略

### 前期：

Faas Node 层验证  
飞书用户 → 飞书 Faas (Node.js) → Agent Runtime → 工具/模型  
                │  
               └── 业务逻辑(部分)  
  
**适用场景**:

- 产品初期验证
- 快速迭代需求
- 飞书特有的上下文处理

###   
成熟期：

迁移到 Runtime

<readonly-block type="isv"></readonly-block>



## Agent Runtime 核心组件

### 数据存储选型

|  存储类型 | 技术选型 | 用途 |
|-|-|-|
| 缓存/分布式锁 | Redis | Session、限流计数、分布式锁 |
| 关系数据库 | PostgreSQL | 用户、配置、审计日志 |
| 向量数据库 | Qdrant | 知识库 Embedding、语义检索 |

## 开发规范

### 命名规范

```Plain Text
# API 路由
/agent/{domain}/{action}
例如: /agent/customer-service/query, /agent/marketing/generate

# 工具命名
{动词}_{名词}
例如: query_order, generate_content, analyze_competitor

# 配置项
snake_case: max_concurrent_requests, gpu_memory_limit
```



### 接口响应格式

```Plain Text

{
  "code": 0,
  "message": "success",
  "data": {},
  "request_id": "uuid",
  "timestamp": 1234567890,
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 50,
    "total_tokens": 150
  }
}
```

## 注意事项

1. **并发控制:** 严格遵守 GPU 并发和链路并发限制，避免资源争抢和成本暴涨。
2. **工具迁移**: 开发时保证工具接口清晰，便于后续 MCP 迁移。
3. **飞书解耦**: 业务逻辑与飞书平台解耦，保持可迁移性。
4. **监控告警**: 关注 Token 消费、GPU 利用率、响应延迟。
5. **安全护栏**: 所有模型输入/输出必须经过安全检查。

- [x]   按照领域分，需要和<cite type="user" user-id="ou_209a22aa3df1872d7a0b9dcff4a17ed5" user-name="Luka(齐得创)"></cite>核对

- [x] 飞书知识库无外部接口，需要依赖飞书生态，飞书有哪些开放接口。需要和飞书核对。**（飞书无知识检索接口）**