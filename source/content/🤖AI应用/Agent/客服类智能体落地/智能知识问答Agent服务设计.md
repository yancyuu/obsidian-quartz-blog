---
tags:
  - ai
  - ai-agent
---

  
## 📋 项目文档  
  
> **项目定位**: 智能知识库代理服务，提供基于LLM的问答、内容生成和自动化任务处理能力  
> **当前状态**: 稳定运行，聚焦遗留问题优化，暂不进行大规模重构  
  
---  
  
## 1. 项目概述  
  
### 1.1 项目演进历史  
  
**从ai-adapter到ikb-agent-service的演进**：  
  
- **初期定位（ai-adapter）**: 企业AI插件中台  
  - 目标：通过标准化插件架构，快速并行多个AI场景的迭代开发  
  - 架构：统一的适配层，屏蔽不同AI服务提供商的差异  
  - 优势：加速AI能力落地，支持多业务线快速接入  
  
- **战略调整**: 从"中台"到"产品"  
  - 背景：领导层策略调整，决定将"绝智"打造成独立产品  
  - 变化：不再追求通用中台定位，聚焦小火鸭（XHY）智能问答产品化  
  
- **能力拆分**: 形成当前架构  
  - **ikb-agent-service**: 小火鸭产品的核心Agent服务  
  - **ai_sdk**: 从通用能力中抽取的AI能力封装层（保留了中台思想）  
  - **common_sdk**: 通用基础能力库  
  
**当前定位**: 聚焦小火鸭智能问答产品，提供企业级知识库Agent服务  
  
### 1.2 核心功能  
- **智能问答系统**: 基于大语言模型的对话式问答，支持流式响应  
- **知识库检索**: 结合向量检索和传统搜索的混合检索方案  
- **多模态处理**: 支持文本、语音、视频等多媒体内容处理  
- **个性化推荐**: 基于用户画像和上下文的智能推荐  
- **会话管理**: 完整的对话会话生命周期管理  
- **反馈系统**: 用户反馈收集和质量优化机制  
  
### 1.2 业务场景  
- 企业知识管理：企业内部知识库智能问答  
- 智能客服：7x24小时自动化客服系统  
- 产品推荐：基于用户需求的个性化产品推荐  
- 营销活动管理：营销活动智能推送  
- 培训助手：员工培训和知识查询助手  
  
---  
  
## 2. 技术架构  
  
### 2.1 整体架构设计  
  
项目采用**分层架构**，核心思想是将业务逻辑与技术实现解耦：  
  
```  
┌─────────────────────────────────────────────────────┐  
│                   External World                    │  
│     (Client / AI Services / Databases / Cache)      │  
└─────────────────────────────────────────────────────┘  
                         ↓┌─────────────────────────────────────────────────────┐  
│                 API Layer (展示层)                   │  
│  app/api/endpoints/   - 路由和请求处理              ││  app/api/common/      - 中间件、认证                ││  app/api/scheme/      - 数据模型（Pydantic）         │└─────────────────────────────────────────────────────┘  
                         ↓┌─────────────────────────────────────────────────────┐  
│              Core Layer (核心业务层)                │  
│  app/core/agent/     - Agent核心逻辑                ││  app/core/session/   - 会话管理                     ││  app/core/identity/  - 身份认证                     ││  app/core/audio/     - 音频处理                     │└─────────────────────────────────────────────────────┘  
                         ↓┌─────────────────────────────────────────────────────┐  
│           Providers Layer (基础设施层)              │  
│  app/providers/models/       - ORM数据模型          ││  app/providers/repositories/ - 数据访问层           ││  app/providers/cache/        - 缓存实现             │└─────────────────────────────────────────────────────┘  
                         ↓┌─────────────────────────────────────────────────────┐  
│              Shared Layer (共享工具层)              │  
│  ai_sdk/          - AI能力封装（独立SDK）           ││  common_sdk/      - 通用基础库（独立SDK）           │└─────────────────────────────────────────────────────┘  
```  
  
### 2.2 技术栈  
  
