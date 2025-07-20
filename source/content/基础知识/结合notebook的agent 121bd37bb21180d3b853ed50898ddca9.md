# 结合notebook的agent

Owner: yancy yu

灵感来源：

[清华最新RAG框架：Adaptive-Note RAG，比Adaptive RAG还要好](https://mp.weixin.qq.com/s/9WKLpEMeAE2oKPeK6ci77Q)

可以增对于SOP类的意图，结合笔记去创建对应的agent

```jsx
用户输入（意图和 SOP 策略）
       |
信息评估模块（判断信息是否足够）
       |
   ---------------------
   |                   |
信息足够            信息不足
   |                   |
策略执行模块       信息获取模块（提问用户或调用工具）
   |                   |
输出策略步骤            |
       \               /
        ---------------
               |
            策略执行模块
               |
          输出策略步骤
```