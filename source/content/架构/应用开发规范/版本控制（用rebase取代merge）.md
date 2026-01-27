> 想象你和同事在写同一份文档，merge 会产生"小张修改了这里" -> "小李修改了那里" 的混乱记录，而 rebase 就像把你们的修改按时间顺序整齐抄写到最新版本上

## 📌 基本原则

1. **只 rebase 自己的本地分支（比如自己的开发分支dev，dev_intention等）**（千万别动别人在用的分支）
    
2. **主分支（****master****）永远用 --no-ff merge（为了保留完整的历史记录）。**
    

使用 `--no-ff`（no fast-forward）合并选项时，Git 强制创建一个新的合并提交，即使你进行的变更可以通过“快进”（fast-forward）来合并。这样可以确保在主分支中，每一次合并都能够看到一个明确的合并记录。

如图：每一次被merge的多个提交在线上就有一个凸起，方便查阅，否则就变成了很不明显的一条线：

![](https://qcnzd8v4xqbd.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTUxZDI5MzgyOTcxNjJhMzEyZDMxZjI3MjJmOTU3ZjlfMjZabEdHWkxpaTcxeDFpSElVTHFsN2c3NlRJQWh3cnNfVG9rZW46VkVVc2JIYkJTb3JNNjN4WEN0ZWNBUHJlblpjXzE3Njc3NzQxNzE6MTc2Nzc3Nzc3MV9WNA)

3. **开始 rebase 前先** **`git pull`****（rebase就是保持和****master****同步，所以rebase前要pull最新的基准分支master）**
    

## 🔄 Rebase vs Merge 对比

```Java
传统 merge 流程：
A--B--C--M1--M2 (出现多个合并节点)
       /     /
      D--E--F
```

```Java
Rebase 流程：
A--B--C--D'--E'--F' (变成整洁的直线)
```

## 🛠️ 标准操作流程

### 场景：你在 feature/login 分支开发

1. 每天开始工作前：
    

```Java
git checkout master
git pull
git checkout feature/login
git rebase main  # 把主分支更新合并到你的分支
```

**🌟（如果发生冲突👉见后文处理）**

2. 提交代码时：
    

```Java
git push origin feature/login --force-with-lease 
# 注意必须强制推送！为什么？因为你变了基，不强制推送推不了。
```

## 🚧 冲突处理指南

1. ### 远程分支变基但本地未更新
    

> **问题**：远程分支（如 `origin/feature/login`）被 rebase 过，但你本地仍基于旧历史继续开发，推送时可能出现“拒绝推送”或提交冲突。

2. **先拉取并重置到远程最新**
    

```Markdown
git fetch origin
git checkout feature/login
# 与远程保持完全一致，注意：会丢弃本地未推送的提交
git reset --hard origin/feature/login
```

2. **将你的本地提交重新应用到最新远程之上**
    

`如果你还有本地提交，可先将它们存为临时分支`

```Markdown
git branch temp-login
# 重置后再 cherry-pick 回来
git cherry-pick temp-login~n..temp-login
# 删除临时分支
git branch -D temp-login
```

**或直接基于远程分支 rebase**

```Markdown
git checkout feature/login
git rebase origin/feature/login
# 再次推送
git push origin feature/login --force-with-lease
```

2. ### 内容和远程有冲突
    

```Java
开始rebase → 遇到冲突 → 解决冲突 → git add . → git rebase --continue → 循环直到完成
```

详细步骤：

1. 冲突文件会显示 `<<<<<<< HEAD` 标记
    
2. 用编辑器手动解决冲突
    
3. 执行：
    

```Java
git add 冲突文件名
git rebase --continue
```

4. 若想放弃：
    

```Java
git rebase --abort
```

## ⚠️ 重要禁忌

**❌ 禁止对以下分支做 rebase：**

- 主分支（master）这是基准分支，不需要动
    
- 别人正在使用的分支
    
- 已经推送到远程的共享分支
    

**✅ 正确使用场景：**

- 整理自己本地分支的多个提交
    
- 同步主分支最新代码到自己的开发分支
    

**如何更新sdk（common_sdk ai_sdk）**

sdk的修改也会放到版本管理里面，也就是说直接在项目目录下执行下面两行

```Markdown
git submodule init
git submodule update
```

切记 不要用git submodule update --remote （remote 不是固定版本检出）

## 💡 最佳实践

1. 频繁 rebase（建议每天至少一次）
    
2. 使用 `git rebase -i` 整理提交记录
    
3. 推送前用 `git log --graph` 确认历史线，保证分支线的线性。
    

## 🆘 常见问题

Q：rebase 后找不到之前的提交？ A：用 `git reflog` 找回历史记录

Q：误操作了 rebase 怎么办？ A：立即 `git rebase --abort`

**附：命令行速查表**

```Java
同步主分支 → git rebase master
继续 rebase → git rebase --continue
查看历史 → git log --oneline --graph
撤销提交 → git reset HEAD~1
```