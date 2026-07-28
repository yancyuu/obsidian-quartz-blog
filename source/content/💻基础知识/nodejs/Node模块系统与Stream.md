---
tags:
  - basic-knowledge
  - kb/programming/nodejs
  - kb/programming/nodejs/module
  - commonjs
  - esm
  - stream
  - buffer
---

# Node 模块系统与 Stream

> CommonJS vs ESM 是模块系统核心；Stream 和 Buffer 是 Node 处理大数据/二进制的利器。

## 相关笔记

- [Node基础与架构](Node基础与架构.md)
- [Node事件循环](Node事件循环.md)

---

## 一、CommonJS（CJS）

Node 传统模块规范：

```javascript
// 导出
module.exports = {
  add(a, b) {
    return a + b
  },
}
// 或 exports.add = fn;

// 导入（同步，运行时）
const { add } = require("./math")
```

| 特点               | 说明                                      |
| ------------------ | ----------------------------------------- |
| **同步加载**       | `require` 同步读文件并执行                |
| **运行时**         | 可在条件分支里动态 require                |
| **module.exports** | 每个文件是一个模块，有独立作用域          |
| **缓存**           | 模块首次加载后缓存，重复 require 返回缓存 |

---

## 二、ESM（ES Modules）⭐ 趋势

官方标准模块：

```javascript
// 导出
export function add(a, b) {
  return a + b
}
export default { add }

// 导入（编译时静态分析）
import { add } from "./math.js"
import math from "./math.js"
```

| 特点           | 说明                                                  |
| -------------- | ----------------------------------------------------- |
| **静态分析**   | 编译时确定依赖，支持 **tree-shaking**（摇掉未用代码） |
| **异步加载**   | import 是异步的                                       |
| **顶层 await** | ESM 支持 `await` 在模块顶层                           |
| 启用           | `package.json` 加 `"type": "module"`，或用 `.mjs`     |

### CJS vs ESM 对比

| 维度         | CommonJS         | ESM                       |
| ------------ | ---------------- | ------------------------- |
| 加载         | 同步、运行时     | 静态、编译时              |
| 导出         | `module.exports` | `export`/`export default` |
| this         | `module.exports` | `undefined`               |
| tree-shaking | ❌               | ✅                        |
| 趋势         | 老项目           | **新项目首选**            |

> 互操作：ESM 里 `import` CJS 默认导出可以；CJS 里用 ESM 需动态 `import()`。

---

## 三、Stream（流）⭐ Node 特色

Stream 是**分块处理数据**的抽象，处理大文件/网络流时**不一次性载入内存**。

```mermaid
flowchart LR
    S[数据源] -->|分块 chunk| RS[Readable Stream]
    RS -->|pipe| T[Transform 处理]
    T -->|pipe| WS[Writable Stream]
    WS --> D[目标]
    style T fill:#fef3c7
```

### 四种 Stream

| 类型          | 说明                   | 例子                              |
| ------------- | ---------------------- | --------------------------------- |
| **Readable**  | 可读                   | `fs.createReadStream`、HTTP 请求  |
| **Writable**  | 可写                   | `fs.createWriteStream`、HTTP 响应 |
| **Duplex**    | 双向（读写独立）       | TCP socket                        |
| **Transform** | 转换（读入变换后写出） | gzip、加密                        |

### pipe 与背压（backpressure）

```javascript
// 经典：读文件 → 压缩 → 写文件，全程不占大内存
fs.createReadStream("big.log").pipe(zlib.createGzip()).pipe(fs.createWriteStream("big.log.gz"))
```

- `pipe` 串联流，自动处理**背压**（消费慢时暂停生产，防内存爆炸）
- 推荐用 `pipeline`（比 pipe 更安全，自动错误处理）

```javascript
const { pipeline } = require("stream/promises")
await pipeline(
  fs.createReadStream("big.log"),
  zlib.createGzip(),
  fs.createWriteStream("big.log.gz"),
)
```

> Stream 是 Node 高效处理大文件/网络的核心，比一次性 `readFile` 省内存。

---

## 四、Buffer（二进制）

`Buffer` 是 Node 处理**二进制数据**的全局对象（类似定长字节数组），用于 TCP 流、文件、加密等。

```javascript
const buf = Buffer.from("hello", "utf8") // 字符串转 Buffer
buf.length // 5（字节）
buf.toString() // 'hello'
Buffer.alloc(10) // 分配 10 字节
```

---

## 五、面试速答

> **Q：CommonJS 和 ESM 区别？**
> A：CJS 同步、运行时加载、用 require/module.exports；ESM 静态、编译时分析、用 import/export，支持 tree-shaking 和顶层 await。新项目优先 ESM。

> **Q：为什么用 Stream？**
> A：分块处理大数据，不一次性载入内存。处理 GB 级文件时 `readFile` 会爆内存，Stream 边读边处理。pipe 自动处理背压。

> **Q：Buffer 是什么？**
> A：Node 处理二进制的全局对象，定长字节数组，用于 TCP/文件/加密等原始字节流。

---

## 参考

- [Node 官方 · Stream](https://nodejs.org/api/stream.html)
- [Node 官方 · Buffer](https://nodejs.org/api/buffer.html)
- [MDN · JavaScript modules](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
