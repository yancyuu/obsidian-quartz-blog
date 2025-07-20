#LangChain #agent 

在第 11 讲里，我为你讲解了如何把各种资料的内容向量化，然后通过 llama-index 建立对应的索引，实现对我们自己的文本资料的问答。而在过去的 3 讲里面，我们又深入了解了如何使用 Langchain。Langchain 能够便于我们把 AI 对语言的理解和组织能力、外部各种资料或者 SaaS 的 API，以及你自己撰写的代码整合到一起来。通过对这些能力的整合，我们就可以通过自然语言完成更加复杂的任务了，而不仅仅只是能闲聊。

不过，到目前为止。我们所有基于 ChatGPT 的应用，基本都是“单项技能”，比如前面关于“藤野先生”的问题，或者上一讲里查询最新的天气或者通过 Python 算算术。本质上都是限制 AI 只针对我们预先索引的数据，或者实时搜索的数据进行回答。

## **支持多种单项能力，让 AI 做个选择题**

但是，如果我们真的想要做一个能跑在生产环境上的 AI 聊天机器人，我们需要的不只一个单项技能。它应该针对你自己的数据有很多个不同的“单项技能”，就拿我比较熟悉的电商领域来说，我们至少需要这样三个技能。

**我们需要一个“导购咨询”的单项技能，能够查询自己商品库里的商品信息为用户做导购和推荐。**

**然后需要一个“售中咨询”的单项技能，能够查询订单的物流轨迹，对买了东西还没有收到货的用户给出安抚和回复。**

**最后还需要一个“FAQ”的单项技能，能够把整个电商网站的 FAQ 索引起来，当用户问到退货政策、运费、支付方式等问题的时候，我们可以从 FAQ 里面拿到对应的答案，回复给用户。**

同时，对于这三个单项技能，AI 要能够自己判断什么时候该用什么样的技能。而不是需要人工介入，或者写一堆 if…else 的代码。

在学习了这么多讲的内容之后，你可以先想想，你有没有什么办法可以通过 ChatGPT 做到这些呢？直接一次性提供三个“单项技能”，还要在三个单项技能之间选择合适的技能，的确不是靠简单的几行代码或者 LLMChain 能够解决的。

但是我们可以采用一个在写大型系统的时候常用的思路，就是“分而治之”。对于每一个单项技能，我们都可以通过之前几讲学习的内容，把它们变成一个 LLMChain。然后，对于用户问的问题，我们不妨先问问 AI，让它告诉我们应该选用哪一个 LLMChain 来回答问题好了。

我们在下面就写了这样一段代码，通过提示语让 AI 做一个选择题。

import openai, os

openai.api_key = os.environ.get("OPENAI_API_KEY")

from langchain.prompts import PromptTemplate

from langchain.llms import OpenAIChat

from langchain.chains import LLMChain

llm = OpenAIChat(max_tokens=2048, temperature=0.5)

multiple_choice = """

请针对 >>> 和 <<< 中间的用户问题，选择一个合适的工具去回答她的问题。只要用A、B、C的选项字母告诉我答案。

如果你觉得都不合适，就选D。

>>>{question}<<<

我们有的工具包括：

A. 一个能够查询商品信息，为用户进行商品导购的工具

B. 一个能够查询订单信息，获得最新的订单情况的工具

C. 一个能够搜索商家的退换货政策、运费、物流时长、支付渠道、覆盖国家的工具

D. 都不合适

"""

multiple_choice_prompt = PromptTemplate(template=multiple_choice, input_variables=["question"])

choice_chain = LLMChain(llm=llm, prompt=multiple_choice_prompt, output_key="answer")

对应的，我们可以试试问不同的问题，看看它能不能选择一个正确的工具。

问题 1：

question = "我想买一件衣服，但是不知道哪个款式好看，你能帮我推荐一下吗？"

print(choice_chain(question))

输出结果：