| 类别 | 技术选型 | 版本 | 用途 |  
|------|---------|------|------|  
| **Web框架** | Sanic | 25.3.0 | 异步HTTP服务 |  
| **ASGI服务器** | Uvicorn | - | 异步服务器 |  
| **ORM框架** | Tortoise ORM | 0.21.7 | 异步ORM |  
| **数据库驱动** | asyncpg | - | PostgreSQL异步驱动 |  
| **AI编排框架** | Pydantic-AI | - | 当前使用的Agent框架（详见下文说明）|  
| **向量数据库** | Milvus | 2.5.7 | 向量相似性搜索 |  
| **缓存** | Redis | 5.0.8 | 缓存和任务队列 |  
| **配置中心** | Nacos | - | 分布式配置管理 |  
| **数据验证** | Pydantic | - | 数据模型和验证 |  
| **日志** | structlog | - | 结构化日志 |  
  
> **关于AI编排框架的选择**：  
>  
> 目前AI编排领域**没有统一标准**，各框架各有优劣，选择主要取决于**业务需求**和团队技术栈：  
>  
> - **Pydantic-AI**：类型安全、与Sanic/FastAPI集成好、代码简洁 → **适合当前项目**  
> - **AgentScope**：阿里开源、多模态支持好、中文文档完善 → 适合国内团队  
> - **LangGraph**：图编排、状态管理强大、生态丰富 → 适合复杂工作流  
> - **LangChain**：生态最成熟、但复杂度高 → 适合快速原型  
> - **手搓有限状态机**：极致灵活、完全可控 → 适合特殊业务场景  
>  
> **本项目选择Pydantic-AI的原因**：  
> 1. 与Sanic技术栈统一（都是Pydantic生态）  
> 2. 代码类型安全，维护性好  
> 3. 学习曲线平缓，团队上手快  
> 4. 满足当前业务需求（不过度设计）  
>  
> **重要提醒**：框架只是工具，不要为了用框架而用框架。简单场景手搓可能更高效。  
  
### 2.3 AI模型支持  
  
- **通义千问**（阿里云）：主要LLM提供商  
- **OpenAI GPT**：备用LLM提供商  
- **Azure OpenAI**：企业级LLM服务  
- **Embedding模型**：  
  - OpenAI text-embedding-3-large  
  - 通义千问 text-embedding-v3  
  
---  
  
## 3. 核心模块详解  
  
### 3.1 Agent系统  
  
#### Agent架构  
项目采用**模块化Agent设计**，每个Agent专注特定任务：  
  
| Agent | 功能 | 特点 |  
|-------|------|------|  
| **XHY Agent** | 小火鸭智能对话 | 流式响应、多轮对话、知识库检索增强 |  
| **Polish Agent** | 文本优化润色 | 多模态识别、内容质量提升 |  
| **GreetAgent** | 问候接待 | 意图识别、个性化问候 |  
| **ChatAgent** | 对话处理 | 上下文管理、意图理解 |  
| **EvalAgent** | 结果评估 | 质量评估、重新检索决策 |  
| **RecommendAgent** | 推荐系统 | 问题推荐、个性化内容 |  
  
#### Agent工作流程  
```python  
用户输入  
   ↓意图识别（向量检索）  
   ↓知识库检索（Milvus）  
   ↓评估循环（EvalAgent）  
   ↓  (质量不满足)  
   └─────────────→ 重新检索  
   ↓ (质量满足)  
生成响应（LLM）  
   ↓结构化输出（卡片/列表/文本）  
```  
  
**核心代码位置**：  
- XHY Agent主控制器: `app/core/agent/xhy/main.py:1-100`  
- 子Agent实现: `app/core/agent/xhy/nodes/`  
- Polish Agent: `app/core/agent/polish/`  
  
### 3.2 数据库架构  
  
#### 关系型数据库（PostgreSQL）  
  
**连接配置**：`app/config/settings.py:367-412`  
  
```python  
# 主要数据表  
tb_session           # 会话表  
tb_message           # 消息表  
tb_application       # 应用表  
tb_policy            # 权限策略表  
tb_config            # 配置表  
tb_feedback_detail   # 反馈详情表  
```  
  
