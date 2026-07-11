---
tags:
  - ai
  - ai-agent
---

绝味小程序AI点餐项目技术架构概要设计

# 2025.03.04技术方案评审会议待办

# 一、  微信小程序AI智能点餐

## 1、  关联集成系统

1.  小程序：提供AI agent 的入口及用户信息；

2.  CDP：提供用户标签和订单等信息；

3.  AI Agent：提供Agent的H5呈现和AI 对话、推荐等能力；

4.  AI适配中台：提供门店、商品、加购、订单能力支持；

## 2、  关键流程

1.  用户从微信小程序点击“小火鸭”，从小程序携带会员号跳转到H5 Agent页面；（需要开发，方案已设计）

2.  H5 Agent 获取当前用户的地理位置信息（经纬度），并根据门店静态数据，切换到最近的营业门店；

3.  Agent 通过对话给用户推荐产品，推荐的商品需要调用AI适配中台的查询门店商品可售状态接口校验门店商品的可售状态；

4.  用户确认商品后，AI 适配层将加购的商品明细通过AI适配中台预下单(加购)接口更新用户的微信小程序购物车，适配中台返回加购商品的明细（包含加购成功和加购失败的）及预估总价；

5.  用户确认下单后，从H5 Agent 跳转到小程序的订单确认页完成后续下单操作；

6.  H5 Agent 可以通过AI 适配中台的订单查询接口获取订单的状态；

## 3、  关键流程时序图