{'question': '我想买一件衣服，但是不知道哪个款式好看，你能帮我推荐一下吗？', 'answer': '\n\nA. 一个能够查询商品信息，为用户进行商品导购的工具。'}

问题 2：

question = "我有一张订单，订单号是 2022ABCDE，一直没有收到，能麻烦帮我查一下吗？"

print(choice_chain(question))

输出结果：

{'question': '我有一张订单，订单号是 2022ABCDE，一直没有收到，能麻烦帮我查一下吗？', 'answer': '\n\nB. 一个能够查询订单信息，获得最新的订单情况的工具。'}

问题 3：

question = "请问你们的货，能送到三亚吗？大概需要几天？"

print(choice_chain(question))

输出结果：

{'question': '请问你们的货，能送到三亚吗？大概需要几天？', 'answer': '\n\nC. 一个能够搜索商家的退换货政策、运费、物流时长、支付渠道、覆盖国家的工具。'}

问题 4：

question = "今天天气怎么样？"

print(choice_chain(question))

输出结果：

{'question': '今天天气怎么样？', 'answer': '\n\nD. 都不合适，因为这个问题需要的是天气预报信息，我们需要提供一个天气预报查询工具或者引导用户去查看天气预报网站或应用程序。'}

可以看到，我们试了四个问题，ChatGPT 都给出了正确的答案。在拿到答案之后，你可以直接再通过一个 TransformChain，去匹配返回结果的前缀，看看是 A、B、C、D 中的哪一个，再来决定后面可以去调用哪个 LLMChain。

## **Langchain 里面的中介与特工：Agent**

这样一个“分治法”的思路，你在真实的业务场景中一定会遇到的。无论是哪行哪业的客服聊天机器人，其实都会有能够直接通过资料库就回答的用户问题，也会有和用户自己或者公司产品相关的信息，需要通过检索的方式来提供。所以，这样一个“先做一个选择题”的思路，Langchain 就把它发扬光大了，建立起了 Agent 这个抽象概念。

Agent 翻译成中文，有两个意思。一个叫做代理人，比如在美国你买房子、租房子，都要通过 Real Estate Agent，也就是“房产代理”，其实就是我们这里说的“中介”。另一个意思，叫做“特工”，这是指 Agent 是有自主行动能力的，它可以根据你提出的要求，直接使用提供的工具采取行动。它不只是做完选择题就完事儿了，而是直接拿起选中的工具进行下一步的行动。Langchain 的 Agent 其实这两个意思都包含，可以说名字取得是非常得当了。

下面我们来看看上面这个例子，我们怎么通过 Langchain 提供的 Agent 直接采取行动来解决问题。

from langchain.agents import initialize_agent, Tool

from langchain.llms import OpenAI

llm = OpenAI(temperature=0)

def search_order(input: str) -> str:

return "订单状态：已发货；发货日期：2023-01-01；预计送达时间：2023-01-10"

def recommend_product(input: str) -> str:

return "红色连衣裙"

def faq(intput: str) -> str:

return "7天无理由退货"

tools = [

Tool(

name = "Search Order",func=search_order,

description="useful for when you need to answer questions about customers orders"

),

Tool(name="Recommend Product", func=recommend_product,

description="useful for when you need to answer questions about product recommendations"

),

Tool(name="FAQ", func=faq,

description="useful for when you need to answer questions about shopping policies, like return policy, shipping policy, etc."

)

]

agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

这段代码由三个部分组成。

首先，我们定义了三个函数，分别叫做 search_order、recommend_product 以及 faq。它们的输入都是一个字符串，输出是我们写好的对于问题的回答。

然后，我们针对这三个函数，创建了一个 Tool 对象的数组，把这三个函数分别封装在了三个 Tool 对象里面。每一个 Tool 的对象，在函数之外，还定义了一个名字，并且定义了 Tool 的 description。这个 description 就是告诉 AI，这个 Tool 是干什么用的。就像这一讲一开始的那个例子一样，AI 会根据问题以及这些描述来做选择题。