**连接池配置**：  
- 最小连接数: 100  
- 最大连接数: 10  
- 命令超时: 30秒  
- Keep-alive设置: 已优化  
  
#### 向量数据库（Milvus）  
  
**用途**：知识库向量检索  
  
**Embedding流程**：  
1. 文本预处理  
2. Embedding模型向量化  
3. 存储到Milvus  
4. 相似性检索（余弦/欧氏距离）  
5. 返回Top-K结果  
  
**SDK集成**：`ai_sdk/clients/vector/`  
  
#### 缓存数据库（Redis）  
  
**双Redis配置**：  
- **主Redis**：会话缓存、任务队列  
- **专用Redis(jzredis)**：特定业务缓存  
  
**配置位置**：`app/config/settings.py:76-82`  
  
### 3.3 配置管理系统  
  
**配置优先级**：  
```  
环境变量 > Nacos配置中心 > .env文件 > 默认值  
```  
  
**热更新机制**：`app/config/settings.py:125-364`  
  
- 支持Nacos配置热更新  
- 轮询间隔：5-10秒  
- 自动更新全局配置对象  
- 回调机制通知业务层  
  
---  
  
## 4. 项目结构详解  
  
```  
ikb-agent-service/  
├── app/                              # 应用主目录  
│   ├── api/                          # API层（展示层）  
│   │   ├── common/                   # 通用工具  
│   │   │   ├── auth.py              # JWT认证中间件  
│   │   │   └── dependencies.py      # 依赖注入  
│   │   ├── endpoints/               # API路由  
│   │   │   ├── agent/              # Agent相关接口  
│   │   │   ├── session/            # 会话管理接口  
│   │   │   ├── audio/              # 语音接口  
│   │   │   └── config/             # 配置接口  
│   │   └── scheme/                 # 数据模型  
│   │       ├── request/            # 请求模型  
│   │       └── response/           # 响应模型  
│   ├── config/                      # 配置管理  
│   │   └── settings.py             # 全局配置（含Nacos热更新）  
│   ├── core/                        # 核心业务层  
│   │   ├── agent/                  # Agent核心逻辑  
│   │   │   ├── xhy/               # 小火鸭Agent  
│   │   │   └── polish/            # 文本优化Agent  
│   │   ├── session/                # 会话管理  
│   │   ├── identity/               # 身份认证  
│   │   └── audio/                  # 音频处理  
│   └── providers/                  # 基础设施层  
│       ├── models/                 # ORM数据模型  
│       ├── repositories/           # 数据访问层  
│       └── cache/                  # 缓存实现  
├── ai_sdk/                          # AI SDK（独立）  
│   ├── clients/                     # 基础功能客户端  
│   │   ├── agent/                 # Agent客户端  
│   │   ├── llm/                   # LLM客户端  
│   │   ├── knowledge_base/        # 知识库客户端  
│   │   └── vector/                # 向量数据库客户端  
│   └── builders/                   # 构建器模块  
│       ├── agent/                 # Agent构建器  
│       ├── workflow/              # 工作流构建器  
│       └── knowledge_base/        # 知识库构建器  
├── common_sdk/                      # 通用SDK（独立）  
│   ├── logging/                    # 日志工具  
│   ├── util/                       # 通用工具  
│   └── service_client/            # 服务客户端  
├── main.py                          # 应用入口  
├── api_service.py                   # Sanic应用封装  
├── requirements.txt                 # 依赖管理  
└── pyproject.toml                  # Poetry配置  
```  
  
---  
  
## 5. 环境配置与部署  
  
### 5.1 环境依赖  
  
**系统要求**：  
- Python >= 3.11, < 4.0  
- PostgreSQL 12+  
- Redis 6+  
- Milvus 2.5+  
- 内存: 建议8GB+  
  
### 5.2 核心配置项  
  
