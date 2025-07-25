

Openai主要用的模型有哪些，区别是什么，有哪些用途，希望对大家有帮助。

1. GPT-4 家族的模型，包括 gpt-4 和 gpt-4-0314，最近又出了一个gpt-4-0613。使用的方式和 ChatGPT 的模型一样，其中带日期的模型表示是一个模型快照。也就是模型不会随着时间迁移不断更新。GPT-4 的模型现在还很昂贵，输入 1000 个 Token 需要 0.03 美分，生成 1000 个 Token 则需要 0.06 美分。一般呢，我都是拿它帮我写代码，准确率会比较高。
2. GPT-3.5 家族的模型，包括 ChatGPT 所使用的 gpt-3.5-turbo 或者 gpt-3.5-turbo-0301, gpt-3.5-turbo-0613，gpt-3.5-turbo-16k 以及 text-davinci-003 和 text-davinci-002 这两个模型。前者(gpt-3.5)专门针对对话的形式进行了微调，并且价格便宜，无论输入输出，1000 个 Token 都只需要 0.002 美分, gpt-3.5-turbo-16k可以支持更长的上下文。后两个里，003 的模型有一个特殊的功能，就是支持“插入文本”这个功能。003 也是基于强化学习微调的，而 002 则是做了监督学习下的微调。text-davinci-003 和 002 模型比 3.5-turbo 要贵 10 倍，但是输出更稳定。你可以根据自己的需要来决定。
3. 剩下的，则是 Ada、Babbage、Curie 以及 Davinci 这四个基础模型。只适合用于下达单轮的指令，不适合考虑复杂的上下文和进行逻辑推理。这四个模型按照首字母排序，价格越来越贵，效果越来越好。而且我们如果要微调一个属于自己的模型，也需要基于这四个基础模型。
    
    所有模型的名字都来自科学史上的名人。Ada 来自人类史上第一位程序员 Ada，她也是著名诗人拜伦的女儿。而 Babadge 则是设计了分析机的巴贝奇，巴贝奇分析机也被认为是现代计算机的前身。Curie 则是指居里夫人，Davinci 是指达芬奇。
    
4. 最后则是 text-embedding-ada-002、text-similarity-ada-001 这些专门用途模型。一般来说，我们通过这个模型来获取 Embedding，再用在其他的机器学习模型的训练，或者语义相似度的比较上。

OpenAI 对不同模型的限速是不一样的，支持的token长度也是不一样的。具体可以下方这个链接查看：[https://platform.openai.com/docs/guides/rate-limits/overview](https://platform.openai.com/docs/guides/rate-limits/overview)