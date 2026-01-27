
**—— 面向极速迭代的防御性架构标准**

**发布人：**  yancyyu

**核心理念：** **Design for Replacement (为随时被替换而设计)**

**生效日期：** 即刻生效

---

## 1. 核心定义：什么是“可逃逸架构”？

在 AI 项目中，任何依赖项（LLM 模型、Agent 框架、RPA 工具、向量数据库、Web 框架）都必须被视为**“临时组件” (Disposable Components)**。

**考核标准：**

当我们需要把底层模型从 GPT-4 换成 DeepSeek，或者把编排框架从 LangGraph 换成 PydanticAI 时，**必须在 24 小时内完成迁移**，且**业务核心逻辑代码 0 修改**。

**做不到这一点的，视为架构设计不合格。**

---

## 2. 四大逃逸设计原则 (The 4 Laws of Escape)

### 原则一：核心逻辑剥离 (Business Logic Detachment)

**错误：** 开发人员将业务逻辑（如：计算折扣、校验库存）直接写在 Agent 的 Prompt 里，或者写在 LangChain 的 `Chain` 类里。

**后果：** 一旦换框架，业务逻辑全丢，必须重写。

**[强制规范]：纯函数主义 (Pure Functions)**

- 所有的业务逻辑（计算、校验、数据处理）必须写成**与 AI 无关的纯 Python/Go 函数**。
    
- Agent 框架（无论是 LangChain, LangGraph 还是 Agno）仅仅作为**“胶水”**来调用这些函数。
    
- **考核点：** 我如果删掉你的 Agent 框架代码，你的业务计算逻辑还能单独跑单元测试吗？**不能就是不合格。**
    

### 原则二：协议优于框架 (Protocol over Framework)

**错误：** 代码里充斥着框架特有的对象，如 `LangChain.tools` 或 `SemanticKernel.skills`。

**后果：** 被框架绑架，无法逃逸。

**[强制规范]：基于 MCP/HTTP 的接口隔离**

- **工具层 (Tools)：** 严禁直接使用框架的专有类。所有工具必须封装为标准 **MCP (Model Context Protocol)** 或 **OpenAPI (Swagger)** 接口。
    
- **交互层 (Interface)：** 前后端交互严禁依赖特定 WebSocket 协议。必须定义通用的 **JSON Schema**。
    
- **考核点：** 如果明天放弃 LangGraph 改用 Python 原生代码写 Agent，你的 Tools 需要重写吗？**如果遵循 MCP 标准，是不需要重写的。**
    

### 原则三：模型无关性 (Model Agnostic)

**错误：** 代码里硬编码了 `OpenAI_API_Key`，或者使用了只有 GPT-4 才支持的 Function Calling 格式。

**后果：** 无法切换到国产模型或开源模型。

**[强制规范]：网关模式 (Gateway Pattern)**

- **中间层：** 必须通过 OneAPI / LiteLLM 等网关层调用模型。
    
- **统一格式：** 代码中禁止出现特定模型的参数。必须在中间层做参数映射（Map）。
    
- **考核点：** 我现在要求把模型换成 DeepSeek-V3，你只需要改一行配置（Config），还是要去改代码？**改代码即为不合格。**


### 原则四：上下文解耦与渐进式披露 (Context Decoupling & Progressive Disclosure)

**错误：** 构建“上帝 Agent (God Agent)”。开发人员为了省事，将 ERP、CRM、OA 等 50+ 个 MCP 工具一次性全部注入到 System Prompt 中。

**后果：**

1. **模型锁定：** 强依赖支持 128k+ 上下文的昂贵模型，无法迁移到更经济、更快的模型（如 DeepSeek, Llama 3 8B）。
    
2. **性能劣化：** 上下文越长，推理越慢，且“大海捞针”效应导致幻觉增加。
    

**[强制规范]：路由架构与按需加载 (Router-Worker Architecture)**

- **分层路由 (Layered Routing)：** 必须将 Agent 拆分为 **L1 Router (意图识别)** 和 **L2 Worker (任务执行)**。
    
    - _Router_ 只能看到 **“技能清单 (Skill List)”**（如：库存管理、订单处理），严禁看到具体的工具定义。
        
    - _Worker_ 只有在被激活时，才**动态加载**该领域下的具体 MCP Tools。
        
- **无状态原则 (Stateless Context)：** 单次任务结束后，必须清理上下文，防止无关的工具残留干扰下一次推理。
    