```bash  
# .env 配置示例  
  
# 应用配置  
APP_NAME=ikb-agent-service  
APP_PORT=5000  
APP_DEBUG=false  
APP_ENV=dev  
  
# PostgreSQL配置  
POSTGRES_HOST=localhost  
POSTGRES_PORT=5432  
POSTGRES_USER=postgres  
POSTGRES_PASSWORD=password  
POSTGRES_DATABASE=ikb_agent  
  
# Redis配置  
REDIS_HOST=localhost  
REDIS_PORT=6379  
REDIS_DB=0  
  
# Nacos配置  
NACOS_DOMAIN=localhost:8848  
NACOS_DATA_ID=ikb-agent-application.yaml  
NACOS_GROUP=dev  
NACOS_USERNAME=nacos  
NACOS_PASSWORD=nacos  
  
# AI模型配置  
DEFAULT_PROVIDER=aliyun  
ALIYUN_MODEL_API_KEY=your-api-key  
ALIYUN_MODEL_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1  
  
# Milvus配置  
MILVUS_HOST=localhost  
MILVUS_PORT=19530  
```  
  
### 5.3 启动方式  
  
#### 开发模式（支持热重载）  
```bash  
python main.py```  
  
#### 生产模式（使用Gunicorn）  
```bash  
gunicorn -c gunicorn_conf.py api_service:app```  
  
#### Docker部署  
```bash  
# 构建镜像  
docker build -t ikb-agent-service:latest .  
  
# 运行容器  
docker run -d \  
  -p 5000:5000 \  --env-file .env \  ikb-agent-service:latest  
```  
  
---  
  
## 6. 遗留问题与优化方向  
  
### 6.1 已识别的TODO项  
  
#### 架构层面  
1. **Agent编排优化** (`app/core/agent/xhy/main.py:5`)  
   - **问题**：未使用图编排，因业务复杂且产品细节未确定  
   - **影响**：扩展性受限，难以可视化Agent流程  
   - **建议**：评估引入LangGraph或自研图编排引擎  
  
2. **配置管理** (`app/config/settings.py:35`)  
   - **问题**：AI模型配置从Nacos读取，不支持动态扩展  
   - **建议**：改为数据库存储，支持多租户隔离  
  
3. **向量检索优化** (`ai_sdk/clients/vector/async_vector_client.py:93`)  
   - **问题**：业务字段耦合在AI能力侧  
   - **影响**：AI SDK不够通用  
   - **建议**：抽象字段映射层  
  
#### 业务逻辑层面  
4. **特殊意图处理** (`app/core/agent/polish/workflow.py:74`)  
   - **问题**：产品未闭环，无法确定查询哪个知识库  
   - **现状**：硬编码跳过特殊查询意图  
   - **建议**：推动产品完善知识库路由规则  
  
5. **权限校验** (`app/core/identity/policy_controller.py:220`)  
   - **问题**：TODO注释表明权限校验未完善  
   - **建议**：补充完整的RBAC实现  
  
6. **响应类型配置化** (`app/api/scheme/response/agent/stream_message.py:7-8`)  
   - **问题**：实体类型硬编码，不支持动态配置  
   - **建议**：改为可配置的知识库元数据映射  
  
#### 性能优化  
7. **数据库查询优化**  
   - 添加必要的索引  
   - 优化N+1查询  
   - 考虑引入查询缓存  
  
8. **向量检索性能**  
   - 实现向量检索结果缓存  
   - 优化索引参数（IVF_FLAT/HNSW）  
   - 考虑批量检索  
  
9. **大文件处理**  
   - 流式处理大文件  
   - 异步文件上传  
   - 分块存储  
  
### 6.2 技术债务  
  
1. **日志配置重构** (`common_sdk/logging/logger.py:167`)  
   - 问题：SDK内实例化日志，应在app侧  
   - 计划：移除SDK内的日志配置代码  
  
2. **错误处理标准化**  
   - 统一异常类型  
   - 结构化错误响应  
   - 完善错误码体系  
  
3. **测试覆盖率**  
   - 补充单元测试  
   - 集成测试自动化  
   - 性能测试基线  
  
---  
  
## 7. Agent预研经验与建议  
  
### 7.1 Agent设计经验  
  
#### ✅ 成功实践  
  
1. **模块化Agent设计**  
   - 每个Agent专注单一职责  
   - 通过组合实现复杂功能  
   - 便于独立测试和优化  
  