![](https://wdcdn.qpic.cn/MTY4ODg1NTQyNjUxNDY4NA_64649_or1ANpSp9_gQzFpW_1741085353?w=952&h=942&type=image/png)

# 二、  点餐智能体 Agent 前端

1.  新建Agent前端代码仓库及申请对应流水线；

2.  申请各环境的前端网站域名(test，pre、prod环境)；

3.  h5应用微信 jssdk 签名配置；

4.  h5应用页面调用微信 jssdk；

## 1、  新建H5应用

1.  h5应用页面调用 api 跳转小程序；

[JSSDK使用 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1)

[web-view | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

[网页授权 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

2.  前端H5实时语音解决方案？

7.  jssdk接口兼容处理问题：地理定位、声音录制权限...

8.  H5获取用户当前位置三种方法：

● H5自带的方法，获取经纬度

● 通过地图提供的JS,获取位置

● 通过微信的jssdk（需要公众号）

相关问题

● 小程序web-view网页中使用JSSDK接口，公众号的主体和和小程序的主体必须是同一个？

● h5进入页面后是否需要登录会话保持？

## 2、  H5应用框架

1.  前端应用框架uni-app ，跨平台快速交付（vue2、vuex）； [uni-app官网](https://zh.uniapp.dcloud.io/)

搭建项目框架所依赖的开发工具包，配置不同环境命令脚本；

根据官方提供的模版改造[GitHub - dcloudio/hello-uniapp: uni-app框架演示示例](https://github.com/dcloudio/hello-uniapp)

![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_479136_fv3W9zbD5zYBLthq_1741055766?w=552&h=1564&type=image/png)

2.  代码复用绝知AI问答部分功能实现；

● 问答内容渲染模块

● 问答语音识别asr模块

● 问答语音合成tts模块

[https://gitlab.juewei.cn/ikb/ikb-client/-/tree/master/src/pagesSub/aiModule](https://gitlab.juewei.cn/ikb/ikb-client/-/tree/master/src/pagesSub/aiModule)

...

3.  采用小程序 webview 嵌入h5页面方式（小程序配置业务域名）；

前端需要提供 h5 页面链接给小程序（必须 https 协议）；

4.  小程序加载h5页面链接中附加业务参数（会员id等其它业务参数）；

https://xxx.com/chat?userId=xxxx&location=xxxx

5.  h5页面跳转小程序订单确认页（jssdk提供的接口）

![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_861798_rpgHDg6LfTD23zEi_1740882362?w=1504&h=1074&type=image/png)

### 前端流式输出

AI对话接口使用流式输出，其它业务接口可以不用要求此方式

![](https://wdcdn.qpic.cn/MTMxMDI3MDA0MTgxNjM1MTE_313956_8zYaO1VLFN6HcLvn_1723528817?w=1250&h=1088)![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_113582_jm5ePA517kvK7sTf_1723528810?w=1058&h=586&type=image/png)

SSE接口请求工具：@microsoft/fetch-event-source

## 3、  H5应用相关页面及调用接口

1.  AI问答页面；

a. 文字问答

b.获取地理定位

c.图片预览

d.语音识别

e.语音生成

...

2.  调用接口；

a.语音识别asr

b.语音生成tts

c.推荐内容

d.获取agent配置

...

![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_548492_Vf-K6pQZK1zDLtOf_1740883205?w=1256&h=1396&type=image/png)

3.  问答接口数据结构（根据后端接口调整）

{

answer: string | object,

event: 'list' | 'message'

}

[https://qcnzd8v4xqbd.feishu.cn/wiki/DqcYw5GLGiPxgvk7xNncDjt7nFf?fromScene=spaceOverview&table=tbl8gw0pUPQiLJSx&view=vewb86Ol8x](https://qcnzd8v4xqbd.feishu.cn/wiki/DqcYw5GLGiPxgvk7xNncDjt7nFf?fromScene=spaceOverview&table=tbl8gw0pUPQiLJSx&view=vewb86Ol8x)

![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_120707_eIGBUdetmOp4HZH__1740884034?w=992&h=452&type=image/png)

## 4、  智能体 Agent 前端UI

a. 小程序webview嵌入h5方式无法自定义顶部导航栏，会自动铺满整个小程序页面

[web-view | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_895134_5Zm7ZuZW2ELFmeC7_1741059953?w=612&h=1184&type=image/png)性能要求加载静态页面

b.小程序webview进入h5页面后有白屏加载过程，体验上和小程序页面之间跳转有差别

![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_805468_hcr29ZYQ8RkWNyE5_1740883319?w=540&h=1080&type=image/png)

c.问答交互上是否与绝知一致？（需要UI评审）

![](https://wdcdn.qpic.cn/MTY4ODg1NjAyMTU1OTc4Nw_692693_0aOrxz57OfxhoPiw_1740883746?w=696&h=1454&type=image/png)

# 三、  点餐智能体 Agent 后端 &模型

## 1.  意图识别模块

![](https://wdcdn.qpic.cn/MTY4ODg1NTU1NjU5MzY3OQ_922843_FGbJQplMMovcL7_X_1741076336?w=2284&h=1276&type=image/png)

目前意图有：聊天，下单，闲聊，推荐

## 2.  Agent模块

### 整体编排流程

[https://lcnkrfbfk2e8.feishu.cn/sync/A8Dgd7WiDsbtSFbNBM2cT3MVnqg](https://lcnkrfbfk2e8.feishu.cn/sync/A8Dgd7WiDsbtSFbNBM2cT3MVnqg)

### 输入参数：

```
 {    "conversation_id": "",    "inputs": {        "username": "张三",        "nickname": "张三",        "sex": 0,        "age_group": "30~40",        "birthday": "1990-08-15",        "last_payment_days": 7,        "location": "家"    },    "query": "土豆片辣不辣",    "response_mode": "streaming",    "user_id": "8f3a8f9546c8505ce8fe8cf60387b63b"}
```

### 输出参数:

```
data: {"event":"message","answer":"\n\n","id":"b647a0b46e734486ab8e9c1aa7a82ded","conversation_id":"e5aadcbe6dc24a98af947470fa333d54","message_id":"b647a0b46e734486ab8e9c1aa7a82ded","created_at":1739778508} data: {"event":"message","answer":"嘎","id":"b647a0b46e734486ab8e9c1aa7a82ded","conversation_id":"e5aadcbe6dc24a98af947470fa333d54","message_id":"b647a0b46e734486ab8e9c1aa7a82ded","created_at":1739778508} data: {"event":"message","answer":"嘎","id":"b647a0b46e734486ab8e9c1aa7a82ded","conversation_id":"e5aadcbe6dc24a98af947470fa333d54","message_id":"b647a0b46e734486ab8e9c1aa7a82ded","created_at":1739778508} data: {"event":"message","answer":"~","id":"b647a0b46e734486ab8e9c1aa7a82ded","conversation_id":"e5aadcbe6dc24a98af947470fa333d54","message_id":"b647a0b46e734486ab8e9c1aa7a82ded","created_at":1739778508} data: {"event":"message","answer":"量子","id":"b647a0b46e734486ab8e9c1aa7a82ded","conversation_id":"e5aadcbe6dc24a98af947470fa333d54","message_id":"b647a0b46e734486ab8e9c1aa7a82ded","created_at":1739778508} data: {"event":"message","answer":"力学","id":"b647a0b46e734486ab8e9c1aa7a82ded","conversation_id":"e5aadcbe6dc24a98af947470fa333d54","message_id":"b647a0b46e734486ab8e9c1aa7a82ded","created_at":1739778508}
```

产品相关卡片

```
data: {"event":"card","answer":{"type":"product","card_info":{"title":["product_display_layout_example_image_0"],"cover":["https:\/\/ai-obs.juewei.cn\/ai-kb\/product-display\/zhaopaiyabo001.png"],"video":[],"resend":["产品特点","推荐吃法与食用场景","推荐报货","陈列摆盘","加工及汤料添加方法"],"field_map":[{"key":"sales_pitch","desc":"销售推荐话术","sorted":1},{"key":"product_display_layout_example","desc":"产品陈列摆盘示例图","sorted":2},{"key":"product_name","desc":"产品","sorted":100},{"key":"product_type","desc":"类型","sorted":100},{"key":"spiciness_level","desc":"辣度","sorted":100},{"key":"target_audience","desc":"喜好人群","sorted":100},{"key":"specification","desc":"规格","sorted":100},{"key":"shelf_life","desc":"保质期","sorted":100},{"key":"price","desc":"售价","sorted":100},{"key":"product_view","desc":"主视图","sorted":100},{"key":"product_time","desc":"正式上市时间","sorted":100},{"key":"official_launch_date","desc":"正式上市时间","sorted":100},{"key":"order_start_date","desc":"开始报货时间","sorted":100},{"key":"product_features","desc":"产品特点","sorted":100}]},"resend":{"title":[],"desc":[],"message":[]},"infobase":{"product_name":"招牌鸭脖","product":"招牌鸭脖","product_type":"主打产品","spiciness_level":"🌶🌶🌶（重辣）","target_audience":"20-35岁年轻群体，女性","specification":"2KG\/包","shelf_life":"4天","price":"24元\/250g","product_features":"严选的山东樱桃谷鸭，瘦肉丰富率高达70%，肉质优良，脂肪含量适中，全年消费高达数亿只","sales_pitch":"招牌鸭脖是绝味19年的人气王，鸭脖食材是精挑严选的山东樱桃谷鸭，肉质鲜嫩，招牌口味香飘四溢，卤水入骨，味道奇佳"}},"id":"fe138dcdf78446aaabde0257bf66e912","conversation_id":"fa25b658bcdd4548ab0cc6289e72c3de","message_id":"fe138dcdf78446aaabde0257bf66e912","created_at":1741004827} data: {"event":"message_end","content":"","id":"f243fa2636e044ab940640f4b0dc1c13","answer":"","conversation_id":"fa25b658bcdd4548ab0cc6289e72c3de","message_id":"f243fa2636e044ab940640f4b0dc1c13","created_at":1741004828} 
```

### 3.  打招呼模块

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_849414_amBOQVRzKK2Mbn6R_1741056589?w=1670&h=996)

### 4.  推荐算法模块

流程图如下：

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_882530_RyJi_1RSWECLMq37_1741056589?w=1682&h=770)

这里采用的方案是：基于增强的用户画像维度，重构推荐系统的标签应用体系，形成「精准偏好识别→动态场景适配→商品价值优化」的三层决策机制

#### 1️⃣ 第一层：场景识别

##### 📌 目标： 基于当前消费场景，为商品推荐提供基础权重（30%）

##### 🎯 权重计算

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_747097_zNAKRXrMGpcM8uR3_1741056589?w=261&h=87)

其中：𝑊𝑖 代表特定场景的影响系数：

郊游 → 𝑊=0.06

夜宵 → 𝑊=0.08

春节 → 𝑊=0.1

归一化公式:Wi' = Wi -Wmin / Wmax - Wmin

其中:

● 𝑊min=0.06（郊游）

● 𝑊max=0.1（春节）

##### 📌 归一化示例：

夜宵场景：W' = 0.08-0.06/0.1-0.06 = 0.02/0.04 = 0.5

最终，夜宵场景的权重被归一化为 0.5，可用于后续加权计算。

🔹 计算示例： 假设用户当前处于 春节 场景：

1.  原始场景权重：𝑊春节=0.1

2.  归一化场景权重：𝑊′春节=0.1−0.06/0.1−0.06 = 1.0

3.  最终推荐贡献值：场景加权值=0.3×W ′春节=0.3×1.0=0.3

##### ✅ 业务规则

● 若用户同时处于多个场景（如“春节 + 夜宵”），采用 加权平均 计算：

总场景加权值=0.3×（𝑊′春节+𝑊′夜宵） / 2

● 若无特定场景匹配，默认 W' = 0，即场景加权值对推荐无贡献。

🚀 场景识别层提供 30% 的推荐权重，后续结合用户画像和商品匹配进一步优化推荐结果

#### 2️⃣ 第二层：用户画像分析

##### 📌 基于用户的 SKU 偏好、味觉偏好、消费能力优化推荐（45%）

##### 🎯 SKU 偏好评分：SKU 偏好分=( 总购买次数/该 SKU 购买次数 )×0.6+(最近购买间隔衰减系数×0.4)

- 购买衰减系数

衰减系数=e −0.1×间隔天数

示例计算：

用户购买某 SKU 10 次，总购买次数 50 次，最近 5 天未买：

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_833660_tG5fPzzzmZqyIHgZ_1741056589?w=485&h=67)

##### 🎯 味觉偏好矩阵

```
def taste_preference(user):    辣味系数 = sum(辣味SKU购买金额) / 总消费额    甜味系数 = sum(甜味SKU购买次数) / 总购买次数    咸鲜系数 = 1 - (辣味系数 + 甜味系数)    return 标准化处理([辣味系数, 甜味系数, 咸鲜系数])
```

● 标准化处理（归一化）： x ′ = x−min(x) / max(x)−min(x)

#### 3️⃣ 第三层：商品匹配

##### 📌 目标： 结合区域热销、库存健康、毛利优化推荐（25%）

##### 🎯 库存健康度计算

- 库存健康度=1−（库存周转天数/最大安全库存天数）

##### 🎯 关联购买率

- 商品 A 关联购买率=商品 A 购买时，商品 B 也被购买的次数/商品 A 的总购买次数

- 如果 关联购买率 > 0.4，强制组合推荐。

##### 🎯 新品优化策略

- 若商品为 新品（上线时间 < 30 天），其初始分值 +0.1，并额外赠送小样。

最终推荐分值：

商品推荐权重= 0.25×(库存健康度+关联购买率+毛利优化)

##### 商品标签定义

##### 1️⃣ 场景识别相关标签

|   |   |
|---|---|
|标签名称|说明|
|scene_weight|该商品在不同场景下的权重（0.06 ~ 0.1），用于计算场景贡献值|
|applicable_scenes|适用于哪些场景（如 "春节", "夜宵", "郊游" 等），可以是多选|
|scene_weight_normalized|归一化后的场景权重，用于计算最终推荐贡献值|
|multi_scene_weight|如果适用于多个场景，则加权平均后的值|

##### ✅ 示例：

```
{  "scene_weight": 0.08,  "applicable_scenes": ["夜宵", "春节"],  "scene_weight_normalized": 0.5,  "multi_scene_weight": 0.75}
```

##### 2️⃣ 用户画像分析相关标签

|   |   |
|---|---|
|标签名称|说明|
|sku_preference_score|该商品的用户偏好评分，计算方式：(购买次数占比×0.6 + 购买衰减系数×0.4)|
|purchase_decay_factor|计算公式：e^(-0.1 × 最近未购买天数)，表示最近是否仍感兴趣|
|spicy_factor|商品在用户偏好中的辣味占比|
|sweet_factor|商品在用户偏好中的甜味占比|
|umami_factor|计算方式：1 - (辣味系数 + 甜味系数)|
|purchase_power_score|该商品是否符合用户消费能力，根据历史消费数据计算|

##### ✅ 示例

```
{  "sku_preference_score": 0.78,  "purchase_decay_factor": 0.45,  "spicy_factor": 0.2,  "sweet_factor": 0.5,  "umami_factor": 0.3,  "purchase_power_score": 0.85}
```

##### 3️⃣ 商品匹配相关标签

|   |   |
|---|---|
|标签名称|说明|
|inventory_health|1 - (库存周转天数 / 最大安全库存天数)，衡量商品是否易售出|
|cross_buy_rate|该商品与其他商品的关联购买率，计算方式：商品 A 购买时，商品 B 也被购买的次数 / 商品 A 总购买次数|
|force_recommendation|若 cross_buy_rate > 0.4，则该商品被强制组合推荐，值为 true，否则为 false|
|is_new_product|是否为新品（上线时间 < 30 天）|
|new_product_boost|如果是新品，则额外加分 +0.1|
|profit_optimization|该商品的毛利率优化情况，衡量商品的利润潜力|
|final_product_score|计算方式：0.25 × (库存健康度 + 关联购买率 + 毛利优化)，最终决定商品的推荐权重|

##### ✅ 示例

```
{  "inventory_health": 0.82,  "cross_buy_rate": 0.45,  "force_recommendation": true,  "is_new_product": true,  "new_product_boost": 0.1,  "profit_optimization": 0.75,  "final_product_score": 0.78}
```

##### ✅ 此方案实施周期：预计 6-12 个月

阶段 1（3 个月）：先实现 用户画像+精准偏好识别。

阶段 2（3-6 个月）：优化 场景识别+动态适配，提升实时性。

阶段 3（6-12 个月）：最终完成 商品价值优化+运营收益提升。

如果有现成的 用户画像系统 & 推荐系统，可以缩短至 6 个月；如果需要从 0 搭建，则可能需要 12 个月。🚀

为了保证415上线，这个方案不可取。换成规则+策略的推荐方式，通过知识库语义动态匹配策略和llm打标加强效果。

### 📌 新推荐方案核心：

采用 基于规则+策略的推荐方式，通过知识库语义匹配策略+ LLM 打标优化，实现 低成本、快速迭代 的推荐系统升级。

### ⏳ 预计实施周期

|   |   |   |   |
|---|---|---|---|
|阶段|任务|时间（周）|优先级|
|需求分析 & 方案设计|业务需求拆解、规则梳理|1-2 周|高|
|推荐规则构建|用户分层、策略定义|2-4 周|高|
|知识库语义匹配|语义匹配算法+知识库整理|3-5 周|高|
|LLM 打标优化|大模型自动打标签、优化推荐权重|3-5 周|高|
|系统开发 & 数据调优|API 实现、数据清理、策略调整|4-6 周|高|
|A/B 测试 & 调整|线上测试、规则优化|2-4 周|中|
|正式上线|监控、快速迭代|415 上线|高|

📌 整体周期：10-12 周（可并行加速，保证 415 上线）

### 🚀 方案细节

#### 1️⃣ 规则 + 策略推荐体系

📌 核心思路：基于用户画像 & 业务规则，通过策略引擎精准推荐

● 用户分层：

○ 📌 基础用户（无历史行为）→ 热门推荐 + 知识库匹配

○ 📌 活跃用户（有行为数据）→ 规则 + 语义匹配

○ 📌 高价值用户（高转化）→ LLM 打标优化

● 推荐规则：

○ 标签匹配（如 SKU 偏好、消费能力）

○ 时间/场景适配（如节假日、地理位置）

○ 库存 & 毛利优化（低库存降权、利润优先）

⏳ 实施周期：2-4 周

#### 2️⃣ 知识库语义动态匹配

📌 核心思路：将知识库结构化，与用户需求进行语义匹配

● 构建知识库

○ 基于现有商品信息、用户问题、FAQ 生成结构化知识库 + 语义匹配。

○ 使用Embedding（如 text-embedding-V3） 计算用户问题的语义相似度，匹配最佳商品。

● 语义匹配逻辑

○ 用户查询 → 知识库 搜索最相关内容 → 策略引擎 匹配推荐

○ 例如：

```
{"用户输入": "想要吃辣", "匹配商品": ["招牌鸭脖"]}
```

○ 基于场景、时间、消费能力调整推荐策略。

⏳ 实施周期：3-5 周

#### 3️⃣ 若标签无法命中策略，LLM 自动打标，增强推荐效果

📌 核心思路：大模型自动分析用户数据，生成个性化标签

● 任务

○ 用户查询 → LLM 生成用户画像（偏好、情感倾向）

○ LLM 提取商品特征 → 自动打上标签

○ 结合已有规则优化推荐

● 技术方案

○ 结合 qwen-max 进行 Zero-shot 分类。

○ 或者使用 LoRA 微调 小模型，加快推理速度。

⏳ 实施周期：3-5 周

#### 🎯 为什么这个方案更适合

✅ 轻量级，基于规则 + 策略，不涉及深度学习大改造。

✅ 可快速落地，知识库 & LLM 打标在短时间内见效。

✅ 上线后可持续优化，不影响 415 版本交付。

#### 📌 关键优化点

● 数据优化：清洗用户 & 商品数据，确保推荐质量。

● 规则调整：根据 A/B 测试，调整推荐策略。

● 大模型打标增强：不断优化标签，提高推荐精准度。

### 推荐模块结论

📌 推荐方式：基于规则+策略，结合知识库语义匹配 + LLM 打标优化。

📌 实施周期：10-12 周（可并行加速，确保 415 上线）。

📌 成功关键：提前梳理规则、优化数据、快速迭代！

### 5.  短期注意力Agent

什么时候触发: 用户每一轮未命中到常用意图的对话触发

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_816200_L5i7yWn2f6mMLi2__1741056589?w=1123&h=712)

### 6.  渐进式槽位Agent

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_975396_8e2e8ZkIMhbR2w7o_1741056589?w=676&h=885)![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_858925_dDM8ODGJvFnb2ukv_1741056589?w=676&h=1009)

## 3.  主动下单

#### 提取主动下单识别的需求

先去查询通用的下单意图（通过语义相似度），如果未查询到，则利用大模型识别出下单需求，并提取出商品和数量，然后通过语义相似度去匹配。

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_839895_8SKAnI2m1oSpo0V9_1741056589?w=475&h=925)

## 4.  查询订单状态

#### 提取主动查询订单状态的需求

先去查询通用的查询订单状态意图（通过语义相似度），如果未查询到，则利用大模型识别出查询订单状态需求，并提取出商品和数量，然后通过语义相似度去匹配。

![](https://wdcdn.qpic.cn/MTMxMDI3MDAwNTAxNzUxOTI_918103_1yjfpp70wNoAnvTf_1741056589?w=525&h=965)

## 5.  Agent后端接口(所有Agent行为都保持一致)

```
curl --location --request POST 'https://{{ai_dining}}/agent/chat' \--header 'Authorization: Apikey {{apikey}}' \--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \--header 'Content-Type: application/json' \--header 'Accept: */*' \--header 'Host: ai-adapter-test.juewei.cn' \--header 'Connection: keep-alive' \--data-raw '{    "conversation_id": "",    "inputs": {        "user_avatar": "https://cdn-ikb-test.juewei.com/test/default/avatar/3.png",        "user_name": "于晓婕",        "can_number": 29,        "market_sn": "-1",        "market_name": "全国",        "role_name": "小火鸭",        "tomorrow_sign_reward": 8,        "role_id": "1000",        "sign_reward": 4,        "nick_name": "于晓婕",        "ros_role": "公司员工",        "store_name": "信息中心(13755)"    },    "query": "土豆片辣不辣",    "response_mode": "streaming",    "type":0,    "user_id": "8f3a8f9546c8505ce8fe8cf60387b63b"}'
```

# 四、  AI适配中台

## 1、  门店简要信息查询

### a)  接口URI

/api/ad/store/queryBriefStoreByCode

说明：availableStatus、businessStatus都为【0】表示正常营业

### b)  业务请求参数(bizContent)

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|备注|
|storeCode|String|是|门店编码|

#### 一、  请求参数示例

{

"appId": "10000000",

"bizContent": "{\"storeCode\":\"STORE_001\"}",

"timestamp": "2025-03-06 13:35:01",

"version": "1.0",

"sign": "8A43EF3652E9F5F887F759E76C5A8F4C"

}

### c)  业务响应参数

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|备注|
|storeCode|String|是|门店编码|
|nameFull|String|是|门店全称|
|nameShort|String|是|门店简称|
|address|String|是|门店地址|
|provinceCode|String|否|省编码|
|cityCode|String|否|市编码|
|districtCode|String|否|区编码|
|latitude|Double|是|纬度|
|longitude|Double|是|经度|
|availableStatus|Integer|是|门店维护状态<br><br>0-正常<br><br>1-创建中<br><br>2-作废|
|businessStatus|Integer|是|门店营业状态<br><br>0-正常营业<br><br>1-停业<br><br>2-关店中<br><br>3-转让中<br><br>4迁移中<br><br>5-已关店|

#### 一、  响应参数示例

{

"respCode": "0",

"msg": "成功",

"result": {

"storeCode": "S001",

"nameFull": "绝味鸭脖旗舰店",

"nameShort": "绝味鸭脖",

"address": "上海市浦东新区陆家嘴环路1000号",

"provinceCode": "310000",

"cityCode": "310100",

"districtCode": "310115",

"latitude": 31.2304,

"longitude": 121.4737,

"availableStatus": 0,

"businessStatus": 0,

}

}

## 2、  查询门店商品可售状态

### a)  接口URI

/api/ad/product/batchQueryStatus

### b)  业务请求参数(bizContent)

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|备注|
|storeCode|String|是|门店编码|
|saleChannel|Integer|是|售卖类型<br><br>10 - 外卖<br><br>11 - 自提|
|skuCodeList|String[]|是|商品SKU编码|

#### 一、  请求参数示例

{

"appId": "10000000",

"bizContent":"{\"storeCode\":\"STORE_001\",\"saleChannel\":10,\"skuCodeList\":[\"SKU_001\"]}",

"timestamp": "2025-01-02 15:35:01",

"version": "1.0",

"sign": "8A43EF3652E9F5F887F759E76C5A8F4C"

}

### c)  业务响应参数

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|备注|
|skuList|List||列表查询结果|
|-storeCode|String|是|门店编码|
|-spuCode|String|是|商品SPU编码|
|-skuCode|String|是|商品SKU编码|
|-saleUnitDesc|String|是|sku销售单元描述（例如：大份约180克）|
|-status|String|是|状态（商品可售状态）<br><br>1-可售，非1表示不可售|

#### 一、  响应参数示例

{

"respCode": "0",

"msg": "成功",

"result": {

"skuList": [

{

"storeCode": "STORE_001",

"spuCode": "SPU_001",

"skuCode": "SKU_001",

"status": "AVAILABLE"

}

]

}

}

## 3、  预下单(加购)

### a)  接口URI

/api/ad/shopping/updateShoppingCart

### b)  需求

来源（source）新增微信小火鸭来源； 微信小程序渠道编码（channelCode）使用“11”

### c)  业务请求参数(bizContent)

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|备注|
|source|Integer|是|来源<br><br>28：微小宝小火鸭智能体<br><br>29：支小宝小火鸭智能体|
|channelCode|Integer|是|渠道编码<br><br>11：微信小程序<br><br>21：支付宝小程序|
|storeCode|String|是|门店编码|
|memberNo|String|是|绝味小程序会员号|
|fulfillmentMethod|Integer|是|履约方式：1-自提；2-配送|
|itemList|java.util.List|是|商品列表|
|-spuCode|String|是|商品SPU编码|
|-skuCode|String|是|商品SKU编码|
|-skuName|String|是|商品SKU名称|
|-quantity|String|是|下单数量|

#### 一、  请求参数示例

{

"appId": "10000000",

"bizContent": "{\"source\":29,\"channelCode\":21,\"storeCode\":\"STORE_001\",\"memberNo\":\"MEMBER_001\",\"fulfillmentMethod\":1,\"itemList\":[{\"spuCode\":\"SPU_001\",\"skuCode\":\"SKU_001\",\"skuName\":\"SKU_商品_001\",\"quantity\":\"2\"}]}",

"timestamp": "2025-01-02 15:35:01",

"version": "1.0",

"sign": "8A43EF3652E9F5F887F759E76C5A8F4C"

}

### d)  业务响应参数

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|描述|
|totalAmount|String|是|预估订单金额|
|linkUrl|String|是|跳转订单确认页链接|
|remark|Stirng|否|备注|
|itemList|java.util.List|是|商品列表|
|-spuCode|String|是|商品SPU编码|
|-skuCode|String|是|商品SKU编码|
|-skuName|String|是|商品SKU名称|
|-quantity|String|是|下单数量|
|-imageUrls|String|否|图片地址|
|-salePrice|String|是|销售价格|
|invalidItemList|java.util.List|是|无效商品列表|
|-skuCode|String|是|商品SKU编码|
|-skuName|String|是|商品SKU名称|
|-quantity|String|是|下单数量|
|-invalidReason|String|否|无效原因|

#### 一、  响应参数示例

{

"respCode": "0",

"msg": "成功",

"result": {

"totalAmount": "199.12",

"linkUrl": "https://example.com/order/confirm",

"remark": "备注",

"itemList": [

{

"spuCode": "SPU_001",

"skuCode": "SKU_001",

"skuName": "SKU_测试",

"quantity": "2",

"imageUrls": "",

"salePrice": ""

}

]

}

}

## 4、  订单查询

### a)  接口URI

/api/ad/order/queryByStatus

### b)  需求

来源（source）新增微信小火鸭来源；

### c)  业务请求参数(bizContent)

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|备注|
|source|Integer|是|来源<br><br>28：微小宝小火鸭智能体<br><br>29：支小宝小火鸭智能体|
|agentId|String|否|智能体ID|
|memberNo|String|是|绝味小程序会员号|
|orderStatusList|String[]|是|订单状态（未完成订单）<br><br>示例：["PAID","CANCELED"]<br><br>NEW："新建订单"<br><br>PAYING："支付中"<br><br>PAID："支付成功"<br><br>ACCEPT："门店接单"<br><br>PICKING："门店开始拣货"<br><br>PICKED："拣货完成"<br><br>W_DELIVERY："待配送"<br><br>W_FETCH："等待自提"<br><br>D_ACCEPTED："配送接单"<br><br>DELIVERING："配送中"<br><br>DELIVERED："配送完成"<br><br>C_ACCEPTED："确认收货"|

#### 一、  请求参数示例

{

"appId": "10000000",

"bizContent": "{\"source\":29,\"memberNo\":\"MEMBER_001\",\"orderStatusList\":[\"已发货\",\"已取消\"]}",

"timestamp": "2025-01-02 15:35:01",

"version": "1.0",

"sign": "8A43EF3652E9F5F887F759E76C5A8F4C"

}

### d)  业务响应参数

|   |   |   |   |
|---|---|---|---|
|字段|类型|是否必须|备注|
|orderList|List|是|订单集合|
|-outOrderNo|String|是|订单编号(绝味)|
|-tradeNo|String|是|支付宝交易单号|
|-orderStatus|String|是|订单状态|
|-orderTime|datetime|是|下单时间|
|-orderTitle|String|否|订单展示标题|
|-orderRemark|String|否|订单备注|
|-orderAmount|String|是|订单金额|
|-deliveryTime|datetime|是|预计送达时间|
|-linkUrl|String|否|订单详情跳转链接|

#### 一、  响应参数示例

{

"respCode": "0",

"msg": "成功",

"result": {

"orderList": [

{

"outOrderNo": "ORDER_001",

"tradeNo": "TRADE_20230101123456789",

"orderStatus": "PAID",

"orderTime": "2023-01-01T10:00:00Z",

"orderTitle": "商品A购买订单",

"orderAmount": "199.00",

"deliveryTime": "2023-01-03T14:00:00Z",

"linkUrl": "https://example.com/order/ORDER_001"

}

]

}

}

# 五、  待确认及风险事项

1.  H5 Agent 跳回小程序是否需要小程序开发，如果需要开发则需要协调小程序资源；

已和世辉确认不需要小程序开发

2.  上次需求评审后，存在部分需求调整，调整的部分需要二次确认，可能影响方案设计和排期；

# 六、  项目排期计划

|   |   |
|---|---|
|事项|日期|
|开发|3月6日-3月18日|
|联调（小程序，Agent，AI适配中台）|3月19日-3月21日|
|测试|3月24日-3月28日|

# 七、  相关文档

1.  需求文档：[点我跳转](https://lcnkrfbfk2e8.feishu.cn/wiki/XxkRwRqC1iwJyTkihs8c4KHGnYd?fromScene=spaceOverview)

2.  AI适配中台接口文档：[绝味AI中台OPEN接口对接文档_V1.0.pdf](https://drive.weixin.qq.com/s?k=AOYAywd4ABE32Wl7kXAfwAPgbGAEs)

3.  小程序首页浮标需求：[首页浮标](https://doc.weixin.qq.com/doc/w3_AfQAXwZsABEwZL4q6CCQfmIPfgnD1?scode=AOYAywd4ABEaWE1FQwAfwAPgbGAEs)