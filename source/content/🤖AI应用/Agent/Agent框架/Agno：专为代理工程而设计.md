---
tags:
  - ai
  - ai-agent
  - python
  - agent-framework
  - agno
  - fastapi
---

发现了一个宝藏多Agent框架，也是我做多Agent系统的首选框架。

- 开源项目地址：https://github.com/agno-agi/agno
- 文档：[docs.agno.com](https://docs.agno.com/)

Agno 还提供了一个即用型 FastAPI 应用（名为 AgentOS），用于在生产环境中为您的代理、团队和工作流提供服务。AgentOS 具有无状态、可水平扩展和面向规模化设计等特点，可助您在构建 AI 产品方面取得显著优势。
## AgentOS - 多智能体系统的生产运行时环境

构建代理很容易，但运行它们却很难，而 AgentOS 正是为了解决这个问题而生的。AgentOS 是一个高性能运行时环境，专为生产环境中的多代理系统而设计。其主要特性包括：

1. **预构建的 FastAPI 应用**：AgentOS 附带一个即用型 FastAPI 应用，用于协调您的代理、团队和工作流程。这能让您在构建 AI 产品时获得巨大的先机。
    
2. **集成控制平面**：[AgentOS UI](https://os.agno.com/)直接连接到您的运行时，让您可以实时测试、监控和管理您的系统，从而赋予您对系统无与伦比的控制权。
    
3. **隐私设计**：AgentOS 完全运行在您的云端，确保数据完全私密。所有数据都不会离开您的系统。这对于注重安全性的企业而言是理想之选。
    

## 设置您的编码代理以使用 Agno

为了帮助语言学习模型（LLM）和人工智能助手理解和浏览Agno的文档，我们提供了[llms.txt](https://docs.agno.com/llms.txt)或[llms-full.txt](https://docs.agno.com/llms-full.txt)文件。这些文件专为人工智能系统高效解析和引用我们的文档而设计。

### IDE 集成

在构建 Agno 代理时，将 Agno 文档作为 IDE 中的参考资料是加快开发速度的绝佳方法。以下是如何与 Cursor 集成：

1. 在光标设置中，转到“光标设置”菜单。
2. 找到“索引和文档”部分。
3. 添加`https://docs.agno.com/llms-full.txt`到文档网址列表中。
4. 保存更改。

## 速度表现

如果您使用 Agno 进行构建，默认情况下即可获得一流的性能保障。我们对性能的极致追求至关重要，因为即使是简单的 AI 工作流也可能生成数百个代理，而且许多任务都需要长时间运行——无状态的横向扩展是成功的关键。

在 Agno，我们从三个维度优化性能：
1. **代理性能**：我们优化静态操作（实例化、内存占用）和运行时操作（工具调用、内存更新、历史记录管理）。
2. **系统性能**： AgentOS API 默认采用异步方式，内存占用极低。该系统无状态且可水平扩展，并着重防止内存泄漏。它支持知识摄取期间的并行和批量嵌入生成、后台任务中的指标收集以及其他系统级优化。
3. **代理的可靠性和准确性**：通过评估进行监控，我们稍后会探讨这一点。

### 代理速度对比

让我们来测量一下实例化一个代理程序所需的时间和其内存占用情况。以下是相关数据（上次测量时间为 2025 年 10 月，使用 Apple M4 MacBook Pro):

- **代理实例化时间**：平均约 3 微秒
- **内存占用**：平均约 6.6Kib

Agno Agents 的实例化速度**比 Langgraph 快 529 倍**，**比 PydanticAI 快 57 倍**，**比 CrewAI 快 70 倍**。此外，Agno Agents 的**内存使用量也比 Langgraph 低 24 倍**，**比 PydanticAI 低 4 倍**，**比 CrewAI 低 10 倍**。

以 Agno 为基准，我们可以看到：

|Metric|Agno|Langgraph|PydanticAI|CrewAI|
|---|---|---|---|---|
|**Time (seconds)**|1×|529× slower|57× slower|70× slower|
|**Memory (MiB)**|1×|24× higher|4× higher|10× higher|

基准测试的确切数据:

|Metric|Agno|Langgraph|PydanticAI|CrewAI|
|---|---|---|---|---|
|**Time (seconds)**|0.000003|0.001587|0.000170|0.000210|
|**Memory (MiB)**|0.006642|0.161435|0.028712|0.065652|
>[!tips] Agno 代理的设计目标是性能，虽然会与其他框架进行基准测试，但我们应该注意，准确性和可靠性比速度更重要。