最后，我们创建了一个 agent 对象，指定它会用哪些 Tools、LLM 对象以及 agent 的类型。在 agent 的类型这里，我们选择了 zero-shot-react-description。这里的 zero-shot 就是指我们在课程一开始就讲过的“零样本分类”，也就是不给 AI 任何例子，直接让它根据自己的推理能力来做决策。而 react description，指的是根据你对于 Tool 的描述（description）进行推理（Reasoning）并采取行动（Action）。

在有了这个 agent 之后，我们不妨尝试一下，直接对着这个 Agent，来重新问一遍刚才的三个问题。

问题 1：

question = "我想买一件衣服，但是不知道哪个款式好看，你能帮我推荐一下吗？"

result = agent.run(question)

print(result)

输出结果：

> Entering new AgentExecutor chain...

I need to recommend a product.

Action: Recommend Product

Action Input: Clothes

Observation: 红色连衣裙

Thought: I now know the final answer.

Final Answer: 我推荐红色连衣裙。

问题 2：

question = "我有一张订单，订单号是 2022ABCDE，一直没有收到，能麻烦帮我查一下吗？"

result = agent.run(question)

print(result)

输出结果：

> Entering new AgentExecutor chain...

I need to find out the status of the order

Action: Search Order

Action Input: 2022ABCDE

Observation: 订单状态：已发货；发货日期：2023-01-01；预计送达时间：2023-01-10

Thought: I now know the final answer

Final Answer: 您的订单 2022ABCDE 已发货，预计将于2023-01-10送达。

> Finished chain.

您的订单 2022ABCDE 已发货，预计将于2023-01-10送达。

问题 3:

question = "请问你们的货，能送到三亚吗？大概需要几天？"

result = agent.run(question)

print(result)

输出结果：

> Entering new AgentExecutor chain...

I need to find out the shipping policy and delivery time

Action: FAQ

Action Input: Shipping policy and delivery time

Observation: 7天无理由退货

Thought: I need to find out the delivery time

Action: FAQ

Action Input: Delivery time

Observation: 7天无理由退货

Thought: I need to find out if we can deliver to Sanya

Action: FAQ

Action Input: Delivery to Sanya

Observation: 7天无理由退货

Thought: I now know the final answer

Final Answer: 我们可以把货送到三亚，大概需要7天。

> Finished chain.

我们可以把货送到三亚，大概需要7天。

因为在代码里面，我们把 Agent 的 Verbose 模式打开了，所以在输出结果里面，你可以直接看到 Agent 整个思考的日志。从这里，你会发现几个有意思的现象。

第一个，是 Agent 每一步的操作，可以分成 5 个步骤，分别是 Action、Action Input、Observation、Thought，最后输出一个 Final Answer。

Action，就是根据用户的输入，选择应该选取哪一个 Tool，然后行动。

Action Input，就是根据需要使用的 Tool，从用户的输入里提取出相关的内容，可以输入到 Tool 里面。

Oberservation，就是观察通过使用 Tool 得到的一个输出结果。

Thought，就是再看一眼用户的输入，判断一下该怎么做。

Final Answer，就是 Thought 在看到 Obersavation 之后，给出的最终输出。

第二个，就是我们最后那个“货需要几天送到三亚”的问题，没有遵循上面的 5 个步骤，而是在第 4 步 Thought 之后，重新回到了 Action。并且在这样反复三次之后，才不得已强行回答了问题。但是给出的答案，其实并不一定准确，因为我们的回答里面并没有说能不能送到三亚。

PREFIX = """Answer the following questions as best you can. You have access to the following tools:"""

