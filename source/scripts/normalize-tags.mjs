#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const SOURCE_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const CONTENT_DIR = path.join(SOURCE_DIR, "content")
const mode = process.argv.includes("--write") ? "write" : process.argv.includes("--verify") ? "verify" : "dry-run"

const MAX_TAGS = 6
const MIN_TAGS = 3

const tagAliases = new Map(
  Object.entries({
    agent: "ai-agent",
    Agent: "ai-agent",
    AI: "ai",
    RAG: "rag",
    LangChain: "langchain",
    "Llama-index": "llamaindex",
    "Llama Index": "llamaindex",
    LlamaIndex: "llamaindex",
    "Fine-tune": "fine-tuning",
    PostgreSQL: "postgresql",
    Postgres: "postgresql",
    JSONB: "jsonb",
    metadata管理: "metadata",
    元数据管理: "metadata",
    架构设计: "architecture",
    架构重构: "architecture-refactoring",
    技术调研: "tech-research",
    学习笔记: "learning-note",
    变现: "monetization",
    商业化: "commercialization",
    智能体: "ai-agent",
    基础知识: "basic-knowledge",
  }),
)

const knownTags = new Set([
  "a2a",
  "agent-framework",
  "agentic-rag",
  "agno",
  "ai",
  "ai-agent",
  "ai-architecture",
  "aiohttp",
  "algorithm",
  "api-gateway",
  "architecture",
  "architecture-refactoring",
  "asyncio",
  "auth",
  "backend",
  "basic-knowledge",
  "binary-search",
  "branch-management",
  "business-plan",
  "cache",
  "camel-ai",
  "case-study",
  "chatgpt",
  "coding-standard",
  "commercialization",
  "computer-science",
  "concurrency",
  "context-engineering",
  "customer-service",
  "data-structure",
  "database",
  "deadlock",
  "deepseek",
  "design-doc",
  "design-pattern",
  "devops",
  "distributed-system",
  "docker",
  "document-parsing",
  "embedding",
  "enterprise-ai",
  "engineering-practice",
  "fastapi",
  "feishu",
  "fine-tuning",
  "git",
  "gil",
  "local-llm",
  "gpt",
  "high-concurrency",
  "http",
  "httpx",
  "interview",
  "interview-prep",
  "jsonb",
  "kafka",
  "knowledge-base",
  "langchain",
  "langgraph",
  "learning-note",
  "linux",
  "llamaindex",
  "llm",
  "mcp",
  "metadata",
  "micro-saas",
  "milvus",
  "monetization",
  "multi-agent",
  "multi-agent-rag",
  "mysql",
  "notebook",
  "networking",
  "oauth2",
  "paper-reading",
  "personal-note",
  "postgresql",
  "repo-analysis",
  "product",
  "product-design",
  "prompt-engineering",
  "python",
  "rag",
  "redis",
  "retrieval",
  "security",
  "self-rag",
  "social-media",
  "sorting",
  "system-design",
  "tech-research",
  "transaction",
  "vector-search",
  "voc",
  "wechat-article",
  "workflow-automation",
  "writing",
])

const orderedPreference = [
  "basic-knowledge",
  "ai",
  "ai-agent",
  "rag",
  "llm",
  "architecture",
  "backend",
  "python",
  "database",
  "distributed-system",
  "product",
  "commercialization",
  "writing",
  "interview",
  "paper-reading",
  "personal-note",
]

