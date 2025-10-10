

$$
## 请生成一个结构化的 HTML 页面，展示以下架构内容。页面的结构应保持一致，每个页面内容的结构（如标题、文字描述、代码示例等）根据以下输入内容进行动态填充。

  

1. 页面标题（如：RAGFlow 架构分析海报）

2. 页面内容：分为多个部分（每个部分包括标题、描述、相关代码、图标等），每个部分的描述和内容要保持一致的格式，以下是每个部分的结构：

- 标题：每个部分的标题（例如：“瓶颈 01”）

- 内容：每个部分的描述，内容可以包含文本、代码示例和解释。

- 相关代码：如果有代码块，展示代码块并提供解释说明。

- 图标：每个部分的图标可以根据内容选择不同的样式，使用 SVG 图标。

3. 页面底部：保持品牌 footer（例如：`@你的小红书ID | 专业技术分享`）

  

## 请基于以下输入生成相应的 HTML 页面：

  

- 第 1 部分标题：[用户提供的标题]

- 第 1 部分内容：[用户提供的描述]

- 第 1 部分相关代码：[用户提供的代码示例]

- 第 1 部分图标：[用户选择的图标样式]

  

（重复以上结构，直到所有部分都完成）

具体示例：

用户输入：

1. 页面标题：RAGFlow 架构分析海报

2. 第 1 部分标题：封面

- 内容：介绍 RAGFlow 的整体架构，适合 AI 架构师使用的生产环境避坑指南。

- 相关代码：无

- 图标：选择 "封面" 图标

3. 第 2 部分标题：核心亮点

- 内容：DeepDoc 引擎在文档解析方面的优势，如何区别于其他 RAG 框架。

- 相关代码：```

# README.md:48-76

DeepDoc is a document analysis system...

```

- 图标：选择 "亮点" 图标

...

## 示例输出的HTML：

<!DOCTYPE html>

<html lang="zh-CN">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>RAGFlow 架构分析海报</title>

<script src="https://cdn.tailwindcss.com"></script>

<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">

<style>

/* 样式略 */

</style>

</head>

<body class="bg-gray-100 flex items-center justify-center min-h-screen p-4 sm:p-8">

<div class="w-full max-w-7xl mx-auto">

<h1 class="text-3xl font-bold text-center text-gray-800 mb-4">RAGFlow 架构分析海报</h1>

<p class="text-center text-gray-500 mb-10">飞书卡片风格・共9张 (全新优化版)</p>

<div class="grid grid-cols-1">

  

<!-- Page 1: 封面 -->

<div class="flex flex-col items-center space-y-2">

<p class="font-semibold text-gray-600">第 1 张：封面</p>

<div class="poster-container bg-gradient-to-br from-indigo-50 to-purple-100">

<div class="flex-grow flex flex-col justify-center items-center text-center p-8">

<div class="space-y-4">

<p class="font-semibold text-sm text-indigo-700 tracking-widest">RAGFLOW DEEP DIVE</p>

<h1 class="text-4xl font-bold text-gray-800 leading-tight" style="letter-spacing: -1px;">RAGFlow：开发者的神兵，业务方的“劝退神器”？</h1>

</div>

<p class="mt-8 text-gray-600 text-sm">一个AI架构师的生产环境避坑指南</p>

</div>

<div class="p-4 text-center text-xs text-gray-500">

@你的小红书ID | 专业技术分享

</div>

</div>

</div>

<!-- Page 2: 核心亮点 -->

<div class="flex flex-col items-center space-y-2">

<p class="font-semibold text-gray-600">第 2 张：核心亮点</p>

<div class="poster-container">

<div class="card-header">

<div class="card-icon bg-green-100 text-green-600">

<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M5 11h14M5 11a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2M5 11v2a2 2 0 002 2h10a2 2 0 002-2v-2" /></svg>

</div>

<div>

<p class="text-sm font-bold text-gray-500">亮点先行</p>

<h1 class="text-xl font-bold text-gray-800">DeepDoc引擎，真的强得离谱！✨</h1>

</div>

</div>

<div class="card-body">

<h2 class="font-semibold text-lg text-gray-600 mb-2">“为什么开发者都爱它？”</h2>

<p class="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">

说实话，RAGFlow最惊艳我的就是DeepDoc。它基于计算机视觉的文档解析能力，能精准识别布局、表格，OCR质量也很高。这才是它区别于其他RAG框架的核心竞争力。

</p>

<div class="code-block">

<div class="code-block-title">相关文档:</div>

<pre><code># README.md:48-76

DeepDoc is a document analysis system based on

computer vision... It can recognize various

layouts in unstructured data, such as titles,

texts, figures, tables, etc. ...</code></pre>

</div>

</div>

<div class="brand-footer">@你的小红书ID | 专业技术分享</div>

</div>

</div>

  

<!-- 更多页面内容 -->

</div>

</div>

</body>

</html>

## 说明：

  

每个页面部分（如封面、核心亮点）根据输入内容生成 HTML 结构。

  

标题、描述和代码示例根据用户提供的内容动态填充。

  

其他部分（如图标、品牌 footer）保持一致，图标可以根据内容选择不同的 SVG 图标。
$$