FORMAT_INSTRUCTIONS = """Use the following format:

Question: the input question you must answer

Thought: you should always think about what to do

Action: the action to take, should be one of [{tool_names}]

Action Input: the input to the action

Observation: the result of the action

... (this Thought/Action/Action Input/Observation can repeat N times)

Thought: I now know the final answer

Final Answer: the final answer to the original input question"""

SUFFIX = """Begin!

Question: {input}

Thought:{agent_scratchpad}"""

其实它就是把一系列的工具名称和对应的描述交给了 OpenAI，让它根据用户输入的需求，选取对应的工具，然后提取用户输入中和用户相关的信息。本质上，只是我们上面让 AI 做选择题的一种扩展而已。

### **通过 max_iterations 限制重试次数**

前面这个反复思考 3 次，其实是 Agent 本身的功能。因为实际很多逻辑处理，现在都是通过 AI 的大语言模型这个黑盒子自动进行的，有时候也不一定准。所以 AI 会在 Thought 的时候，看一下回答得是否靠谱，如果不靠谱的话，它会想一个办法重试。如果你希望 AI 不要不断重试，也不要强行回答，在觉得不靠谱的时候，试个一两次就停下来。那么，你在创建 Agent 的时候，设置 max_iterations 这个参数就好了。下面我们就把参数设置成 2，看看效果会是怎么样的。

agent = initialize_agent(tools, llm, agent="zero-shot-react-description", max_iterations = 2, verbose=True)

question = "请问你们的货，能送到三亚吗？大概需要几天？"

result = agent.run(question)

print("===")

print(result)

print("===")

输出结果：

> Entering new AgentExecutor chain...

I need to find out the shipping policy

Action: FAQ

Action Input: Shipping policy

Observation: 7天无理由退货

Thought: I need to find out the shipping time

Action: FAQ

Action Input: Shipping time

Observation: 7天无理由退货

Thought:

> Finished chain.

===

Agent stopped due to max iterations.

===

可以看到，这个时候，AI 重试了两次就不再重试。并且，也没有强行给出一个回答，而是告诉你，Agent 因为 max iterations 的设置而中止了。这样，你可以把 AI 回答不上来的问题，切换给人工客服回答。

### **通过 VectorDBQA 让 Tool 支持问答**

当然，这么简单的问题我们完全可以让 AI 答上来。现在答不上来的原因是无论我们问什么问题，FQA 这个工具的回答都是 7 天无理由退货。而正确的方式其实也有，我们可以直接使用第 15 讲介绍的 VectorDBQA 这个 LLMChain，把它也封装成一个 Tool。

from langchain.embeddings.openai import OpenAIEmbeddings

from langchain.vectorstores import FAISS

from langchain.text_splitter import SpacyTextSplitter

from langchain import OpenAI, VectorDBQA

from langchain.document_loaders import TextLoader

llm = OpenAI(temperature=0)

loader = TextLoader('./data/ecommerce_faq.txt')

documents = loader.load()

text_splitter = SpacyTextSplitter(chunk_size=256, pipeline="zh_core_web_sm")

texts = text_splitter.split_documents(documents)

embeddings = OpenAIEmbeddings()

docsearch = FAISS.from_documents(texts, embeddings)

faq_chain = VectorDBQA.from_chain_type(llm=llm, vectorstore=docsearch, verbose=True)

然后，把这 LLMChain 的 run 方法包装到一个 Tool 里面。

from langchain.agents import tool

@tool("FAQ")

def faq(intput: str) -> str:

""""useful for when you need to answer questions about shopping policies, like return policy, shipping policy, etc."""

return faq_chain.run(intput)

tools = [

Tool(

name = "Search Order",func=search_order,

description="useful for when you need to answer questions about customers orders"

),

Tool(name="Recommend Product", func=recommend_product,

description="useful for when you need to answer questions about product recommendations"

),

faq

]

agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

这里，我们对 Tool 的写法做了一些小小的改变，使得代码更加容易维护了。我们通过 @tool 这个 Python 的 decorator 功能，将 FAQ 这个函数直接变成了 Tool 对象，这可以减少我们每次创建 Tools 的时候都要指定 name 和 description 的工作。

