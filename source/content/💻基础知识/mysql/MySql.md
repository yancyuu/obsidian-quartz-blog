---
tags:
  - basic-knowledge
  - kb/database/mysql
  - kb/meta
---

# MySQL 知识索引

这篇作为 MySQL 基础知识的入口，只保留目录和关键关系，具体概念放到专题笔记中，避免重复维护。

## 事务与并发控制

- [事务](事务.md)：ACID、隔离级别
- [MVCC（多版本并发控制）](MVCC（多版本并发控制）.md)：ReadView、版本链、快照读/当前读
- [MySQL并发控制--锁](MySQL并发控制--锁.md)：共享锁、排它锁、锁粒度、阻塞与死锁

## 日志与复制

- [mysql日志](mysql日志.md)：binlog、redo log、undo log、slow log、general log
- [mysql复制](mysql复制.md)：主从复制相关基础

## 查询与性能

- [EXPLAIN](EXPLAIN.md)：执行计划分析（type / key / rows / Extra）
- [MySQL 索引原理与优化](MySQL索引原理与优化.md)：B+树、聚簇索引、索引失效、优化策略
- [MySQL 性能优化](MySQL性能优化.md)：基准测试、高可用架构、SQL 优化、结构优化

## 数据建模

- [数据范式](数据范式.md)

## 分布式相关

- [分布式事务](../分布式&高并发/分布式事务.md)
- [基准测试](../运维/基准测试.md)

## 维护原则

- 这篇只做索引，不再堆叠概念正文。
- 事务、锁、MVCC、日志、索引、性能优化分别维护在各自专题页。
- 原「分布式」目录下的高性能 MySQL 系列（7 篇残篇）已去重合并到本目录的 [索引原理与优化](MySQL索引原理与优化.md) 与 [性能优化](MySQL性能优化.md)。
