结论：当前接入方案已升级为“团队目录 `.env` + lark-cli profile + PATH 级真实 wrapper”。`~/.local/bin/lark-cli` 位于 `~/.npm-global/bin` 之前，会先读取最近的团队 `.env`，选择或创建对应 `LARK_CLI_PROFILE`，再把 `--profile` 注入真实 `lark-cli` 调用。这样 shell、脚本、AI agent 子进程只要通过 PATH 调用 `lark-cli`，都会走同一套团队隔离逻辑，不再依赖 `~/.zshrc` 里的 zsh function。

# 一、当前已经怎么做的

|位置/组件|作用|注意事项|
|---|---|---|
|`~/.local/bin/lark-cli` PATH 级 wrapper|作为真实可执行入口拦截所有经 PATH 调用的 `lark-cli` 命令，向上查找最近的团队 `.env`，解析 profile 和 app 配置，然后调用真实 CLI。|`~/.zshrc` 不再定义 `lark-cli()` 函数，只保留 PATH；不要在文档或日志中输出 `.env` 的具体密钥值。|
|团队目录 `.env`|定义当前团队使用哪个 `LARK_CLI_PROFILE`、品牌和应用凭据变量名。|只记录变量名和模板，不公开真实 secret。|
|`~/.npm-global/bin/lark-cli`|真实 npm 安装的 `@larksuite/cli` 入口。|wrapper 通过 `LARK_CLI_REAL` 可覆盖真实 CLI 路径。|
|`~/.lark-cli/` 与系统应用支持目录|保存 lark-cli 的全局配置、profile、缓存和认证状态。|这是敏感共享状态；不要复制、打印或提交。|

**调用链路：**用户、脚本或 agent 在团队目录执行 `lark-cli` → PATH 命中 `~/.local/bin/lark-cli` → wrapper 用 `pwd -P` 从真实当前目录向上查找最近的 `.env` → 解析 `LARK_CLI_PROFILE` → 选择/创建 profile → 调用真实 CLI 并注入 `--profile` → 访问飞书/Lark API。只有显式调用 `~/.npm-global/bin/lark-cli` 或修改 PATH 绕过 wrapper 时，才需要额外手动传 `--profile`。

# 二、wrapper 的核心逻辑

1. 通过 `~/.local/bin/lark-cli` 作为 PATH 级入口；从真实当前目录 `pwd -P` 开始，向父目录查找最近的 `.env`。
    
2. 在子 shell 中 source 该 `.env`，避免污染当前 shell。
    
3. 读取 `LARK_CLI_PROFILE`，并读取 `LARK_APP_ID` / `FEISHU_APP_ID` 与 `LARK_APP_SECRET` / `FEISHU_APP_SECRET`。
    
4. 如果 profile 已存在，直接使用；如果 profile 名不存在但 app id 已匹配到已有 profile，则复用该 profile。
    
5. 如果 profile 不存在，则用 `profile add --app-secret-stdin` 创建，避免 secret 出现在命令行参数里。
    
6. 最后调用真实 CLI，并在参数前注入 `--profile <resolved_profile>`。
    

**关键点：**当前实际使用的变量是 `LARK_CLI_PROFILE`，不是 `LARK_PROFILE`。文档、团队模板和脚本都应统一使用 `LARK_CLI_PROFILE`。

# 三、团队目录 .env 模板

```bash
# profile 名建议和团队目录名一致
LARK_CLI_PROFILE=<team-folder-name>
LARK_CLI_BRAND=feishu

# 二选一命名风格，保持团队内一致即可
LARK_APP_ID=<app_id>
LARK_APP_SECRET=<app_secret>

# 或：
# FEISHU_APP_ID=<app_id>
# FEISHU_APP_SECRET=<app_secret>

# 可选：真实 CLI 路径，默认通常无需配置
# LARK_CLI_REAL=/Users/distill/.npm-global/bin/lark-cli
```