接着，我们再通过 Agent 来运行一下刚才的问题，一样能够得到正确的答案。

question = "请问你们的货，能送到三亚吗？大概需要几天？"

result = agent.run(question)

print(result)

输出结果：

> Entering new AgentExecutor chain...

I need to find out the shipping policy and delivery time.

Action: FAQ

Action Input: shipping policy and delivery time

> Entering new VectorDBQA chain...

> Finished chain.

Observation: 一般情况下，大部分城市的订单在2-3个工作日内送达，偏远地区可能需要5-7个工作日。具体送货时间可能因订单商品、配送地址和物流公司而异。

Thought: I now know the final answer.

Final Answer: 一般情况下，大部分城市的订单在2-3个工作日内送达，偏远地区可能需要5-7个工作日。具体送货时间可能因订单商品、配送地址和物流公司而异。

> Finished chain.

一般情况下，大部分城市的订单在2-3个工作日内送达，偏远地区可能需要5-7个工作日。具体送货时间可能因订单商品、配送地址和物流公司而异。

对于商品的推荐，我们可以如法炮制，也把对应的商品信息，存到 VectorStore 里，然后通过先搜索后问答的方式来解决。对应的数据同样由 ChatGPT 出品，代码和上面的 FAQ 基本类似，我就不再一一重复了。

重新构建 Agent：

from langchain.text_splitter import CharacterTextSplitter

from langchain.document_loaders import CSVLoader

product_loader = CSVLoader('./data/ecommerce_products.csv')

product_documents = product_loader.load()

product_text_splitter = CharacterTextSplitter(chunk_size=1024, separator="\n")

product_texts = product_text_splitter.split_documents(product_documents)

product_search = FAISS.from_documents(product_texts, OpenAIEmbeddings())

product_chain = VectorDBQA.from_chain_type(llm=llm, vectorstore=product_search, verbose=True)

@tool("FAQ")

def faq(intput: str) -> str:

""""useful for when you need to answer questions about shopping policies, like return policy, shipping policy, etc."""

return faq_chain.run(intput)

@tool("Recommend Product")

def recommend_product(input: str) -> str:

""""useful for when you need to search and recommend products and recommend it to the user"""

return product_chain.run(input)

tools = [

Tool(

name = "Search Order",func=search_order,

description="useful for when you need to answer questions about customers orders"

),

recommend_product, faq]

agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

询问 Agent 问题：

question = "我想买一件衣服，想要在春天去公园穿，但是不知道哪个款式好看，你能帮我推荐一下吗？"

answer = agent.run(question)

print(answer)

输出结果：

> Entering new AgentExecutor chain...

I need to recommend a product to the user.

Action: Recommend Product

Action Input: Clothing for park in spring

> Entering new VectorDBQA chain...

> Finished chain.

Observation: 休闲、简约风格的长款风衣，休闲、运动风格的长款卫衣，清新、甜美风格的长袖连衣裙都可以在春天去公园穿着。

Thought: I now know the final answer.

Final Answer: 休闲、简约风格的长款风衣，休闲、运动风格的长款卫衣，清新、甜美风格的长袖连衣裙都可以在春天去公园穿着。

> Finished chain.

休闲、简约风格的长款风衣，休闲、运动风格的长款卫衣，清新、甜美风格的长袖连衣裙都可以在春天去公园穿着。

### **优化 Prompt，让 AI 不要胡思乱想**

对于订单查询，使用向量检索就不太合适了，我们直接拿着订单号去数据库里查就好了。不过我们不是一个 Python 编程课，我就不为你演示怎么用 Python 写 SQL 了。我们偷个懒，就在对应的函数里造几条数据，根据用户输入的订单号不同，就返回不同的订单状态，找不到的话，就告诉用户找不到订单就好。

