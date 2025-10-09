

Owner: yancy yu

重排模型（reranker）在不同的配置和应用场景中有不同的需求和适用性。以下是对每个模型的详细介绍以及其所需的硬件配置和适用场景：

## 常用模型

### **1. BCE-Reranker-Base_v1**

•	**语言支持**: 英文（en），中文（zh）

•	**硬件配置需求**: 中等配置（企业级服务器，具有16-32GB内存，4-8核CPU，支持GPU加速，如NVIDIA T4或V100）

•	**适用场景**: 适用于一般的信息检索和排序任务，如搜索引擎优化，内容推荐系统。

### **2. BGE-Reranker-Base**

•	**语言支持**: 英文（en），中文（zh）

•	**硬件配置需求**: 中等配置（企业级服务器，16-32GB内存，4-8核CPU，支持GPU加速，如NVIDIA T4或V100）

•	**适用场景**: 适用于基础的信息检索和排序任务，能够处理多语言内容，但主要针对中英文。

### **3. BGE-Reranker-Large**

•	**语言支持**: 英文（en），中文（zh）

•	**硬件配置需求**: 较高配置（企业级服务器，32-64GB内存，8-16核CPU，强力GPU，如NVIDIA V100或A100）

•	**适用场景**: 适用于大规模信息检索和排序任务，如大型电商平台、综合搜索引擎等，需要更高的精度和性能。

### **4. BGE-Reranker-V2-Gemma**

•	**语言支持**: 英文（en），中文（zh），多语言（multilingual）

•	**硬件配置需求**: 较高配置（企业级服务器，32-64GB内存，8-16核CPU，强力GPU，如NVIDIA V100或A100）

•	**适用场景**: 适用于多语言环境中的高级信息检索和排序任务，支持多种语言的复杂应用场景，如全球化搜索引擎、多语言内容平台。

### **5. BGE-Reranker-V2-M3**

•	**语言支持**: 英文（en），中文（zh），多语言（multilingual）

•	**硬件配置需求**: 较高配置（企业级服务器，32-64GB内存，8-16核CPU，强力GPU，如NVIDIA V100或A100）

•	**适用场景**: 适用于多语言环境中的高级信息检索和排序任务，尤其适合需要处理多种语言内容的大型平台。

### **6. BGE-Reranker-V2-MiniCPM-Layerwise**

•	**语言支持**: 英文（en），中文（zh），多语言（multilingual）

•	**硬件配置需求**: 较高配置（企业级服务器，32-64GB内存，8-16核CPU，强力GPU，如NVIDIA V100或A100）

•	**适用场景**: 适用于多语言环境中的信息检索和排序任务，尤其是对模型大小和性能有严格要求的应用场景。

### **7. Jina-Reranker-V2**

•	**语言支持**: 英文（en），中文（zh），多语言（multilingual）

•	**硬件配置需求**: 较高配置（企业级服务器，32-64GB内存，8-16核CPU，强力GPU，如NVIDIA V100或A100）

•	**适用场景**: 适用于需要高精度排序的多语言环境，如多语言问答系统、多语言推荐系统等。

<aside>
💡 在智能聊天机器人场景中，使用重排序（rerank）模型来优化检索增强生成（Retrieval-Augmented Generation, RAG）是一个不错的选择。为了选择最合适的重排序模型，以下是一些考量因素：

1.	**语言支持**：确保模型支持所需的语言。

2.	**性能要求**：根据聊天机器人的实时性要求选择性能合适的模型。

3.	**硬件资源**：考虑现有硬件资源，特别是GPU的配置和可用性。

4.	**多语言支持**：如果需要支持多种语言，选择支持多语言的模型。

</aside>

## **自己部署推荐模型**

**1. BGE-Reranker-V2-Gemma**

•	**语言支持**: 英文（en），中文（zh），多语言（multilingual）

•	**硬件需求**: 较高配置，32-64GB 内存，8-16 核 CPU，强力 GPU 如 NVIDIA V100 或 A100

•	**适用场景**: 适用于多语言环境中的高级信息检索和排序任务，支持复杂和大规模的应用场景。对于需要多语言支持的智能聊天机器人，这是一个很好的选择。

**2. BGE-Reranker-V2-M3**

•	**语言支持**: 英文（en），中文（zh），多语言（multilingual）

•	**硬件需求**: 较高配置，32-64GB 内存，8-16 核 CPU，强力 GPU 如 NVIDIA V100 或 A100