- **考核点：** **“8k 挑战”** —— 你的 Agent 能否在限制 **8k Context Window** 的小模型（如本地部署的 Llama 3）上跑通核心流程？**如果必须依赖 128k 上下文才能跑起来，视为架构臃肿，不合格。**
    

### 原则五：RPA 的代码化逃逸 (Code-First RPA)

**错误：** 使用影刀、UiPath 等可视化的低代码 RPA 工具，流程是一个二进制文件或私有格式。

**后果：** 厂商涨价或倒闭，所有流程作废，无法迁移。

**[强制规范]：Headless & Code-First**

- **优先使用：** Playwright, Selenium, Puppeteer 等开源代码库。
    
- **封装要求：** RPA 脚本必须被封装成 API。
    
- **考核点：** 你的 RPA 流程能存入 Git 进行版本管理吗？能通过 CI/CD 自动部署吗？**如果只是一个存放在某人电脑里的 `.flow` 文件，直接淘汰。**
    

---

## 3. 🔴 后端开发标准 (Backend Standards)

**适用范围：** Python/Go 开发，涉及 LangGraph (编排) 和 Agno (执行) 等agent框架的**核心红线：** **业务逻辑与 AI 框架必须物理隔离；技能 (Skills) 必须原子化封装。**

### 3.1 [强制] 纯函数业务逻辑 (Pure Business Logic)

- **规范：** 所有的业务计算（如：价格计算、库存校验、数据清洗）必须编写为**不依赖任何 AI 库**的纯 Python/Go 函数。
    
- **代码结构要求：**
    
    - `core/logic/`: 存放纯业务逻辑（禁止 import langgraph/agno）。
        
    - `core/agents/`: 存放 Agent 定义（仅负责调用 logic）。
        
- **考核点：** 如果卸载了 `langgraph` 包，你的 `core/logic` 目录下的单元测试必须能 100% 通过。
    

### 3.2 [强制] 状态模型 Schema 化 (Pydantic First)

- **规范：** 严禁在代码中传递无结构的 `Dict` 或 `Any`。所有数据流转必须定义 **Pydantic Model**。
    
- **LangGraph 要求：** `State` 定义必须清晰注释每个字段的含义。
    
- **Agno 要求：** Agent 的 `response_model` 必须强制指定 Pydantic 对象，**严禁**依赖 Prompt 让 AI 返回纯文本然后用正则去解析。
    

### 3.3 [强制] MCP 服务架构与边界定义 (Service Architecture & Boundaries)

**核心原则：** **Agent 与工具物理隔离；仅暴露需 AI 决策的能力。**

#### 3.3.1 架构模式：Client-Server 解耦

- **规范：** **Agent 严禁直接持有工具代码。** Agent 必须作为 **MCP Client**，通过协议连接 **MCP Server**。
    
    - **Server 端（供给方）：** 独立进程/容器，运行业务逻辑，暴露 JSON Schema。
        
    - **Client 端（Agent）：** 仅配置连接方式（Stdio/SSE），不包含任何工具实现的 Python 代码。
        
- **注册中心 (Connection Registry)：**
    
    - 代码中维护 **Server 连接配置 (Configuration)** 而非函数列表。
        
    - _正确做法：_ Agent 初始化时读取 `mcp_config.yaml`，执行 `await client.connect("inventory_service")`。
        
- **考核点：** 将底层库存服务的实现语言从 Python 换成 Go，Agent 端代码是否为 **0 修改**？（仅允许修改连接配置）。
    

#### 3.3.2 边界界定：函数 (Function) vs MCP Service

**开发人员必须严格区分“写给程序员看的代码”与“暴露给 AI 用的工具”。**

|**维度**|**纯函数 (Python Function)**|**MCP Service / Tool**|
|---|---|---|
|**定位**|**实现细节 (Implementation)**|**业务能力 (Capability)**|
|**可见性**|**Private** (仅代码内部调用)|**Public** (暴露给 AI 上下文)|
|**决策权**|**确定性执行** (逻辑流的一部分)|**概率性选择** (AI 决定是否调用)|
|**成本**|零成本|昂贵 (占用 Context Window)|

- **判定红线 (Red Lines)：**
    
    1. **禁止暴露工具类函数：** 严禁将 `json_parser`, `date_formatter`, `string_split` 封装为 MCP。AI 的大脑自带这些能力，或者应在 核心业务逻辑层 代码内部消化。
        
    2. **禁止暴露中间态数据：** MCP 必须是 **Stateless (无状态)** 的。严禁 MCP A 返回一个数据库游标 (Cursor) 让 MCP B 去读取。每次调用必须返回人类可读的最终业务结果。
        
    3. **单一意图原则：** 一个 MCP Service 必须对应一个**“完整的业务意图”**。
        
        - _错误：_ `multiply_price_by_0.8(price)` (这是函数)。
        - _正确：_ `get_discounted_price(sku)` (这是 MCP，内部调用了上面的函数)。
            