import json

ORDER_1 = "20230101ABC"

ORDER_2 = "20230101EFG"

ORDER_1_DETAIL = {

"order_number": ORDER_1,

"status": "已发货",

"shipping_date" : "2023-01-03",

"estimated_delivered_date": "2023-01-05",

}

ORDER_2_DETAIL = {

"order_number": ORDER_2,

"status": "未发货",

"shipping_date" : None,

"estimated_delivered_date": None,

}

import re

@tool("Search Order")

def search_order(input:str)->str:

"""useful for when you need to answer questions about customers orders"""

if input.strip() == ORDER_1:

return json.dumps(ORDER_1_DETAIL)

elif input.strip() == ORDER_2:

return json.dumps(ORDER_2_DETAIL)

else:

return f"对不起，根据{input}没有找到您的订单"

tools = [search_order,recommend_product, faq]

agent = initialize_agent(tools, llm=OpenAI(temperature=0), agent="zero-shot-react-description", verbose=True)

然后，我们就可以试着来让 Agent 帮我们查一下订单号。

question = "我有一张订单，订单号是 2022ABCDE，一直没有收到，能麻烦帮我查一下吗？"

answer = agent.run(question)

print(answer)

输出结果：

> Entering new AgentExecutor chain...

I need to find out the status of the order.

Action: Search Order

Action Input: 2022ABCDE

Observation: 对不起，根据2022ABCDE没有找到您的订单

Thought: I need to find out more information about the order.

Action: Search Order

Action Input: 2022ABCDE

Observation: 对不起，根据2022ABCDE没有找到您的订单

Thought: I need to contact customer service for more information.

Action: FAQ

Action Input: 订单查询

> Entering new VectorDBQA chain...

> Finished chain.

Observation: 要查询订单，请登录您的帐户，然后点击“我的订单”页面。在此页面上，您可以查看所有订单及其当前状态。如果您没有帐户，请使用订单确认电子邮件中的链接创建一个帐户。如果您有任何问题，请联系客服。

Thought: I now know the final answer.

Final Answer: 要查询订单，请登录您的帐户，然后点击“我的订单”页面。在此页面上，您可以查看所有订单及其当前状态。如果您没有帐户，请使用订单确认电子邮件中的链接创建一个帐户。如果您有任何问题，请联系客服。

> Finished chain.

要查询订单，请登录您的帐户，然后点击“我的订单”页面。在此页面上，您可以查看所有订单及其当前状态。如果您没有帐户，请使用订单确认电子邮件中的链接创建一个帐户。如果您有任何问题，请联系客服。

结果稍稍让人有些意外，我们输入了一个不存在的订单号，我们原本期望，AI 能够告诉我们订单号找不到。但是，它却是在发现回复是找不到订单的时候，重复调用 OpenAI 的思考策略，并最终尝试从 FAQ 里拿一个查询订单的问题来敷衍用户。这并不是我们想要的，这也是以前很多“人工智障”类型的智能客服常常会遇到的问题，所以我们还是想个办法解决它。

解决的方法也不复杂，我们只需要调整一下 search_order 这个 Tool 的提示语。通过这个提示语，Agent 会知道，这个工具就应该在找不到订单的时候，告诉用户找不到订单或者请它再次确认。这个时候，它就会根据这个答案去回复用户。下面是对应修改运行后的结果。

import re

@tool("Search Order")

def search_order(input:str)->str:

"""一个帮助用户查询最新订单状态的工具，并且能处理以下情况：

1. 在用户没有输入订单号的时候，会询问用户订单号

2. 在用户输入的订单号查询不到的时候，会让用户二次确认订单号是否正确"""

pattern = r"\d+[A-Z]+"

match = re.search(pattern, input)

order_number = input

if match:

order_number = match.group(0)

else:

return "请问您的订单号是多少？"

if order_number == ORDER_1:

