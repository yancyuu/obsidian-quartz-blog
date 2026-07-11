---
tags:
  - basic-knowledge
  - backend
  - database
  - learning-note
  - mysql
---

MySQL 日志可以分成两类：

1. **Server 层日志**：binlog、慢查询日志、通用日志
2. **InnoDB 存储引擎日志**：redo log、undo log

不同日志解决的问题不同：

- **binlog**：复制、数据恢复、审计变更
- **redo log**：崩溃恢复，保证已提交事务不丢
- **undo log**：事务回滚、MVCC 版本链
- **slow log**：定位慢 SQL
- **general log**：记录客户端所有请求，通常只在排查问题时临时开启

## 1. binlog（二进制日志）

binlog 记录对 MySQL 数据产生修改的事件，主要用于：

- 主从复制
- 数据恢复
- 审计数据变更

执行失败和回滚的语句通常不会生成最终有效的变更日志。

常用命令：

```sql
show variables like 'binlog_format';
show binary logs;
flush logs;
```

查看日志内容：

```bash
mysqlbinlog <日志文件名>
```

设置当前 session 的 binlog 格式：

```sql
set session binlog_format = row;
```

## 2. binlog 格式

### STATEMENT

记录 SQL 语句。

优点：日志量较小。

缺点：遇到非确定性函数、触发器、自定义函数时，主从可能不一致。

### ROW

记录每一行数据的实际变更。

优点：更安全，主从一致性更好，也更适合恢复数据。

缺点：日志量更大，并且要求表结构保持一致。

### MIXED

混合模式，MySQL 根据语句风险自动在 statement 和 row 之间切换。

## 3. binlog 对复制的影响

### SBR：Statement-Based Replication

基于 SQL 语句复制。

风险：

- 非确定性时间函数可能导致主从不一致
- 触发器、自定义函数修改数据时可能不一致
- 某些场景需要更多行锁

### RBR：Row-Based Replication

基于行变更复制。

特点：

- 复制结果更确定
- 对数据恢复更友好
- 日志量更大
- 主从表结构必须一致

## 4. redo log（重做日志）

redo log 是 InnoDB 的崩溃恢复日志，用于保证已提交事务在数据库异常重启后仍然能够恢复。

修改数据时，InnoDB 通常先修改内存中的 page，再刷盘。如果此时数据库崩溃，内存中的修改可能还没有落盘。

redo log 记录“已经做过的修改”，数据库重启后可以根据 redo log 重新应用这些修改。

特点：

- 顺序写入，性能较好
- 用于 crash recovery
- 保证事务持久性

## 5. undo log（回滚日志）

undo log 记录数据修改前的旧版本，用于：

- 事务回滚
- MVCC 一致性读

例如：

- `DELETE` 一行时，undo log 中记录对应的 `INSERT`
- `INSERT` 一行时，undo log 中记录对应的 `DELETE`
- `UPDATE` 一行时，undo log 中记录反向 `UPDATE`

InnoDB 的 MVCC 会基于 undo log 形成版本链，让不同事务在不同隔离级别下读到合适的数据版本。

## 6. 回滚段与 undo log

“回滚段”这个概念更常见于 Oracle。它用于保存事务修改前的旧版本数据，支持事务回滚、一致性读和并发控制。

在 MySQL InnoDB 中，对应能力主要由 undo log 实现。

可以简单理解为：

- Oracle 常说 rollback segment
- InnoDB 常说 undo log / undo segment

## 7. 慢查询日志

慢查询日志用于记录执行时间超过阈值的 SQL，是定位性能问题的重要入口。

常见用途：

- 发现慢 SQL
- 分析索引是否命中
- 结合 `EXPLAIN` 做查询优化

相关笔记：[[EXPLAIN]]

## 8. 通用日志

通用日志会记录客户端发送给 MySQL 的所有请求。

它的信息非常全，但开销也大，一般只在临时排查问题时开启，不建议生产环境长期打开。

## 总结

| 日志 | 所属层 | 主要用途 |
| --- | --- | --- |
| binlog | Server 层 | 主从复制、数据恢复、审计 |
| redo log | InnoDB | 崩溃恢复、保证持久性 |
| undo log | InnoDB | 事务回滚、MVCC |
| slow log | Server 层 | 慢 SQL 分析 |
| general log | Server 层 | 请求排查 |

记忆方式：

- **binlog**：给别人看，主从复制/恢复用
- **redo log**：崩了以后重做
- **undo log**：错了以后回滚，也支撑 MVCC