#### 3.3.3 单一职责与原子性

- **规范：** 每个 MCP Service 应当是原子化的业务单元。
    
- **颗粒度标准：** “如果雇佣一个实习生，会把这个操作写进他的任务手册吗？”
    
    - “去查一下数据库连接字符串” -> **否** (这是函数)。
        
    - “去查一下某商品的库存” -> **是** (这是 MCP)。

### 3.4 [强制] 渐进式披露与技能路由 (Progressive Disclosure & Skills)

- **背景：** 随着 MCP Server 数量增加（如接入了 ERP、CRM、OA 等 10 个 Server，包含 500 个 Tools），直接建立所有连接并将全量工具 Schema 注入上下文，会导致 Agent 瘫痪。     
    
- **规范：** 严禁构建“全能上帝 Agent”。必须采用 **“技能组 (Skill Sets)”** 结合 **“传统路由”** 的动态挂载策略。     
    
- **Skills 定义（在此上下文中）：** Skill 是**路由策略**与**MCP Server**的映射关系，可以参考最近很火的claude Skills规范中的格式。
    
    - _概念公式：_ `Skill = Router Intent + Target MCP Server`。     
        
- **实现架构：路由 -> 技能 -> 连接**
    
    - **L1 传统路由 (Router)：** 使用轻量级分类器（如传统的 Intent Classification / Embedding 检索）。
        
        - _职责：_ **不连接**任何 MCP Server。只负责识别用户意图（如：“这是查库存的需求”）。
            
        - _动作：_ 识别意图 -> 查找路由表 -> 找到对应的 `InventorySkill`。
            
    - **L2 动态挂载 (Worker)：**
        
        - _动作：_ Worker Agent 接收到任务后，**按需 (On-Demand)** 初始化对应的 MCP Client 连接，或从连接池中获取特定的 Server 上下文。
            
        - _效果：_ 处理库存任务时，Agent 的上下文中只有库存相关的工具定义。     
            
- **考核点：** 即使后台部署了 100 个 MCP Server，首页路由 Agent 在处理用户请求时，Context Window 中是否**完全没有**包含具体的工具 Schema 定义？（路由层应是纯净的）。

### 3.5 [强制] 网关模式 (Model Gateway)

- **规范：** 代码中**严禁**出现 `gpt-4`, `claude-3.5` 等具体模型名称，也严禁硬编码 API Key。
    
- **实现：** 必须通过 **LiteLLM** 或 **OneAPI** 网关调用。
    
- **配置：** 代码中只能引用业务别名，如 `model="reasoning_model"` 或 `model="fast_chat_model"`。

## 4.🔵 前端开发标准 (Frontend Standards)

**适用范围：** Web/Mobile 开发，涉及 AI Native 交互 **核心红线：** **禁止开发传统的静态表单与 CRUD 页面。**

### 4.1 [强制] 生成式界面 (Generative UI)

- **规范：** 前端不再是“写死页面”，而是“渲染组件”。
    
- **实现：** 前端必须维护一个 **UI Component Library (组件库)**。
    
    - 当后端 AI 返回 `{ "type": "stock_chart", "data": [...] }` 时，前端自动渲染图表组件。
        
    - 当后端 AI 返回 `{ "type": "confirm_card", "data": ... }` 时，前端自动渲染确认卡片。
        
- **考核点：** 新增一个业务查询场景（如查询销量），前端代码变更行数应为 **0**（复用现有组件）。
    

### 4.2 [强制] 流式优先 (Streaming First)

- **规范：** 所有 AI 交互必须支持 **Streaming (流式传输)**。
    
- **技术栈：** 强制使用 **Vercel AI SDK** (或同等能力的流式库) 处理 `useChat` / `useCompletion`。
    
- **体验要求：** 用户发出指令后，首字响应时间 (TTFT) 必须 < 1秒。严禁出现“转圈恭候 10 秒再一次性吐出结果”的情况。
    

### 4.3 [强制] 意图驱动导航 (Intent Navigation)

- **规范：** 废弃传统的“多级菜单”。
    
- **实现：** 功能入口统一收折到 Copilot / Agent 对话框中。前端必须具备 **Context Injection (上下文注入)** 能力，能将当前页面的数据（如当前选中的商品 ID）自动打包传给 Agent。
    