|变量|含义|是否可公开|
|---|---|---|
|`LARK_CLI_PROFILE`|当前团队使用的 lark-cli profile 名。|可以公开。|
|`LARK_CLI_BRAND`|品牌/域，通常为 `feishu`。|可以公开。|
|`LARK_APP_ID` / `FEISHU_APP_ID`|飞书应用 ID。|按内部规范处理，不和 secret 一起公开。|
|`LARK_APP_SECRET` / `FEISHU_APP_SECRET`|飞书应用密钥，用于创建/更新 profile。|**不可公开。**|

# 四、多用户/多团队使用方式

|场景|推荐做法|原因|
|---|---|---|
|一个人维护多个团队|每个团队目录放自己的 `.env`，每个 `.env` 使用不同 `LARK_CLI_PROFILE`。|进入不同目录时自动切换 profile，避免串应用配置。|
|多个人使用同一台机器|优先使用各自 OS 用户账号；如果共用账号，至少明确 profile 和 user auth 的归属。|lark-cli 全局 profile/auth 状态在用户账号下共享，共用 OS 账号不能做到强隔离。|
|AI/脚本跑报表|默认通过 PATH 调用 `lark-cli`，让 `~/.local/bin/lark-cli` wrapper 自动注入团队 profile；需要硬兜底或明确绕过 wrapper 时，再显式加 `--profile <profile>`。|Python subprocess、workflow agent 或非交互 shell 不会加载 zsh function，但会按 PATH 查找真实命令；PATH 级 wrapper 能覆盖这些调用场景。|
|临时切换团队|先 `cd /Users/distill/teams/<team>`，再运行 `lark-cli ...`。|wrapper 是 cwd-sensitive，会读取最近的 `.env`。|

# 五、常用命令

```bash
cd /Users/distill/teams/<team>
lark-cli profile list
lark-cli docs +fetch --api-version v2 --doc "<doc_url>"
lark-cli contact +search-user --query "<name>" --as user
```

```bash
PROFILE=<team-profile>
lark-cli --profile "$PROFILE" docs +fetch --api-version v2 --doc "<doc_url>"
lark-cli --profile "$PROFILE" contact +search-user --query "<name>" --as user
```

```bash
cd /Users/distill/teams/<team>
lark-cli auth login --scope "contact:contact:readonly"
lark-cli auth login --scope "im:message:readonly"
```

# 六、接入新团队的步骤

1. 在 `/Users/distill/teams/<team>/` 创建或确认团队专用 `.env`。
    
2. 设置 `LARK_CLI_PROFILE=<team-folder-name>`，profile 名尽量与团队目录名一致。
    
3. 写入应用 ID 和应用密钥变量；密钥只放本地 `.env`，不要写入 CLAUDE.md、飞书文档或日志。
    
4. 进入团队目录后运行 `lark-cli profile list`，触发 wrapper 检查/创建 profile。
    
5. 如需 user 身份访问联系人、消息、云文档等，按最小 scope 执行 `lark-cli auth login --scope ...`。
    
6. 在脚本中显式传 `--profile`，并把 profile 作为参数/配置项。
    

# 七、安全与排错

|问题|排查方式|处理建议|
|---|---|---|
|命令用了错误团队的 profile|检查当前 `pwd` 是否在正确团队目录；检查最近的 `.env`。|切到正确目录，或在脚本中显式 `--profile`。|
|脚本/agent 子进程仍串到错误 profile|检查 `command -v lark-cli` 是否为 `~/.local/bin/lark-cli`；检查脚本是否显式调用 `~/.npm-global/bin/lark-cli` 绕过 wrapper。|优先修正 PATH 或改用 `lark-cli` 入口；确需直连真实 CLI 时，必须显式传 `--profile <profile>`。|
|权限不足|看错误中的缺失 scope 和当前身份 `--as user` / `--as bot`。|按最小 scope 授权；bot 权限需要在开发者后台配置。|
|多个人共用 OS 账号|确认 profile/auth 是否会共享。|强隔离场景建议分 OS 用户账号；共用账号只能做到 profile 级隔离，不能做到完整人级隔离。|
|密钥泄露风险|检查文档、日志、报告是否出现 secret/token/password。|只记录变量名；secret 只在本地 `.env` 和 lark-cli 安全存储中存在。|