2. **评估循环机制**  
   ```python  
   while not satisfied:  
       result = agent.run(query)       score = eval_agent.evaluate(result)       if score < threshold:           query = refine_query(query)  
   ```   - 优点：质量可控，可自动优化  
   - 注意：需要设置最大迭代次数  
  
3. **流式响应设计**  
   - 提升用户体验  
   - 降低首字延迟（TTFB）  
   - 实现要点：  
     ```python  
     async for chunk in agent.run_stream():         await response.write(format_chunk(chunk))     ```  
4. **工具调用抽象**  
   - 统一工具接口  
   - 支持工具注册和发现  
   - 工具执行结果标准化  
  
#### ⚠️ 避免的陷阱  
  
1. **过度依赖Agent**  
   - 问题：简单逻辑也用Agent，增加成本和延迟  
   - 建议：规则系统能解决的就不要用Agent  
  
2. **上下文管理不当**  
   - 问题：每次都传递完整历史，Token消耗大  
   - 建议：实现上下文压缩和摘要  
  
3. **缺乏监控**  
   - 问题：Agent黑盒运行，难以调试  
   - 建议：  
     - 记录每次Agent调用的输入输出  
     - 追踪工具调用链路  
     - 监控Token消耗  
  
### 7.2 Agent技术选型建议  
  
> **核心观点**：AI编排框架**没有统一标准**，选择完全取决于**业务需求**、团队技术栈和维护成本。不要盲目追求框架，够用就好。  
  
#### 主流框架对比  
  
| 框架 | 优势 | 劣势 | 适用场景 | 推荐度 |  
|------|------|------|----------|--------|  
| **Pydantic-AI** | 类型安全、与Sanic/FastAPI集成好、代码简洁、学习曲线平缓 | 生态较新、工具链不如LangChain成熟 | Python异步Web项目、追求类型安全 | ⭐⭐⭐⭐⭐ |  
| **AgentScope** | 阿里开源、多模态支持好、中文文档完善、国内团队友好 | 相对较新、社区规模在增长 | 国内团队、多模态应用、需要中文支持 | ⭐⭐⭐⭐ |  
| **LangGraph** | 图编排强大、状态管理灵活、生态丰富（基于LangChain） | 需要重新设计架构、学习曲线陡 | 复杂工作流、需要可视化编排 | ⭐⭐⭐⭐ |  
| **LangChain** | 生态最成熟、工具最多、社区活跃 | 复杂度高、过度抽象、性能开销大 | 快速原型、复杂RAG应用 | ⭐⭐⭐ |  
| **AutoGen** | 多Agent协作能力强、微软背书 | 配置复杂、调试困难 | 多Agent协作场景 | ⭐⭐⭐ |  
| **CrewAI** | 角色扮演清晰、易于理解 | 定制化能力弱 | 角色明确的Agent团队 | ⭐⭐⭐ |  
| **手搓有限状态机** | 极致灵活、完全可控、零框架依赖 | 开发成本高、需要自己实现所有能力 | 特殊业务逻辑、对框架有定制需求 | ⭐⭐ |  
  
#### 框架选择决策树  
  
```  
是否需要复杂的Agent编排？  
├─ 是 → 是否需要可视化？  
│   ├─ 是 → LangGraph（有图编排界面）  
│   └─ 否 → AgentScope 或 自研轻量框架  
│  
└─ 否 → 团队技术栈是？  
    ├─ Python + Pydantic生态 → Pydantic-AI（推荐）  
    ├─ 国内团队 + 多模态需求 → AgentScope    └─ 快速验证原型 → LangChain```  
  
#### 本项目选择Pydantic-AI的原因（复盘）  
  
1. **技术栈统一**：项目使用Sanic，Pydantic-AI天然集成，无需额外适配  
2. **类型安全**：Pydantic提供强类型，减少运行时错误，维护成本低  
3. **学习成本低**：团队熟悉Pydantic，上手快，不需要学习新的抽象概念  
4. **满足业务需求**：当前Agent场景不复杂，不需要图编排等高级功能  
5. **代码简洁**：没有过度抽象，代码可读性好，新人容易理解  
  
