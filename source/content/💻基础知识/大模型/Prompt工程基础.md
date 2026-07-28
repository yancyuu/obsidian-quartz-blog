---
tags:
  - basic-knowledge
  - kb/llm
  - kb/llm/prompt-engineering
  - prompt-engineering
  - few-shot
  - chain-of-thought
---

# Prompt 工程基础

> Prompt 是与大模型交互的唯一接口。同样的模型，好的 Prompt 能让效果天差地别。Prompt 工程是模型应用开发的**第一生产力**。

## 相关笔记

- [LLM基础原理](LLM基础原理.md)：理解模型为何对 Prompt 敏感
- [Token上下文窗口与采样参数](Token上下文窗口与采样参数.md)：temperature 等如何影响输出
- [Agent与Function-Calling基础](Agent与Function-Calling基础.md)：ReAct 等高级 Prompt 模式
- 实战提示词见 `🤖Agent/资源/提示词.md`、`🧚DeepSeek/DeepSeek通用提示词工程.md`

---

## 一、为什么 Prompt 重要

LLM 是**概率预测**模型，Prompt 决定了它从哪个概率分布采样。同样的能力，模糊 Prompt → 模糊结果；精准 Prompt → 精准结果。Prompt 工程（Prompt Engineering）就是**用自然语言编程**。

---

## 二、Prompt 的核心要素

一个高质量 Prompt 通常包含：

| 要素                   | 作用                 | 示例                           |
| ---------------------- | -------------------- | ------------------------------ |
| **角色（Role）**       | 设定视角与专业度     | 「你是一位资深 Python 工程师」 |
| **任务（Task）**       | 明确要做什么         | 「审阅以下代码的安全问题」     |
| **上下文（Context）**  | 提供背景/数据        | 贴入代码、文档                 |
| **约束（Constraint）** | 限定边界             | 「只输出 JSON，不要解释」      |
| **格式（Format）**     | 指定输出结构         | 「字段：severity, issue, fix」 |
| **示例（Example）**    | 演示期望（few-shot） | 给 1-2 个输入→输出样例         |

记忆口诀 **CO-STAR**：Context / Objective / Style / Tone / Audience / Response。

---

## 三、经典 Prompt 模式

### 1. Zero-shot vs Few-shot

- **Zero-shot**：不给示例，直接下达指令。
- **Few-shot**：给几个 `输入→输出` 示例，模型模仿模式。

```
输入：好评 → 情感：正面
输入：差评 → 情感：负面
输入：物流很快 → 情感：
```

> Few-shot 适合**输出格式固定 / 任务难用语言描述**的场景。但消耗 token，且示例的顺序/选择会影响结果。

### 2. Chain-of-Thought（CoT，思维链）⭐

让模型**先推理、再作答**，大幅提升数学/逻辑/多步推理表现。

```
问：食堂里有23个苹果，用掉20个做午餐，又买6个，现有几个？
答：让我们逐步思考。原有23个，用掉20个剩3个，又买6个得9个。答案是9。
```

触发方式：在指令里加「让我们逐步思考」「Step by step」即可。**CoT 是最简单却最有效的技巧之一**。

### 3. Self-Consistency（自洽性）

对同一问题用 CoT **采样多次**，取多数答案（投票）。提升复杂题准确率，代价是多倍 token。

### 4. ReAct（Reason + Act）

推理与行动交替：模型**思考→调用工具→观察结果→再思考**，是 Agent 的基础循环。详见 [Agent与Function-Calling基础](Agent与Function-Calling基础.md)。

---

## 四、结构化输出

让模型输出可程序解析的结构（JSON / XML / Markdown 表格），是工程化的关键。

### 用 XML 标签分区（Anthropic Claude 推荐）

```
请在 <analysis> 标签内分析，在 <answer> 标签内给最终答案。
<analysis>...</analysis>
<answer>...</answer>
```

### JSON 输出

- 明确给出 JSON Schema 或字段说明
- 开启模型的 **JSON Mode / Structured Output**（OpenAI、各大厂商都支持）
- 让模型「先思考再输出 JSON」（避免前置推理破坏 JSON 解析）

---

## 五、调优技巧

1. **具体而非笼统**：「写一封邮件」→「写给客户的道歉邮件，语气诚恳，150字内，提到补偿方案」。
2. **说清「要什么」而非「不要什么」**：正向指令比一堆「不要」更有效。
3. **给模型一个出路**：「如果信息不足，请说明缺什么，不要编造」→ 缓解幻觉。
4. **分步拆解**：复杂任务拆成多轮 / 多个 Prompt 串联。
5. **角色扮演**：赋予专家角色能提升专业性与严谨度。
6. **迭代测试**：Prompt 是经验科学，跑用例集对比迭代。

---

## 六、常见反模式

| 反模式                       | 问题                                  |
| ---------------------------- | ------------------------------------- |
| 指令模糊（「帮我写好点」）   | 模型只能猜                            |
| 塞太多无关上下文             | 噪声干扰，token 浪费，中间遗忘        |
| 让模型「不要想直接答」复杂题 | 丧失 CoT 的推理增益                   |
| 期望 100% 可靠               | LLM 是概率模型，关键场景必须校验/兜底 |
| 一个 Prompt 干所有事         | 难维护，应拆分                        |

---

## 七、面试速答

> **Q：Few-shot 和 Fine-tuning 怎么选？**
> A：Few-shot 零成本、即改即用，适合格式固定/任务明确；Fine-tuning 成本高但能改变模型行为、省 token、提升特定领域效果。优先 Few-shot/Prompt，不够再微调。

> **Q：怎么让 LLM 输出稳定的 JSON？**
> A：明确 Schema + 用 XML 标签分离推理与输出 + 开启 Structured Output + 解析失败重试。详见各厂商 Structured Output 文档。

> **Q：CoT 为什么有用？**
> A：把隐式推理显式化为 token，给模型更多「计算步骤」生成空间，降低单步预测难度。

---

## 参考

- [OpenAI · Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic · Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Learn Prompting（开源教程）](https://learnprompting.org/)
- [Prompt Engineering Guide (dair-ai)](https://www.promptingguide.ai/)
- CoT 论文：[Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)
