# 支持个人电脑上部署的 ChatGLM-6B 体验

Owner: yancy yu

## **ChatGLM-6B 介绍**

ChatGLM-6B 是一个开源的、支持中英双语的对话语言模型，基于 General Language Model (GLM) 架构，具有 62 亿参数。结合模型量化技术，用户可以在消费级的显卡上进行本地部署（INT4 量化级别下最低只需 6GB 显存）。

官方仓库：[THUDM/ChatGLM-6B: ChatGLM-6B：开源双语对话语言模型](https://github.com/THUDM/ChatGLM-6B)

## **使用**

### **Hugging Face 上使用**

模型共享在 `Hugging Face` 上，所以自然可以在 `Hugging Face Space` 上进行体验。

目前 [ChatGLM 6B - a Hugging Face Space by multimodalart](https://huggingface.co/spaces/multimodalart/ChatGLM-6B) 这个在 T4 上跑的 Space 可以访问，也很流畅，不过代码很久没更新不是使用流式会话，体验会稍差一点。也可以自己复制别的空间代码去跑，不同配置的服务器加载模型的方式需要调整。

体验效果如下：

[](https://article-images.zsxq.com/Fiv3gNd28HBUmw-5EnOMcD4sKpl2)

### 

### **Google Colab 上使用**

[ChatGLM-6B - Colaboratory (google.com)](http://google.com/)

### **本地部署**

硬件需求：

| **量化等级** | **最低 GPU 显存** |

|:----------|:--------------:|

| FP16(无量化) | 13 GB |

| INT8 | 10 GB |

| INT4 | 6 GB |

FP16，也称为半精度浮点数（Half Precision Floating Point），是一种浮点数格式，其中数字由16位表示。具体来说，FP16包含：

- 1位符号位（表示正数或负数）
- 5位指数
- 10位尾数（或称为小数部分）

没有显卡的也可以使用 CPU，大概需要 32G 内存，不然会很慢。

Mac 上也可以使用 GPU 加速，这些官方文档里都有解决方案。

### **部署步骤**

### **1 下载代码**

官方仓库：[THUDM/ChatGLM-6B: ChatGLM-6B](https://github.com/THUDM/ChatGLM-6B)

### **2 下载模型**

不自己下载模型的话第一次运行代码 `transformers 库也会自己从 Hugging Face models` 下载模型

用的 int4 量化后的模型 `chatglm-6b-int4`

模型下载地址： [THUDM/chatglm-6b-int4 at main (huggingface.co)](http://huggingface.co/)

> git clone --depth=1 https://huggingface.co/THUDM/chatglm-6b-int4 THUDM/chatglm-6b-int4
> 

如果有安装 `git-lfs` 的话会自动下载里面的大文件 `ice_text.model` 和 `pytorch_model.bin` ，没有的话需要自己下载这两个文件替换掉下载的模型目录里两个小文件。

### **3 调整代码**

要注意的点是修改代码两行 `from_pretrained 的第一个参数 from_pretrained("THUDM/chatglm-6b-int4", trust_remote_code=True)` ，指向你的模型路径。

后面根据是使用 CPU 或者 Mac 系统按照官方文档进行修改：[THUDM/ChatGLM-6B](https://github.com/THUDM/ChatGLM-6B#cpu-%E9%83%A8%E7%BD%B2)

本地体验效果：

[](https://article-images.zsxq.com/FpiHmMf69Jz02OPwV1Ry5NYVXjRk)

## 微调：

[ChatGLM-6B 在 ModelWhale 平台的部署与微调教程 - Heywhale.com](https://www.heywhale.com/mw/project/6436d82948f7da1fee2be59e)

## **总结**

总的来说，效果还是很好的，中文表述很流畅，代码上表现较弱一些。局限性官方 [repo](https://github.com/THUDM/ChatGLM-6B#%E5%B1%80%E9%99%90%E6%80%A7) 中提到的那些，虽然也会一本正经胡说八道，但能在单卡里跑起来还要什么自行车。不过随着会话轮数增多显存消耗不断增加，最终会导致 oom，为解决这个有尝试在多卡上运行。接下来也准备尝试一下用 LoRA 进行微调。

现在压力来到了文心一言。