  

最近看了几个开源项目↓，给了我一些启发。也想将以人为中心作为目前研究的方向，因为agent开发是一个光谱

Magentic-UI：https://github.com/microsoft/Magentic-UI

agenticSeek：https://github.com/Fosowl/agenticSeek

Granola.ai: https://www.granola.ai/

随着人工智能快速发展，大家都在讨论人类和AI到底怎么才能合作得更好。微软最近推出了Magentic-UI，它能帮人类和AI更好地搭伙干活，这篇文章将从Magentic-UI 为入口去探讨以人为中心的Agent是什么，如何设计。

1. ## 啥是 Magentic-UI？简单来说就是人和AI一起干活的工具
    

Magentic-UI 主打的就是把人摆在中心，让人和AI配合干活的时候能够更轻松、更有效。咱们平时产品和研发经常各玩各的，沟通也比较麻烦。这个Magentic-UI呢，就能提供一种新的、更顺畅的合作模式。

**协同规划的实际应用**

当用户指定任务后，Magentic-UI会在开始执行前创建一个清晰的逐步计划。用户可以：

- 接受智能体创建的计划
    
- 重新创建计划
    
- 通过计划编辑界面添加、删除、编辑或重新生成步骤
    

![](https://qcnzd8v4xqbd.feishu.cn/space/api/box/stream/download/asynccode/?code=ODgwYzMxOWNjMThlZmQ1OWU2N2UxNDZlNmM5ZjY1YzBfWkF1QWxVbWJyZGxacVlHOGV2NXVmNTczcU95TFRiaExfVG9rZW46VEJqVWJnT2dQb2JITER4NjYxd2N6a1QwbkRiXzE3NTI5OTU1Nzc6MTc1Mjk5OTE3N19WNA)

**实时协同执行**

在执行过程中，Magentic-UI会实时显示：

- • 即将采取的具体操作（如点击按钮或输入搜索查询）
    
- • 已访问网页的观察结果
    
- 用户可以随时接管操作并将控制权交还给智能体。
    

![](https://qcnzd8v4xqbd.feishu.cn/space/api/box/stream/download/asynccode/?code=OGQ3NDhlM2NmNTk3YTNiNzM3YzA3YzM1OWU4M2Y0MmJfcWNTT09SSTg1azZIN2FpWGpOTHhFRjJudGl6eVFwZkNfVG9rZW46Vmd3MWJIcEVDb3cxOEh4SVRPWGNhQ1phbkJjXzE3NTI5OTU1Nzc6MTc1Mjk5OTE3N19WNA)

**安全防护机制**

对于被认定为重要的操作，Magentic-UI会通过"批准/拒绝"按钮请求用户许可。用户也可以配置系统对所有操作都请求批准。

![](https://qcnzd8v4xqbd.feishu.cn/space/api/box/stream/download/asynccode/?code=MWE4YzY3NTZhMGM2OWRlNTA0ZmU1MTEzMTQ4MDI4MzhfNlJza3daYkptWWtUcFowbVNhdkdCMVozU1ZiOUVrNERfVG9rZW46SGF2dGJPTEJKbzVkbkh4NzhIUGNpUzJpbkJoXzE3NTI5OTU1Nzc6MTc1Mjk5OTE3N19WNA)

**计划学习与重用**

任务成功完成后，用户可以要求Magentic-UI从这次经验中学习逐步计划。这些计划保存在"计划库"中，供未来类似任务使用。

![](https://qcnzd8v4xqbd.feishu.cn/space/api/box/stream/download/asynccode/?code=MTgzZDM5NjUxMjUwNmI2YWQwYjE4NWIwNDVlODMzN2FfNzVkQXBvemxCdUJOblBvZXhaZU1wTDJhY2huTEszMDFfVG9rZW46WmdPTGJuQ1JMb2JLY0J4N0s4b2NXTVBFblVlXzE3NTI5OTU1Nzc6MTc1Mjk5OTE3N19WNA)

**系统架构设计**

Magentic-UI底层是一个由专门化智能体组成的团队，基于AutoGen的Magentic-One系统适配而来：

1. **协调器(Orchestrator)**：由大语言模型(LLM)驱动的领导智能体，负责与用户进行协同规划，决定何时寻求用户反馈，并将子任务委托给其他智能体。
    
2. **网络浏览器(WebSurfer)**：配备可控浏览器的LLM智能体，能够点击、输入、滚动和访问页面。
    

- WebSurfer 背后是一个 LLM，它会接收来自调度器（Orchestrator）的自然语言任务，比如：“帮我查一下 GitHub 上某个项目的 README 内容”。
    
- 它会将这个指令**翻译成一系列操作计划**（例如：打开页面 → 滚动到 README → 提取文本）。
    

---

**Playwright 实现网页自动化**

- WebSurfer 用的是 **Playwright**（微软开源的浏览器自动化框架，类似 Puppeteer，但更强大）。
    
- 通过 Playwright，WebSurfer 可以控制真实浏览器完成以下操作：
    
    - 打开网页
        
    - 点击按钮
        
    - 输入文本
        
    - 上传文件
        
    - 切换标签页
        
    - 读取 DOM 元素信息
        

这些动作就像一个自动化的“鼠标+键盘+眼睛”，完全模拟一个人在浏览器里操作。

3. **编码器(Coder)**：配备Docker代码执行容器的LLM智能体，可以编写和执行Python及shell命令。
    
4. **文件浏览器(FileSurfer)**：配备Docker容器和文件转换工具的LLM智能体，能够定位、转换文件并回答相关问题。
    

![](https://qcnzd8v4xqbd.feishu.cn/space/api/box/stream/download/asynccode/?code=MzA0ZmI0YjE2MDE1ZGMyMDcxZDM4M2RhMjhiNWM4YWRfR2NCNEVwN2loalBLVXVRQVVXRk5sNjhRZE83SnFJMkpfVG9rZW46QUIzTWJ5amZjb2Z0U3p4RjZQemNnVXVVbnBlXzE3NTI5OTU1Nzc6MTc1Mjk5OTE3N19WNA)

1. ### **为何是以人为中心的设计？**
    

明确：什么是以用户为中心的 Agent？

简单说，就是这个 Agent 必须清楚：

- 用户真正想要啥？
    
- 用户用起来有没有觉得方便？
    
- 用户能不能信任并控制这个Agent？
    

真正的好 Agent，绝不仅仅只是会做一些酷炫的功能或自动完成任务，更重要的是：

**以人为主导，以人的需求和使用体验为最核心标准，让用户用起来舒服又放心。**

2. ### 微软 Magentic-UI 带给我们的启发
    

Magentic-UI 是典型的**以用户为中心**的智能体。它实现了几个明显的用户导向的设计思路：

- **协同规划（用户主导计划制定）**
    
    - 先给用户提供明确的行动计划，用户可以修改、确认后才执行。
        
- **实时协同执行（用户控制执行过程）**
    
    - 用户随时可以给AI提供反馈，甚至直接演示给AI看，AI再照着去学。
        
- **安全机制（用户掌控关键决策）**
    
    - 在做一些关键的操作之前，AI会主动向用户申请确认，而不是自己就做了。
        
- **经验学习（用户推动AI变得更智能）**
    
    - 用户可以告诉AI保存哪些经验，下次再遇到类似任务时，AI能更好地支持用户。
        

---

3. ### 回到我们团队：传统研发方式的问题在哪？
    

咱们团队的现状是比较传统的模式：

- 产品的设计和研发的实现经常分得太开，导致做出来的功能可能不够贴合实际用户需求。
    
- 产品往往根据自己理解的需求设计功能，研发按产品需求做出来，但实际用户并不一定喜欢或者觉得好用。
    

这是因为我们习惯于从技术实现角度（how）去思考问题，而忽略了真正的用户需求（what 和 why）。

---

4. ### 如何真正做到“以用户为中心”设计 Agent？
    

咱们团队想要做好一个真正以用户为中心的 Agent，应该遵循以下几条非常明确的原则：

#### 原则1：让用户（人）主导 Agent 的目标和方向

- 用户始终是任务的主导者，而非被动接受AI提供的结果。
    

举个例子：

用户说：“我想找一下上个月销售最好的产品是哪个？”

Agent 不是简单提供一个数据，而是首先告诉用户：“我打算查一下上个月的销售记录，按销量进行排序，找到销量最高的那个产品。”

用户如果觉得这个计划很好，直接确认；

如果用户觉得计划不够精准，可以说：“不，我想要按照销售额来排名，而不是销量。”

AI就重新调整计划：“明白了，那我会用销售额进行排名。”

**用户明确决定 Agent 干什么。**

---

#### 原则2：用户能随时理解 Agent 在干什么（透明化）

以人为中心的Agent必须透明，让用户知道AI正在做什么、做的怎么样。

比如，当Agent开始执行任务时，会实时告诉用户：

> “我正在查询数据库，数据已找到。” “我正在计算销售额并排序。” “我已经找到排名第一的产品了，是XX。”

这样用户就不会觉得Agent是一个黑盒子，更容易建立信任感。

---

#### 原则3：重要的决定必须由用户拍板（安全感）

比如，Agent发现用户要求删除一批数据的时候，它不会直接执行，而是会先明确提醒用户：

> “你确认删除以下记录吗？删除后不可恢复。” [确认删除] [取消]

**用户拥有最终的控制权，避免Agent做出用户无法接受的后果。**

---

#### 原则4：Agent 可以从用户的反馈中不断进步（人教AI）

以用户为中心的设计必须允许用户简单、直接地“教”Agent如何做得更好：

- 比如用户发现AI提供的数据不准确，可以立即指出：
    

> “你提供的这个销售额数据不对，可能是因为你漏掉了退款订单。”

Agent则自动记住，下次类似任务就会避免同样的错误。

**用户的每一次反馈都让 Agent 更聪明，更贴合用户实际需求。**

---

2. ## 我们团队具体如何落地这个设计理念？
    

在具体的产品设计和研发过程中，如何体现“以用户为中心”的理念？

举一个具体的场景：

**咱们要开发一个“智能数据分析助手”的 Agent 产品：**

- 流程： 产品经理写需求文档 → 研发团队按要求实现 → 用户反馈体验不够好 → 重新迭代，耗时费力。
    
- 以用户为中心的Agent模式：
    
    - 用户直接告诉Agent需求（“我想看最近一个月每个区域的销售额”）。
        
    - Agent自动列出详细计划（怎么查数据、如何统计、用什么图表展示）。
        
    - 用户实时确认或调整这个计划（比如要求按周统计，而不是按月）。
        
    - Agent实时透明执行（告诉用户每一步的进展）。
        
    - 重要操作（如删除、覆盖数据）主动向用户申请确认。
        
    - 用户对结果不满意可直接纠正Agent，Agent学习并记录下来。
        

这样，用户的真实需求始终是产品开发的中心，而产品团队和研发团队只是围绕用户需求而工作，而非孤立地做自己认为对的事情。

**以人为中心的Agent设计思路**

`用户需求 → Agent 提出计划 → 用户确认/修改 → Agent执行并实时反馈 → 用户持续调整 → Agent优化迭代`

---

3. ## 为什么目前要研究人机协同
    

AI模糊了人与数字世界的边界，在执行方面已经做了比较好了。而目前市面上主流的模型是大预言模型LLM，感知到的世界是有限且被压缩的，而市场需求又极其复杂的，所以在很长一段时间，人将是Agent认知世界的桥梁，人与Agent将“互为媒介”。

所以目前agent设计合理的方式是：

- **人**明确任务的目标（what），提供需求和方向（why）。
    
- **Agent**理解人类的需求，高效执行具体任务（how），帮助人类实现目标。
    
- **人**持续教导Agent怎么做得更好；**Agent**不断学习，越来越贴合用户实际需求。
    

**人与Agent不是竞争关系，而是协作伙伴：**

- 人类帮助Agent理解真实世界的需求。
    
- Agent帮助人类更高效地完成数字世界中的具体任务。
    

这就是以用户为中心的Agent设计的核心，也是我们团队应该落地和实践的核心理念。

虽然像Magentic-UI这样的工具很强，但其实人类真正厉害的地方并不是某个具体技能（know-how），因为这些AI都能干，甚至干得比我们好。人类真正厉害的是判断力（知道该干啥）和洞察力（知道为啥要干这个）。

- **判断力（know-what）**：AI可以快速提出很多解决方案，但真正决定用哪个方案的还需要是人。
    
- **洞察力（know-why）**：人类能理解事物背后的真正原因，比如客户的真实需求、市场的变化等等，这部分是模糊的，不确定的，反人性的，这些AI不擅长。
    

所以我们不用焦虑被AI抢饭碗，而应该想清楚我们要干啥，为什么要干。

4. ## Agent 不等于全自主 —— “自主性” 是一个光谱
    

> 核心观点：不要一开始就做“万能 Agent”，要根据场景选择合适的自主级别。

- **自主性划分建议**：
    
    - ✅ 简单任务 → 用低自主 Agent（Level 2–3），流程清晰，可控性高。小火鸭（rag）
        
    - ✅ 高风险任务 → 保留“人在环（Human-in-the-loop）”，让人类掌握关键决策权。
        
    - ✅ 可拆解任务 → 用线性结构比规划执行更高效。（workflow）
        
- **案例启发**：
    
    - [Devin](https://www.cognition-labs.com/) 是“中高自主 + 明确沙盒权限”的典型工程型 Agent。
        
    
    ![](https://qcnzd8v4xqbd.feishu.cn/space/api/box/stream/download/asynccode/?code=MWVkN2Y3YjdmNjk2NzJmZWMwNjMwN2UwMjRkOWM2M2JfMk5yR2psR2hWRkFkSnJueDEzaWx6RFVReU9TTEVLTGxfVG9rZW46QXI4eGI2b2Z1b0pueDZ4Vm5yN2NCdXhEbnJ0XzE3NTI5OTU1Nzc6MTc1Mjk5OTE3N19WNA)
    

🧩 **落地建议**： 先做“低自主、高质量”的垂类 Agent，随着理解能力增强，再逐步扩展自治范围。

---

1. ### 评估机制不能缺位 —— 系统可改进比完美更重要
    

> 核心观点：评估机制不是 QA 附属品，而是工程主干之一。

- 自动评估方式比人工肉眼更快：
    
    - 即使只覆盖少量样本，也要尽早上线可复用的“失败检测器”。
        
    - 建议对每个 Agent 的失败步骤打标签、记录上下文，形成错误归因机制。
        
- **案例启发**：
    
    - [Lamini](https://lamini.ai/) 提供 RAG、分类等评估流水线，帮助开发者持续优化 Agent 表现。
        

🧩 **落地建议**： 在早期就搭建“可持续评估机制”，哪怕是半自动脚本，也优于全靠肉眼。

---

2. ### 工具图谱决定 Agent 能力边界
    

> 核心观点：不是谁写得快，而是谁“知道有哪些工具能调”。

- Agent 的关键能力来自“工具调用”，不是 LLM 本身：
    
    - 推荐从一开始就画出“工具图谱”（Tool Map）：包括 API、插件、检索器、多模态输入等。
        
    - 工具粒度要适中（例如：搜索、选项选择、数据库查询、文件上传等）。
        
- **案例启发**：
    
    - [Glean](https://www.glean.com/) 提供多样化工具模块，让 Agent 能快速组合应对复杂任务。
        

🧩 **落地建议**： 设计 Agent 时，从“有哪些动作可以调”出发，而不是从 Prompt 出发。

---

3. ### 语音不是 UI，而是下一代交互方式
    

> 核心观点：语音 Agent ≠ 语音识别 API + 大模型，而是重新思考系统交互结构。

- 要点包括：
    
    - **语音缓冲**：加“让我想想”填充延迟，避免卡顿感。
        
    - **理解跳跃语句**：容忍不完整、重复的语句，结合上下文还原意图。
        
    - **边听边做**：语音中途就能开始行动，不等用户说完才动。
        
- **案例启发**：
    
    - [Reka AI](https://reka.ai/) 构建统一输入栈，实现图像、语音、文本三模态融合，打造“会听会说”的 Agent。
        

🧩 **落地建议**： 设计语音 Agent 时，重点在于“多轮上下文与容错机制”，而非接口调用。

---

4. ### 多 Agent 协作需要 MCP ，A2A协议思维
    

> 核心观点：不要硬连服务，应该标准化 Agent 与工具之间的通信协议。

- **什么是 MCP（Model-Context-Protocol）？**
    
    - 类似于互联网的 TCP/IP，目的是统一多 Agent 系统之间的通信标准。
        
    - 能将 n 个 Agent 与 m 个工具的连接复杂度，从 n × m 简化为 n + m。
        
- **生态参考**：
    
    - LangChain 推出 Agent Protocol
        
    - Glean 提供 MCP 工具服务器
        
    - AGNTCY 联盟推动 MCP 成为“智能体时代的 HTML”
        

🧩 **落地建议**： 将 MCP 看作未来 Agent 系统间“插拔通用语言”，别自己造轮子。

---

### 🧩 总结：别讲故事，要搭系统

> “Agent 不是做得越智能越好，而是要工程上能跑通、可评估、可控、可扩展。”

如果说过去一年是 Prompt 工程的时代，那么接下来三年，属于懂系统架构与工具调度的工程派。

  

## 附录｜术语 & 案例速查表：

表格 还在加载中，请等待加载完成后再尝试复制

**参考文章**：

https://mp.weixin.qq.com/s/b7DO_6yjkFQCs_8EJSGTMQ

https://mp.weixin.qq.com/s/w66nuKq1O9f-dyWUssoOpg

https://mp.weixin.qq.com/s/3--3nRz_VL9Ul0UUhKQhgQ

  