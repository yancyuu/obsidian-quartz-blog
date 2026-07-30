---
tags:
  - ai
  - ai-agent
  - rag
  - architecture
  - agentic-rag
  - knowledge-base
---

### 引用：[[../../🤖AI应用/RAG/2025-0625 🏗️ RAG系统重构笔记]]

## 1. 架构演进路径

表格

复制

|阶段|技术栈|优势|痛点|适用场景|
|:--|:--|:--|:--|:--|
|MVP验证|Dify|零代码快速验证、可视化调试|定制化限制、性能瓶颈|产品概念验证|
|功能扩展|LangGraph|复杂工作流、状态管理|学习曲线陡峭、调试复杂|复杂业务逻辑|
|性能优化|手搓实现|完全控制、性能最优|开发成本高、维护困难|高性能要求|
|生产就绪|Pydantic-AI|类型安全、开发效率、可维护|相对新兴|企业级应用|
## 2.Agent核心架构分类

```Plain
Agentic RAG
├── Multi-Agent RAG
│   ├── 专业化分工 (Router → Searcher → Writer)
│   └── 协作决策 (Planning → Execution → Verification)
└── Self-Reflective RAG
    ├── Self-RAG (自评估迭代优化)
    ├── Self-Corrective RAG (错误检测修正)
    └── Self-Adaptive RAG (动态策略调整)
└── Tool-Augmented RAG 
    ├── 检索即工具 (Search & Lookup Tool)
    ├── 领域工具链 (SQL、API、计算器)
    └── 动态工具选择 (ReAct / Function-Call)
```

## 3. 技术选型对比矩阵

| 维度    | Multi-Agent RAG | Self-Reflective RAG | Tool-Augmented RAG          |
| :---- | :-------------- | :------------------ | :-------------------------- |
| 核心机制  | 多 Agent 协作      | 单 Agent 自反思迭代       | 把检索/计算/API 封装为工具，由 LLM 动态调用 |
| 适用复杂度 | 高（多步骤、多角色）      | 中（专精问答）             | 高（需实时数据、多源数据）               |
| 系统开销  | 高（多模型并行）        | 中（单模型迭代）            | 中（工具调用耗时）                   |
| 维护成本  | 高（协调协议）         | 低（单一链路）             | 中（工具版本治理）                   |
| 响应延迟  | 高（串/并行开销）       | 中（2-3 轮迭代）          | 中（工具调用次数）                   |
## 4.业务场景适配策略

|场景类型|推荐架构|说明|
|:--|:--|:--|
|复杂研究分析（市场/投资/学术）|Multi-Agent RAG|拆分"检索-分析-写作"角色，并行产出报告|
|专业知识问答（医疗/法律/零售 FAQ）|Self-Reflective RAG|2-3 轮自评即可保证准确率，延迟可控|
|实时数据+计算混合任务（财报对比、指标聚合）|Tool-Augmented RAG|把 SQL、Python、Search 都当工具，LLM 自行组合|
|个人助手（学习辅导、日程规划）|Self-Reflective RAG|单 Agent 足够，成本低|
|企业级流程（合规检查、多维决策）|Multi-Agent + Tool|用 Multi-Agent 分工，内部再调用工具链|
## 5.技术实现路径

### ① 意图识别流程
#### 上下文工程&整体流程
![[../../🤖AI应用/RAG/images/反思型rag流程图.svg]]


### ② 反思式 RAG 核心伪代码（Self-Reflective 分支示例）

```Python

def self_reflective_rag(query):
    docs = retrieve(query)
    answer = generate(query, docs)
    rel_score = evaluate(answer, query)        # 相关性
    fact_score = evaluate_fact(answer, docs)   # 事实性
    if rel_score < threshold or fact_score < threshold:
        query2 = refine_query(query, answer)
        docs = retrieve(query2)
        answer = generate(query2, docs)
    return answer
```

### ③ Tool-Augmented RAG 伪代码（工具链示例）
```python
tools = [search_tool, sql_tool, calculator]   # 注册工具
def tool_rag(query):
    plan = llm.plan(query, tools)               # 生成调用计划
    for step in plan:
        result = step.tool(**step.args)         # 执行单步工具
        context.append(result)
    return llm.generate(query, context)

```

> [!NOTE] 选型指南
> **FAQ 为主、成本低** → Self-Reflective RAG  
> **多角色、长流程** → Multi-Agent RAG  
> **要实时数据或计算** → Tool-Augmented RAG  
> **既长流程又要实时数据** → Multi-Agent + Tool 混合


## 选型示例分析：

>[!TIP] 注意：
>下文提到的“反思机制”仅借用了 Self-RAG 的**推理阶段思想**（Retrieve → Critique → Refine → Generate），**并未**对模型进行带有 `[Retrieve]/[Supported]` 等特殊 token 的额外训练，因此严格属于**反思式 RAG**，而非论文定义的 Self-RAG。

### 一、反思式 RAG 的四个核心阶段

|阶段|关键动作|实现方式|
|:--|:--|:--|
|**1. Retrieve**|向量召回 + 权限过滤|先用向量检索拿到候选文档，再按用户部门/角色标签秒级过滤|
|**2. Critique**|推理模型打分|用 `reason_model` 综合“检索结果 + 历史日志 + 示例”判断要不要修订|
|**3. Refine**|日志回写 + 再召回|不通过则记录反馈，立即重新检索，最多 2-3 轮|
|**4. Generate**|聊天模型输出|`chat_model` 基于最终文档生成流式回答|

**核心特点**

1. 双模型：推理模型专职“批判”，聊天模型专职“生成”
2. 迭代优化：每轮日志写回上下文，下一轮自动纠偏
3. 自适应终止：拿到有效结果或达到最大轮次立即退出，保证秒级响应
---

### 二、小火鸭 AGENT 选型：为什么用反思式 RAG？

#### 1. 业务特征

- **单一领域**：零售/服务业 FAQ
- **秒级响应**：门店对话不能让用户等
- **准确性高**：答错直接影响成交
- **成本敏感**：中小企业，预算有限

#### 2. 反思式 RAG 的匹配优势

|维度|反思式 RAG 做法|带给小火鸭的收益|
|:--|:--|:--|
|**专业化**|单领域深度迭代 + 自反思打分|错误率下降 35%，无需多 Agent 协调|
|**性能**|2-3 轮内自适应停止|首 token < 1.2s，平均完成 2.1 轮|
|**运维**|一条链路、两套模型|定位问题只需看同一组日志|
|**场景**|FAQ + 知识查询占 90% 流量|反思机制恰好覆盖高频"检索-校验"模式|

#### 3. 不是 Self-RAG 的原因
- **无额外训练**：未引入 `[Retrieve]/[NoRetrieve]/[Supported]` 等特殊 token
- **无监督微调**：完全靠通用大模型 + Prompt 工程实现
- **可升级路径**：后续若收集到足够标注数据，可用 LoRA 把 Critique 模型微调成真・Self-RAG，当前阶段则保持"反思式"称呼，避免与论文定义混淆。

**结论**: 对于小火鸭这类专业领域的知识助手，反思型RAG提供了最佳的准确性-成本-维护性平衡，是理想的架构选择。