•	**适用场景**: 适用于多语言环境中的高级信息检索和排序任务。适合需要处理多种语言内容的智能聊天机器人。

**3. Jina-Reranker-V2**

•	**语言支持**: 英文（en），中文（zh），多语言（multilingual）

•	**硬件需求**: 较高配置，32-64GB 内存，8-16 核 CPU，强力 GPU 如 NVIDIA V100 或 A100

•	**适用场景**: 适用于需要高精度排序的多语言环境，如多语言问答系统和推荐系统。对于聊天机器人需要高精度的回答排序，这也是一个不错的选择。

## 外部供应商模型推荐：jina

**MKQA (Multilingual Knowledge Questions and Answers)**

Recall@10 是一种评估指标，用于衡量在前10个检索结果中，检索到正确答案的比例⬇️

![Untitled](Untitled%2029.png)

**BEIR (Heterogeneous Benchmark on Diverse IR Tasks)**

**BEIR** 是一个用于评估信息检索模型性能的多任务基准数据集，涵盖了多种不同的信息检索任务和领域。该基准数据集包含了多个子数据集，旨在测试模型在各种任务和领域中的表现。

**NDCG@10（Normalized Discounted Cumulative Gain at 10）** 是一种评估排序模型性能的指标。具体来说，NDCG@10 用来衡量模型在前10个检索结果中的效果，结合了相关性和结果排序位置。其分数越高，表示模型在信息检索任务中的排序效果越好。⬇️

![](https://jina.ai/assets/image_Beir.37f391a4.png)

**ToolBench 数据集**

**ToolBench** 是一个包含超过 16,000 个公共 API 以及对应合成使用说明的基准数据集。它用于评估模型在单一和多 API 设置下的表现。该数据集包括合成生成的使用说明，模拟了真实世界中使用 API 的多样性和复杂性。

**Recall@3** 用于衡量在前 3 个检索结果中检索到正确答案的比例。具体来说，Recall@3 表示模型在前 3 个结果中包含正确答案的频率。⬇️

![](https://jina.ai/assets/image_ToolBench.ec0d2a39.png)

**NSText2SQL**

**NSText2SQL** 是一个用于评估自然语言到 SQL 查询转换模型性能的数据集。这个数据集主要用于测试模型将自然语言问题转换成 SQL 查询的能力。这在数据库查询和信息检索系统中非常重要，因为它能够帮助用户通过自然语言直接查询数据库。

![](https://jina.ai/assets/image_NSText2SQL.d2e1687d.png)

**CodeSearchNet 数据集**

**CodeSearchNet** 是一个评估代码检索和相关任务的基准数据集。该数据集结合了注释字符串（docstring）和自然语言格式的查询，并包含与查询相关的标记代码段。它主要用于测试和评估模型在代码检索任务中的表现。

![](https://jina.ai/assets/image_CodeSearchNet.e74824d2.png)

**Throughput of Jina Reranker v2 on RTX 4090**

**Throughput** 是衡量模型在特定硬件配置下处理文档的效率。在这里，评估的是 **Jina Reranker v2** 在 **RTX 4090 GPU** 上的吞吐量。具体指标是每 50 毫秒内处理的文档数量。这一评估有助于理解模型在高性能 GPU 上的实际运行效率。

![](https://jina.ai/assets/image_RTX4090.b9ae5530.png)

### 价格

```
• 免费送100万token
• 充值10亿token，大概20美元，$0.02 每 1M（100万） 
tokens = 0.14元/100万 （一次请求大概2000-8000token），大概可以进行125,000-500,000次请求，每次请求0.0028元-0.0112元
```

![Untitled](Untitled%2030.png)

### 总结

从图表数据可以看出，对于中文重排序任务，**bge-reranker-v2-m3** 和 **jina-reranker-v2-base-multilingual** 的表现是相同的，评分均为 0.470。这表明在这两个模型中，没有明显的优劣之分，两者在中文任务中的表现相当。

**选择建议**基于多个数据集的对比分析，**jina-reranker-v2-base-multilingual** 在中文任务中的表现最为优异，尤其是在 NSText2SQL、CodeSearchNet 和 Throughput 数据集上的表现显著领先。因此，推荐在中文场景中使用 [**jina-reranker-v2-base-multilingual**](https://jina.ai/reranker) 模型。