const folderRules = [
  [/^💻基础知识\/python\//u, ["basic-knowledge", "python", "backend"]],
  [/^💻基础知识\/mysql\//u, ["basic-knowledge", "mysql", "database", "backend"]],
  [/^💻基础知识\/redis\//u, ["basic-knowledge", "redis", "cache", "backend"]],
  [/^💻基础知识\/分布式&高并发\//u, ["basic-knowledge", "distributed-system", "high-concurrency", "backend"]],
  [/^💻基础知识\/计算机原理\//u, ["basic-knowledge", "computer-science"]],
  [/^💻基础知识\/算法\//u, ["basic-knowledge", "algorithm"]],
  [/^💻基础知识\/设计模式\//u, ["basic-knowledge", "design-pattern"]],
  [/^💻基础知识\/算法\/二分法\.md$/u, ["basic-knowledge", "algorithm"]],
  [/^💻基础知识\/运维\/docker\//u, ["basic-knowledge", "devops", "docker"]],
  [/^💻基础知识\/运维\//u, ["basic-knowledge", "devops"]],
  [/^💻基础知识\//u, ["basic-knowledge"]],
  [/^🤖Agent\//u, ["ai", "ai-agent"]],
  [/^📚RAG\//u, ["ai", "rag"]],
  [/^📓MCP&A2A\//u, ["ai", "ai-agent", "mcp", "a2a"]],
  [/^🧚DeepSeek\//u, ["ai", "llm", "deepseek"]],
  [/^🗨️GPT\//u, ["ai", "llm", "gpt"]],
  [/^架构\//u, ["architecture"]],
  [/^面试题\//u, ["interview", "interview-prep"]],
  [/^架构\/应用开发规范\//u, ["architecture", "engineering-practice"]],
  [/^论文研读\//u, ["paper-reading"]],
  [/^👩‍💻 个人笔记\/公众号\//u, ["personal-note", "writing", "wechat-article"]],
  [/^👩‍💻 个人笔记\//u, ["personal-note"]],
]

const titleRules = [
  [/\bMCP\b/iu, ["mcp"]],
  [/\bA2A\b/iu, ["a2a"]],
  [/LangChain/iu, ["langchain", "agent-framework"]],
  [/LangGraph/iu, ["langgraph", "agent-framework"]],
  [/Llama\s*Index|LlamaIndex/iu, ["llamaindex", "agent-framework"]],
  [/Agno/iu, ["agno", "agent-framework"]],
  [/Agent|智能体/iu, ["ai-agent"]],
  [/Agentic[-\s]?RAG|智能体.*RAG|RAG.*智能体/iu, ["agentic-rag"]],
  [/Self[-\s]?RAG/iu, ["self-rag"]],
  [/Multi[-\s]?Agent[-\s]?RAG/iu, ["multi-agent-rag"]],
  [/RAG|知识库|检索/iu, ["rag", "knowledge-base", "retrieval"]],
  [/向量|vector/iu, ["vector-search"]],
  [/文档解析|解析文档/iu, ["document-parsing"]],
  [/Milvus/iu, ["milvus"]],
  [/PostgreSQL|Postgres/iu, ["postgresql"]],
  [/JSONB/iu, ["jsonb"]],
  [/metadata|元数据/iu, ["metadata"]],
  [/DeepSeek/iu, ["deepseek", "llm"]],
  [/ChatGPT|OpenAI|\bGPT\b/iu, ["gpt", "llm"]],
  [/prompt|提示词/iu, ["prompt-engineering"]],
  [/上下文|context/iu, ["context-engineering"]],
  [/架构|系统设计/iu, ["architecture"]],
  [/开发规范|代码规范|coding/iu, ["coding-standard"]],
  [/分支/iu, ["branch-management", "git"]],
  [/版本控制|rebase|merge/iu, ["git"]],
  [/repo/iu, ["repo-analysis"]],
  [/爬取|爬虫|大众点评/iu, ["python", "social-media", "case-study"]],
  [/运维/iu, ["devops"]],
  [/Agents\s*2\.0/iu, ["agent-framework"]],
  [/CAMEL|Camel/iu, ["camel-ai", "agent-framework", "multi-agent"]],
  [/ChatGLM/iu, ["llm", "local-llm"]],
  [/notebook/iu, ["notebook"]],
  [/设计文档/iu, ["design-doc", "architecture"]],
  [/重构/iu, ["architecture-refactoring"]],
  [/网关|gateway/iu, ["api-gateway"]],
  [/鉴权|认证|RBAC|IAM/iu, ["auth"]],
  [/Python|生成器|迭代器|装饰器|闭包/iu, ["python"]],
  [/GIL/iu, ["python", "gil", "concurrency"]],
  [/asyncio/iu, ["python", "asyncio", "concurrency"]],
  [/httpx/iu, ["python", "httpx"]],
  [/aiohttp/iu, ["python", "aiohttp"]],
  [/FastAPI/iu, ["python", "fastapi"]],
  [/MySQL|Mysql|EXPLAIN/iu, ["mysql", "database"]],
  [/MVCC/iu, ["mysql", "mvcc", "transaction"]],
  [/事务/iu, ["transaction"]],
  [/Redis|SDS/iu, ["redis", "cache"]],
  [/缓存/iu, ["cache"]],
  [/TCP|HTTPS?|DNS|Socket|网络/iu, ["networking"]],
  [/Kafka/iu, ["kafka", "distributed-system"]],
  [/分布式|高并发|负载均衡|高可用/iu, ["distributed-system", "high-concurrency"]],
  [/Docker|Swarm|容器/iu, ["docker", "devops"]],
  [/OAuth/iu, ["oauth2", "security"]],
  [/加密|攻击|安全|XSS|CSRF|SQL注入/iu, ["security"]],
  [/死锁/iu, ["deadlock", "concurrency"]],
  [/Linux/iu, ["linux"]],
  [/二分法|二分查找|binary/iu, ["binary-search", "algorithm"]],
  [/排序|冒泡|快排|桶排序/iu, ["sorting", "algorithm"]],
  [/链表|数组|队列|栈|树|图/iu, ["data-structure"]],
  [/面试|JD|评分表|简历/iu, ["interview", "interview-prep"]],
  [/论文|paper|Nested Learning/iu, ["paper-reading"]],
  [/商业计划|商业企划|变现|定价|MVP|创业/iu, ["product", "commercialization", "monetization"]],
  [/Micro[-\s]?Sniper/iu, ["micro-saas", "product-design"]],
  [/VOC|舆情/iu, ["voc", "workflow-automation"]],
  [/飞书|Feishu/iu, ["feishu"]],
  [/公众号|写作/iu, ["writing"]],
  [/案例|复盘|实战/iu, ["case-study"]],
  [/教程|入门|基础/iu, ["learning-note"]],
]

const bodyRules = [
  [/\bMCP\b/iu, ["mcp"]],
  [/\bA2A\b/iu, ["a2a"]],
  [/LangChain/iu, ["langchain"]],
  [/LangGraph/iu, ["langgraph"]],
  [/Llama\s*Index|LlamaIndex/iu, ["llamaindex"]],
  [/Agno/iu, ["agno"]],
  [/Milvus/iu, ["milvus"]],
  [/PostgreSQL|Postgres/iu, ["postgresql"]],
  [/JSONB/iu, ["jsonb"]],
  [/DeepSeek/iu, ["deepseek"]],
  [/ChatGPT|OpenAI|\bGPT\b/iu, ["gpt"]],
  [/asyncio/iu, ["asyncio"]],
  [/httpx/iu, ["httpx"]],
  [/aiohttp/iu, ["aiohttp"]],
  [/FastAPI/iu, ["fastapi"]],
  [/\bGIL\b/iu, ["gil"]],
  [/\bMVCC\b/iu, ["mvcc"]],
  [/Kafka/iu, ["kafka"]],
  [/OAuth/iu, ["oauth2"]],
  [/Docker|Swarm/iu, ["docker"]],
  [/飞书|Feishu/iu, ["feishu"]],
]

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    return [fullPath]
  })
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/")
}

function isExcluded(relativePath, content) {
  const parts = relativePath.split("/")
  const basename = parts.at(-1) ?? ""
  if (!basename.endsWith(".md")) return "not-markdown"
  if (relativePath === "index.md") return "homepage"
  if (parts.includes("wiki")) return "wiki"
  if (parts.includes(".obsidian")) return "obsidian"
  if (parts.includes("images")) return "images"
  if (parts.includes("excalid")) return "excalid"
  if (parts.includes("templates") || parts.includes("template") || /template/i.test(basename)) return "template"
  if (basename.endsWith(".excalidraw.md")) return "excalidraw"
  if (/excalidraw-plugin:\s*parsed/i.test(content)) return "excalidraw"
  return null
}

function parseFrontmatter(content) {
  if (!content.startsWith("---\n") && !content.startsWith("---\r\n")) {
    return { hasFrontmatter: false, frontmatter: "", body: content }
  }
  const newline = content.startsWith("---\r\n") ? "\r\n" : "\n"
  const lines = content.split(newline)
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === "---") {
      return {
        hasFrontmatter: true,
        frontmatter: lines.slice(1, index).join("\n"),
        body: lines.slice(index + 1).join(newline),
      }
    }
  }
  return { hasFrontmatter: false, frontmatter: "", body: content }
}

function extractExistingTags(frontmatter) {
  const lines = frontmatter.split("\n")
  const tags = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const keyMatch = line.match(/^(\s*)tags\s*:\s*(.*)$/)
    if (!keyMatch) continue

    const [, indent, rest] = keyMatch
    if (rest.trim().startsWith("[")) {
      const raw = rest.trim().replace(/^\[/, "").replace(/\]$/, "")
      tags.push(...raw.split(",").map((tag) => tag.trim().replace(/^['"]|['"]$/g, "")))
      continue
    }
    if (rest.trim()) {
      tags.push(rest.trim().replace(/^['"]|['"]$/g, ""))
      continue
    }

    for (let next = index + 1; next < lines.length; next += 1) {
      const nextLine = lines[next]
      if (!nextLine.trim()) continue
      const nextIndent = nextLine.match(/^\s*/)?.[0].length ?? 0
      if (nextIndent <= indent.length && !nextLine.trim().startsWith("-")) break
      const item = nextLine.match(/^\s*-\s*(.+?)\s*$/)
      if (item) tags.push(item[1].replace(/^['"]|['"]$/g, ""))
    }
  }
  return tags
}

function removeTagsBlock(frontmatter) {
  const lines = frontmatter.split("\n")
  const output = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const keyMatch = line.match(/^(\s*)tags\s*:/)
    if (!keyMatch) {
      output.push(line)
      continue
    }

    const indentLength = keyMatch[1].length
    index += 1
    while (index < lines.length) {
      const nextLine = lines[index]
      if (!nextLine.trim()) {
        index += 1
        continue
      }
      const nextIndent = nextLine.match(/^\s*/)?.[0].length ?? 0
      if (nextIndent <= indentLength && !nextLine.trim().startsWith("-")) {
        index -= 1
        break
      }
      index += 1
    }
  }
  return output.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd()
}

function normalizeTag(rawTag) {
  if (!rawTag) return null
  const trimmed = String(rawTag).trim().replace(/^#+/, "")
  if (!trimmed) return null
  if (tagAliases.has(trimmed)) return tagAliases.get(trimmed)

  const lower = trimmed
    .normalize("NFKC")
    .replace(/&/g, "-")
    .replace(/[\s_]+/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
  if (!lower) return null
  if (tagAliases.has(lower)) return tagAliases.get(lower)
  return knownTags.has(lower) ? lower : null
}

function extractTopBodyTags(body) {
  const lines = body.split(/\r?\n/)
  const tags = []
  const removeIndexes = new Set()
  let checked = 0
  for (let index = 0; index < lines.length && checked < 20; index += 1, checked += 1) {
    const line = lines[index].trim()
    if (!line) continue
    if (/^(#[\p{L}\p{N}_/-]+\s*)+$/u.test(line)) {
      tags.push(...line.split(/\s+/))
      removeIndexes.add(index)
    }
  }
  if (!removeIndexes.size) return { tags, body }
  const nextBody = lines.filter((_, index) => !removeIndexes.has(index)).join("\n").replace(/^\n+/, "")
  return { tags, body: nextBody }
}

function firstHeading(body) {
  const line = body.split(/\r?\n/).find((candidate) => /^#\s+/.test(candidate.trim()))
  return line ? line.replace(/^#\s+/, "") : ""
}

function cleanFilename(relativePath) {
  return path
    .basename(relativePath, ".md")
    .replace(/^\d{4}-\d{4}\s*/u, "")
    .replace(/^\d{4}-\d{2}-\d{2}\s*/u, "")
    .replace(/[🎯📚🤖🧘🍖📘📈🚀🐷🕷️🍗💥🚨📖🏗️🚧]/gu, "")
    .trim()
}

function addScored(scores, rawTag, score) {
  const tag = normalizeTag(rawTag) ?? rawTag
  if (!tag || !knownTags.has(tag)) return
  scores.set(tag, Math.max(scores.get(tag) ?? 0, score))
}

function addMany(scores, tags, score) {
  for (const tag of tags) addScored(scores, tag, score)
}

function applyRules(scores, rules, text, score) {
  for (const [pattern, tags] of rules) {
    if (pattern.test(text)) addMany(scores, tags, score)
  }
}

function inferTags(relativePath, content, existingTags, bodyTags, body) {
  const scores = new Map()
  for (const [pattern, tags] of folderRules) {
    if (pattern.test(relativePath)) addMany(scores, tags, 100)
  }

  // Existing frontmatter can contain stale or overly broad tags from prior passes.
  // Keep it only as a weak hint; path/title/content rules are the source of truth.
  addMany(scores, existingTags, 8)
  addMany(scores, bodyTags, 55)

  const titleText = `${relativePath}\n${cleanFilename(relativePath)}\n${firstHeading(body)}`
  applyRules(scores, titleRules, titleText, 60)
  applyRules(scores, bodyRules, content.slice(0, 2500), 25)

  if (scores.has("mysql") || scores.has("redis") || scores.has("postgresql")) addScored(scores, "database", 55)
  if (scores.has("asyncio") || scores.has("httpx") || scores.has("aiohttp") || scores.has("fastapi") || scores.has("gil")) {
    addScored(scores, "python", 55)
  }
  if (scores.has("mcp") || scores.has("a2a") || scores.has("agent-framework")) addScored(scores, "ai-agent", 55)
  if (scores.has("deepseek") || scores.has("gpt")) addScored(scores, "llm", 55)
  if (scores.has("monetization") || scores.has("micro-saas")) addScored(scores, "commercialization", 55)
  if (relativePath.includes("💻基础知识/") && scores.size < MIN_TAGS) addScored(scores, "learning-note", 30)

  if (relativePath === "💻基础知识/算法/二分法.md") scores.delete("design-pattern")
  if (relativePath === "💻基础知识/基础知识索引.md") {
    scores.clear()
    addScored(scores, "basic-knowledge", 100)
    addScored(scores, "learning-note", 60)
  }

  return orderAndLimitTags(scores)
}

function orderAndLimitTags(scores) {
  const tags = [...scores.keys()]
  tags.sort((a, b) => {
    const ai = orderedPreference.indexOf(a)
    const bi = orderedPreference.indexOf(b)
    const scoreDiff = (scores.get(b) ?? 0) - (scores.get(a) ?? 0)
    if (scoreDiff !== 0) return scoreDiff
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    return a.localeCompare(b)
  })

  const required = tags.filter((tag) => (scores.get(tag) ?? 0) >= 90)
  const optional = tags.filter((tag) => (scores.get(tag) ?? 0) < 90)
  const selected = [...required, ...optional].slice(0, MAX_TAGS)
  selected.sort((a, b) => {
    const ai = orderedPreference.indexOf(a)
    const bi = orderedPreference.indexOf(b)
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    return a.localeCompare(b)
  })
  return selected
}

function renderTags(tags) {
  return ["tags:", ...tags.map((tag) => `  - ${tag}`)].join("\n")
}

function updateContent(content, tags) {
  const parsed = parseFrontmatter(content)
  const bodyTagResult = extractTopBodyTags(parsed.body)
  if (!parsed.hasFrontmatter) {
    return `---\n${renderTags(tags)}\n---\n${bodyTagResult.body.startsWith("\n") ? "" : "\n"}${bodyTagResult.body}`
  }

  const cleanedFrontmatter = removeTagsBlock(parsed.frontmatter)
  const nextFrontmatter = [cleanedFrontmatter, renderTags(tags)].filter(Boolean).join("\n")
  return `---\n${nextFrontmatter}\n---\n${bodyTagResult.body.startsWith("\n") ? "" : "\n"}${bodyTagResult.body}`
}

function verifyContent(relativePath, content) {
  const parsed = parseFrontmatter(content)
  if (!parsed.hasFrontmatter) return `${relativePath}: missing frontmatter`
  const tags = extractExistingTags(parsed.frontmatter)
  if (!tags.length) return `${relativePath}: missing tags`
  for (const tag of tags) {
    if (tag.startsWith("#")) return `${relativePath}: tag starts with #: ${tag}`
    if (tag !== tag.toLowerCase() || /\s/.test(tag) || /[^a-z0-9-]/.test(tag)) {
      return `${relativePath}: non-canonical tag: ${tag}`
    }
  }
  return null
}

const allFiles = walk(CONTENT_DIR).sort((a, b) => a.localeCompare(b))
const targets = []
const excluded = []
const failures = []

for (const file of allFiles) {
  const relativePath = toPosix(path.relative(CONTENT_DIR, file))
  const content = fs.readFileSync(file, "utf8")
  const excludeReason = isExcluded(relativePath, content)
  if (excludeReason) {
    excluded.push({ relativePath, reason: excludeReason })
    continue
  }
  targets.push({ file, relativePath, content })
}

let changed = 0
const samples = []

for (const target of targets) {
  const parsed = parseFrontmatter(target.content)
  const bodyTagResult = extractTopBodyTags(parsed.body)
  const existingTags = parsed.hasFrontmatter ? extractExistingTags(parsed.frontmatter) : []
  const tags = inferTags(
    target.relativePath,
    `${parsed.frontmatter}\n${bodyTagResult.body}`,
    existingTags,
    bodyTagResult.tags,
    bodyTagResult.body,
  )
  if (!tags.length) {
    failures.push(`${target.relativePath}: could not infer tags`)
    continue
  }

  const nextContent = updateContent(target.content, tags)
  const error = verifyContent(target.relativePath, nextContent)
  if (error) failures.push(error)

  if (nextContent !== target.content) {
    changed += 1
    if (samples.length < 30) samples.push({ relativePath: target.relativePath, tags })
    if (mode === "write") fs.writeFileSync(target.file, nextContent)
  }

  if (mode === "verify") {
    const verifyError = verifyContent(target.relativePath, target.content)
    if (verifyError) failures.push(verifyError)
  }
}

console.log(`mode: ${mode}`)
console.log(`content dir: ${CONTENT_DIR}`)
console.log(`target articles: ${targets.length}`)
console.log(`excluded files: ${excluded.length}`)
console.log(`files ${mode === "write" ? "changed" : "that would change"}: ${changed}`)

if (samples.length) {
  console.log("\nsample tag assignments:")
  for (const sample of samples) {
    console.log(`- ${sample.relativePath}: ${sample.tags.join(", ")}`)
  }
}

if (failures.length) {
  console.error("\nfailures:")
  for (const failure of failures.slice(0, 50)) console.error(`- ${failure}`)
  if (failures.length > 50) console.error(`... ${failures.length - 50} more`)
  process.exitCode = 1
}