return json.dumps(ORDER_1_DETAIL)

elif order_number == ORDER_2:

return json.dumps(ORDER_2_DETAIL)

else:

return f"对不起，根据{input}没有找到您的订单"

tools = [search_order,recommend_product, faq]

agent = initialize_agent(tools, llm=OpenAI(temperature=0), agent="zero-shot-react-description", verbose=True)

question = "我有一张订单，订单号是 2022ABCDE，一直没有收到，能麻烦帮我查一下吗？"

answer = agent.run(question)

print(answer)

输出结果：

> Entering new AgentExecutor chain...

我需要查询订单状态

Action: Search Order

Action Input: 2022ABCDE

Observation: 对不起，根据2022ABCDE没有找到您的订单

Thought: 我需要再次确认订单号是否正确

Action: Search Order

Action Input: 2022ABCDE

Observation: 对不起，根据2022ABCDE没有找到您的订单

Thought: 我现在知道最终答案

Final Answer: 对不起，根据您输入的订单号2022ABCDE没有找到您的订单，请您再次确认订单号是否正确。

> Finished chain.

对不起，根据您输入的订单号2022ABCDE没有找到您的订单，请您再次确认订单号是否正确。

### **通过多轮对话实现订单查询**

看起来，我们的客服聊天机器人已经搞定了。但是，其实我们还有几个可以优化的空间。

我们应该支持多轮聊天。因为用户不一定是在第一轮提问的时候，就给出了自己的订单号。

我们其实可以直接让 Search Order 这个 Tool，回答用户的问题，没有必要再让 Agent 思考一遍。

那我们就把代码再改造一下。

import re

answer_order_info = PromptTemplate(

template="请把下面的订单信息回复给用户： \n\n {order}?", input_variables=["order"]

)

answer_order_llm = LLMChain(llm=ChatOpenAI(temperature=0), prompt=answer_order_info)

@tool("Search Order", return_direct=True)

def search_order(input:str)->str:

"""useful for when you need to answer questions about customers orders"""

pattern = r"\d+[A-Z]+"

match = re.search(pattern, input)

order_number = input

if match:

order_number = match.group(0)

else:

return "请问您的订单号是多少？"

if order_number == ORDER_1:

return answer_order_llm.run(json.dumps(ORDER_1_DETAIL))

elif order_number == ORDER_2:

return answer_order_llm.run(json.dumps(ORDER_2_DETAIL))

else:

return f"对不起，根据{input}没有找到您的订单"

from langchain.memory import ConversationBufferMemory

from langchain.chat_models import ChatOpenAI

tools = [search_order,recommend_product, faq]

chatllm=ChatOpenAI(temperature=0)

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

conversation_agent = initialize_agent(tools, chatllm,

agent="conversational-react-description",

memory=memory, verbose=True)

第一个改造还是在 Search Order 这个工具上的。首先，我们给这个 Tool 设置了一个参数，叫做 return_direct = True，这个参数是告诉 AI，在拿到这个工具的回复之后，不要再经过 Thought 那一步思考，直接把我们的回答给到用户就好了。设了这个参数之后，你就会发现 AI 不会在没有得到一个订单号的时候继续去反复思考，尝试使用工具，而是会直接去询问用户的订单号。

伴随着这个修改，对于查询到的订单号，我们就不能直接返回一个 JSON 字符串了，而是通过 answer_order_llm 这个工具来组织语言文字。

第二个改造是我们使用的 Agent，我们把 Agent 换成了 converstional-react-description。这样我们就支持多轮对话了，同时我们也把对应的 LLM 换成了 ChatOpenAI，这样成本更低。并且，我们还需要为这个 Agent 设置一下 memory。

改造好之后，我们不妨来看看，这个 AI 现在是不是终于智能一点了。

问题 1：

question1 = "我有一张订单，一直没有收到，能麻烦帮我查一下吗？"

answer1 = conversation_agent.run(question1)