**边界：**profile 解决的是“不同团队/应用配置不要串”的问题；如果多个人共用同一个系统账号，lark-cli 的全局认证状态仍可能共享。需要人级强隔离时，应使用独立 OS 用户账号或独立运行环境。

  

# 八、2026-06-09 补充：lark-cli bot-only 修复与授权注意事项

**结论：**当前所有 lark-cli profile 默认仍为 bot；当 bot 实在不可用时，允许说明原因后回落到个人授权 / `--as user`。

## 已完成的修复

|修复项|当前状态|
|---|---|
|全部 lark-cli profile|18 / 18 当前保持 `default-as: bot`，`strict-mode` 已放开为 `off`（曾短暂收紧为 bot-only，后因业务反馈放宽）|
|user token|已逐个检查并清理；`teams-root` 原有 user token 已 logout|
|skill 与长期记忆|已更新为“默认 bot + 必要 user fallback”规则；不再一刀切禁止 `lark-cli auth login`，但改用用户授权前必须说明原因|

---

# 九、2026-06-09 补充：放开 bot-only 硬限制

**最新规则：**飞书文档 / 云空间文件任务默认仍使用 bot 身份；当 bot 实在不可用时，允许说明原因后改用个人身份授权 / `--as user`，不再一刀切拦截。

|项目|调整后规则|
|---|---|
|默认身份|仍优先使用 `--as bot`，并优先把新建资源放到指定知识库。|
|允许 fallback 的场景|bot 权限不足、资源仅当前用户可见、需要当前用户 open_id / “我的”语义，或接口本身 user-only。|
|用户授权要求|改用个人身份前必须说明具体原因，例如“bot 无法访问该个人资源”或“该接口仅支持 user_access_token”。|
|配置变化|所有 lark-cli profile 保持 `default-as: bot`，并将 `strict-mode` 放开为 `off`，以支持必要的显式 user fallback。|
|Hook 变化|原 PreToolUse bot-only hook 已从全局 settings 删除，对应脚本也已删除；后续不再自动拦截或提醒，依赖 profile 默认 bot 与人工规则执行。|

- 禁止无说明地静默切到 user 或 auto。
    
- 建议常规团队文档 / 文件写入仍显式携带 `--as bot`。
    
- 需要任务发起人权限时，优先由 bot 使用已知 open_id 授权；无法取得 open_id 且确需授权时，再说明原因后让用户授权。
    

---

# 十、2026-06-09 补充：PATH 级 wrapper 修复 user 授权串应用问题

**已验证修复：**原方案把 team-aware profile 逻辑写在 `~/.zshrc` 的 `lark-cli()` zsh function 中，只对当前交互 zsh 生效；Python subprocess、AI agent、workflow 或脚本可能直接执行真实二进制 `~/.npm-global/bin/lark-cli`，从而绕过 profile 注入，导致 `--as user` 授权页显示错误应用。现已迁移到 `~/.local/bin/lark-cli` 真实 wrapper，并确认 PATH 中 `~/.local/bin` 位于 `~/.npm-global/bin` 之前。

|检查项|期望结果|说明|
|---|---|---|
|`command -v lark-cli`|`/Users/distill/.local/bin/lark-cli`|说明 PATH 级 wrapper 已生效。|
|`lark-cli config show`|`profile` 为当前团队，例如 `electronics-development-assistant`|确认当前目录的 `.env` 被读取并注入。|
|user 授权页应用名|显示当前团队对应飞书应用|如果仍显示其他助理，优先检查是否绕过 wrapper 或当前团队 `.env` 的 `LARK_APP_ID` 是否指向错误应用。|

```bash
cd /Users/distill/teams/electronics-development-assistant
command -v lark-cli
lark-cli config show
lark-cli auth login --scope "contact:user.basic_profile:readonly" --no-wait --json
```

**注意：**user 授权是“当前飞书用户授权给当前飞书应用”，不是授权给本地目录。授权页顶部显示的应用名由当前生效的 `LARK_APP_ID` / profile 决定；如果 profile 注入被绕过，就可能串到默认或旧应用。