#### 迁移成本评估  
  
如果未来需要切换框架，建议评估：  
  
**切换到LangGraph**：  
- 成本：需要重新设计Agent工作流为图结构  
- 收益：获得可视化编排能力、更强大的状态管理  
- 建议：仅在业务复杂度显著提升时考虑  
  
**切换到AgentScope**：  
- 成本：中等，需要适配Agent接口  
- 收益：更好的多模态支持、中文社区  
- 建议：如果增加多模态场景可以考虑  
  
**保持Pydantic-AI + 手搓扩展**：  
- 成本：最低，渐进式优化  
- 收益：保持代码简洁、控制依赖  
- 建议：当前最优方案  
  
#### 实践建议  
  
1. **不要过早优化**：框架只是工具，不要为了未来可能的需求选择复杂框架  
2. **关注业务价值**：Agent是为了解决业务问题，不是为了炫技  
3. **保持可迁移性**：通过良好的抽象层设计，降低框架锁定风险  
   ```python  
   # 示例：框架无关的Agent接口抽象  
   class AgentInterface(ABC):  
       @abstractmethod       async def run(self, query: str) -> AgentResult:           pass  
       @abstractmethod       async def stream_run(self, query: str) -> AsyncIterator[str]:           pass  
   ```  
### 7.3 性能优化经验  
  
1. **并行工具调用**  
   ```python  
   # 不好的做法  
   result1 = await tool1()  
   result2 = await tool2()  
   # 好的做法  
   result1, result2 = await asyncio.gather(tool1(), tool2())  
   ```  
2. **缓存策略**  
   - LLM结果缓存（相同输入）  
   - 工具调用缓存（幂等操作）  
   - 向量检索缓存（热门问题）  
  
3. **Prompt优化**  
   - 精简System Prompt  
   - 使用Few-shot示例代替长描述  
   - 动态注入相关上下文  
  
4. **模型选择策略**  
   - 简单任务用小模型（如意图识别）  
   - 复杂任务用大模型（如推理生成）  
   - 实现模型路由器  
  
### 7.4 监控与可观测性  
  
**关键指标**：  
- Agent响应时间（P50/P95/P99）  
- Token消耗（输入/输出）  
- 工具调用成功率  
- 用户满意度评分  
  
**推荐工具**：  
- LangSmith：Agent调试和追踪  
- Phoenix：LLM应用监控  
- 自建监控：基于结构化日志  
  
**示例监控代码**：  
```python  
@observe()  
async def agent_run(query: str):  
    with trace("agent_run", metadata={"query": query}):  
        result = await agent.run(query)        metrics.record("agent.tokens", result.tokens_used)        return result```  
  
---  
  
## 8. 开发指南  
  
### 8.1 本地开发  
  
#### 1. 克隆仓库  
```bash  
git clone <repository-url>cd ikb-agent-service```  
  
#### 2. 安装依赖  
```bash  
# 使用pip  
pip install -r requirements.txt  
  
# 或使用poetry（推荐）  
poetry install  
```  
  
#### 3. 配置环境变量  
```bash  
cp .env.example .env# 编辑.env文件，填入必要配置  
```  
  
#### 4. 启动依赖服务  
```bash  
# PostgreSQL（Docker）  
docker run -d \  
  -p 5432:5432 \  -e POSTGRES_PASSWORD=password \  postgres:14  
# Redis（Docker）  
docker run -d \  
  -p 6379:6379 \  redis:7  
# Milvus（Docker Compose）  
# 参考 https://milvus.io/docs/install_standalone-docker.md  
```  
  
#### 5. 初始化数据库  
```bash  
# 运行数据库迁移  
aerich init -t app.config.settings.TORTOISE_ORM  
aerich upgrade  
```  
  
#### 6. 启动开发服务器  
```bash  
python main.py# 访问 http://localhost:5000/docs 查看API文档  
```  
  
### 8.2 代码规范  
  
- **代码风格**: Black  
- **类型检查**: mypy  
- **导入排序**: isort  
- **代码质量**: ruff  
  
运行检查：  
```bash  
black .isort .mypy app/ruff check app/```  
  
