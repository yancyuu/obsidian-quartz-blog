开源地址：https://github.com/microsoft/agent-lightning

可以用于调试Agent的提示词和function-tools的准确度。

## ⚡核心功能

- 无需（几乎）**任何代码更改，**即可将您的代理程序变成可优化的强大工具！💤
- 可以使用**任何**代理框架（LangChain、OpenAI Agent SDK、AutoGen、CrewAI、Microsoft Agent Framework 等）构建；甚至无需代理框架（Python OpenAI）。应有尽有！🤖
- 在多智能体系统中，**选择性地优化一个或多个智能体。🎯**
- 融合了强化学习、自动提示优化、监督式微调等**算法。🤗**

请访问我们的[文档网站](https://microsoft.github.io/agent-lightning/)了解更多信息。

[![Agent-Lightning 核心快速入门](https://github.com/microsoft/agent-lightning/raw/main/docs/assets/readme-diff.svg)](https://github.com/microsoft/agent-lightning/blob/main/docs/assets/readme-diff.svg)

## ⚡ 安装


```shell
pip install agentlightning
```

要获取最新的每日构建版本（包含前沿功能），您可以从 Test PyPI 安装：

```shell
pip install --upgrade --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ agentlightning
```

更多详情请参阅我们的[安装指南。](https://microsoft.github.io/agent-lightning/stable/tutorials/installation/)

要开始使用 Agent-lightning，请查看我们的[文档](https://microsoft.github.io/agent-lightning/)和[示例](https://github.com/microsoft/agent-lightning/blob/main/examples)。

## ⚡ 文章


- 2025年11月4日[使用 Tinker ✕ Agent-lightning Medium 调整任何 AI 代理](https://medium.com/@yugez/tuning-any-ai-agent-with-tinker-agent-lightning-part-1-1d8c9a397f0e)。另请参阅[第 2 部分](https://medium.com/@yugez/tuning-any-ai-agent-with-tinker-agent-lightning-part-2-332c5437f0dc)。
- 2025年10月22日[不再出现重标记化漂移：通过OpenAI兼容API返回Token ID对于Agent RL](https://blog.vllm.ai/2025/10/22/agent-lightning.html) vLLM至关重要（博客文章）。另见[知乎文章](https://zhuanlan.zhihu.com/p/1965067274642785725)。
- 2025年8月11日[使用强化学习训练人工智能代理编写和自我纠正SQL](https://medium.com/@yugez/training-ai-agents-to-write-and-self-correct-sql-with-reinforcement-learning-571ed31281ad) Medium。
- 2025年8月5日[Agent Lightning：使用强化学习训练任何人工智能代理](https://arxiv.org/abs/2508.03680)arXiv 论文。
- 2025年7月26日，[我们发现了一种利用强化学习训练任何人工智能代理的方法，几乎​​无需修改任何代码。Reddit](https://www.reddit.com/r/LocalLLaMA/comments/1m9m670/we_discovered_an_approach_to_train_any_ai_agent/)。
- 2025年6月6日[Agent Lightning - 微软研究院](https://www.microsoft.com/en-us/research/project/agent-lightning/)项目页面。

## ⚡ 社区项目


- [DeepWerewolf——](https://github.com/af-74413592/DeepWerewolf)使用 AgentScope 和 Agent Lightning 构建的中国狼人游戏中的智能体强化学习训练案例研究。
- [AgentFlow](https://agentflow.stanford.edu/) — 一个模块化的多智能体框架，它将规划器、执行器、验证器和生成器智能体与 Flow-GRPO 算法相结合，以解决长期、稀疏奖励任务。

## ⚡ 建筑

Agent Lightning 将组件数量降至最低，让您可以专注于创意本身，而不是底层架构。您的代理程序将继续照常运行；您仍然可以使用任何您喜欢的代理框架；您可以添加轻量级`agl.emit_xxx()`辅助程序，或者让追踪器收集每个提示、工具调用和奖励。这些事件会变成结构化的跨度，流入 LightningStore，这是一个中央枢纽，用于保持任务、资源和追踪的同步。

在存储的另一侧，放置着你选择或自己编写的算法。该算法读取跨度数据，从中学习，并发布更新后的资源，例如改进的提示模板或新的策略权重。训练器将所有这些功能连接起来：它将数据集流式传输到运行器，在存储和算法之间传递资源，并在改进生效时更新推理引擎。你可以就此停止，也可以让同样的循环继续运行下去。

无需重写代码，无需合约锁定，只有从首次推出到稳步改进的清晰路径。

[![代理闪电架构](https://github.com/microsoft/agent-lightning/raw/main/docs/assets/readme-architecture.svg)](https://github.com/microsoft/agent-lightning/blob/main/docs/assets/readme-architecture.svg)