print(answer1)

回答 1：

> Entering new AgentExecutor chain...

Thought: Do I need to use a tool? Yes

Action: Search Order

Action Input: 我有一张订单，一直没有收到，能麻烦帮我查一下吗？

Observation: 请问您的订单号是多少？

> Finished chain.

请问您的订单号是多少？

问题 2：

question2 = "我的订单号是20230101ABC"

answer2 = conversation_agent.run(question2)

print(answer2)

回答 2：

> Entering new AgentExecutor chain...

Thought: Do I need to use a tool? Yes

Action: Search Order

Action Input: 20230101ABC

Observation:

尊敬的用户，您的订单信息如下：

订单号：20230101ABC

订单状态：已发货

发货日期：2023年1月3日

预计送达日期：2023年1月5日

如有任何疑问，请随时联系我们。感谢您的购买！

> Finished chain.

尊敬的用户，您的订单信息如下：

订单号：20230101ABC

订单状态：已发货

发货日期：2023年1月3日

预计送达日期：2023年1月5日

如有任何疑问，请随时联系我们。感谢您的购买！

问题 3:

question3 = "你们的退货政策是怎么样的？"

answer3 = conversation_agent.run(question3)

print(answer3)

回答 3:

> Entering new AgentExecutor chain...

Thought: Do I need to use a tool? Yes

Action: FAQ

Action Input: 退货政策

> Entering new VectorDBQA chain...

> Finished chain.

Observation: 自收到商品之日起7天内，如产品未使用、包装完好，您可以申请退货。某些特殊商品可能不支持退货，请在购买前查看商品详情页面的退货政策。

Thought:Do I need to use a tool? No

AI: Our return policy allows for returns within 7 days of receiving the product, as long as the product is unused and in its original packaging. Some special products may not be eligible for returns, so please check the product details page before purchasing.

> Finished chain.

Our return policy allows for returns within 7 days of receiving the product, as long as the product is unused and in its original packaging. Some special products may not be eligible for returns, so please check the product details page before purchasing.

可以看到 AI 能够在多轮对话里面，明白用户的意思，给出合理的答案。不过，最后一个问题它是用英文回答的，那怎么让它用中文来回答呢？这个问题就作为这一节课的思考题留给你啦！

好了，现在你已经有了一个有基本功能的电商客服聊天机器人了。你只需要在现有的这个代码上做一些改造，将自己的数据源导入进去，就可以拿真实的用户问题去试一试，看看效果怎么样了。

## **小结**

今天，我为你介绍了 Langchain 的 Agent 的基本功能。通过“先让 AI 做个选择题”的方式，Langchain 让 AI 自动为我们选择合适的 Tool 去调用。我们可以把回答不同类型问题的 LLMChain 封装成不同的 Tool，也可以直接让 Tool 去调用内部查询订单状态的功能。我也为你实际演示了将 Agent、Memory、VectorStore、LLMChain 组合在一起的过程，创建了一个有完整电商客服功能的聊天机器人。

我们对于 Langchain 的介绍也就告一段落了。作为大语言模型领域目前最火的一个开源项目，Langchain 有非常丰富的功能。我这里介绍的也只是它的核心功能，它支持丰富的 Tool、不同类型的 VectorStore 和内置的其他 LLMChain，都等待你自己去它的文档里发掘了。

## **思考题**

在这一讲的最后，我们的例子里，AI 用英文回答了中文的 FAQ 问题，你能够尝试修改一下现在的代码，让 AI 用中文回复吗？

上一讲里，我们介绍了 EntityMemory，但是在这一讲里我们并没有通过 EntityMemory 获取并查询订单信息。你能研究一下 Langchain 的文档，思考一下如果我们想要使用 EntityMemory 的话，应该怎么做吗？

欢迎你把思考后的结果分享到评论区，也欢迎你把这一讲分享给感兴趣的朋友，我们下一讲再见！