---

##  5. 存量/集成开发标准 (Legacy & Integration Standards)

**适用范围：** 老旧系统对接、RPA 开发、数据清洗 **核心红线：** **禁止 Agent 直接连接数据库；禁止使用二进制 RPA 工具。**

### 5.1 [强制] MCP 协议标准化 (MCP Mandatory)

- **规范：** 所有存量系统（ERP/CRM/WMS）的能力暴露，必须封装为 **MCP (Model Context Protocol) Server**。
    
- **接口定义：**
    
    - 每个 Tool 必须包含详细的 JSON Schema。
        
    - 每个 Tool 的 description 必须是**给 AI 看的说明书**（如：“用于查询深圳仓的实时库存，参数 sku 为商品编码”）。
        
- **考核点：** 任何 Agent 框架（Agno/LangChain）只要连接这个 MCP Server，就能直接使用工具，无需额外写适配代码。
    

### 5.2 [强制] 读写分离与工作流兜底 (Read/Write Separation)

- **读操作 (Read)：** 允许封装为 MCP Tool，直接作为 **Skill** 提供给 Agent。
    
- **写操作 (Write)：** **严禁** Agent 直接修改数据（如扣库存、退款）。
    
    - 必须封装为 **Workflow (工作流)**。
        
    - Agent 只能负责“提取参数”并“触发 Workflow”。
        
    - Workflow 执行前必须包含 **Pre-check (预校验)** 逻辑。
        

### 5.3 [强制] 代码化 RPA (Code-First RPA)

- **规范：** 针对无接口的黑盒系统，必须使用 **Headless Browser (无头浏览器)** 技术。
    
- **技术栈：** 推荐 **Playwright (Python/Node)** 或 **Selenium**。
    
- **红线：** **严禁**使用影刀、UiPath 等无法导出源码、无法 Git 管理的低代码/无代码工具。
    
    - _理由：_ 低代码工具无法进行 CI/CD，无法进行代码审查，且容易被厂商锁定，不符合“可逃逸架构”。

## 6. “可逃逸能力”压力测试 (The Fire Drill)

为了筛选团队，入职/考核期间进行以下“实战演习”。无法通过者，说明不具备架构能力。

### 测试 A：模型大挪移

- **指令：** “现在，把你的 Agent 底层模型从 Azure OpenAI 切换到本地部署的 Ollama (Llama 3)。”
    
- **合格：** 更改 `.env` 配置文件，重启服务，5分钟内恢复运行。
    
- **优秀：** 系统自动降级，检测到 Llama 3 不支持复杂指令，自动切换到简单的 Prompt 模板。
    
- **淘汰：** “Llama 3 的接口格式不一样，我要改两天代码。”
    

### 测试 B：框架大逃杀

- **指令：** “现在的 LangGraph 太重了，我要你把目前的业务逻辑迁移到简单的 Agno 或者 Python 原生代码里，不要用重型框架。”
    
- **合格：** 核心 Tool 和 Prompt 都是独立的，只需要重写一下 `main.py` 的调用逻辑，半天搞定。
    
- **淘汰：** “啊？我的逻辑都写在 Graph 的 Node 里面了，抽不出来……”（这种人就是典型的**框架奴隶**）。
    

---

## 7. 团队能力分层与处理建议 (The Talent Matrix)

拿着这个标准，你可以把现有的（和未来要招的）人分为三类：

| **等级**                              | **特征描述**                                                                             | **处理动作**                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| **L1: 胶水工程师 (Glue Coder)**          | 只会调包。代码里全是 `import langchain`，离开框架就不会写代码。一旦框架升级，他的代码就全挂。                             | **淘汰/边缘化**。<br><br>  <br><br>让他去维护旧系统数据清洗，别碰核心架构。            |
| **L2: 组件工程师 (Component Dev)**       | 能写出独立的模块。知道要把 Prompt 独立出来，知道要写单元测试。但对“标准协议”理解不深。                                     | **保留/培养**。<br><br>  <br><br>让他负责具体的 MCP Tool 开发，但不要让他设计整体链路。 |
| **L3: 逃逸架构师 (Escapable Architect)** | **你的目标人才**。<br><br>  <br><br>他写的代码极其干净，核心逻辑不依赖任何第三方库。他会主动提出用 MCP 协议，主动搭建 LiteLLM 网关。 | **重用/授权**。<br><br>  <br><br>给他最高权限，让他去重构基础设施。                |