### 8.3 测试  
  
```bash  
# 运行所有测试  
pytest  
  
# 运行特定测试文件  
pytest tests/test_agent.py  
  
# 生成覆盖率报告  
pytest --cov=app --cov-report=html  
```  
  
---  
  
## 9. 运维与监控  
  
### 9.1 日志管理  
  
**日志配置**：`common_sdk/logging/logger.py`  
  
**日志级别**：  
- DEBUG: 开发调试  
- INFO: 关键流程  
- WARNING: 警告信息  
- ERROR: 错误信息  
- CRITICAL: 严重错误  
  
**日志存储**：  
- 本地文件：`logs/`  
- Syslog：可配置远程syslog服务  
- 结构化：JSON格式  
  
### 9.2 健康检查  
  
```bash  
# 健康检查端点  
curl http://localhost:5000/health  
  
# 预期响应  
{  
  "status": "healthy",  "database": "connected",  "redis": "connected",  "milvus": "connected"}  
```  
  
### 9.3 性能监控  
  
**推荐工具**：  
- Prometheus + Grafana：指标采集和可视化  
- Logfire：应用性能监控（已集成）  
- Sentry：错误追踪  
  
### 9.4 故障排查  
  
**常见问题**：  
  
1. **数据库连接失败**  
   - 检查PostgreSQL是否运行  
   - 验证连接配置  
   - 查看连接池是否耗尽  
  
2. **Redis连接超时**  
   - 检查Redis服务状态  
   - 验证网络连通性  
   - 检查连接池配置  
  
3. **Milvus检索慢**  
   - 检查索引是否已构建  
   - 优化搜索参数（top_k, nprobe）  
   - 考虑增加Milvus资源  
  
4. **Agent响应超时**  
   - 检查LLM API延迟  
   - 优化Prompt长度  
   - 增加超时时间配置  
  
---  
  
## 10. 团队协作  
  
### 10.1 分支管理  
  
- `master`: 主分支，生产环境代码  
- `release`: 发布分支，预发布验证  
- `uat`: 用户验收测试分支  
- `test`: 测试分支  
- `feature/*`: 功能开发分支  
- `bugfix/*`: 问题修复分支  
  
### 10.2 提交规范  
  
```bash  
# 功能开发  
git commit -m "feat: 添加新的推荐Agent"  
  
# 问题修复  
git commit -m "fix: 修复会话记录保存失败的问题"  
  
# 文档更新  
git commit -m "docs: 更新API文档"  
  
# 性能优化  
git commit -m "perf: 优化向量检索性能"  
```  
  
### 10.3 Code Review  
  
**关注点**：  
1. 代码质量和可读性  
2. 是否引入技术债务  
3. 是否有安全隐患  
4. 测试覆盖率  
5. 文档完整性  
  
---  
  
## 11. 联系方式  
  
**技术负责人**: [填写]  
**架构师**: [填写]  
**运维负责人**: [填写]  
  
**相关文档**：  
- AI SDK文档: `ai_sdk/README.md`  
- Common SDK文档: `common_sdk/README.md`  
- API文档: 启动服务后访问 `/docs`  
  
---  
  
## 附录A: 快速参考  
  
### 常用命令  
  
```bash  
# 启动开发服务器  
python main.py  
  
# 运行测试  
pytest  
  
# 代码格式化  
black app/ && isort app/  
  
# 类型检查  
mypy app/  
  
# 查看日志  
tail -f logs/app.log  
  
# 数据库迁移  
aerich migrate  
aerich upgrade  
```  
  
### 关键文件位置  
  
| 功能 | 文件路径 |  
|------|----------|  
| 全局配置 | `app/config/settings.py` |  
| Agent入口 | `app/core/agent/xhy/main.py` |  
| 数据库模型 | `app/providers/models/` |  
| API路由 | `app/api/endpoints/` |  
| 日志配置 | `common_sdk/logging/logger.py` |  
| Docker配置 | `Dockerfile` |  
  
---  
  
**文档版本**: v1.0  
**最后更新**: 2026-01-14  
**维护者**: [您的名字]