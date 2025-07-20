

- **mysql服务层日志**

## 1. 二进制日志

记录了所有对mysql的修改的时间(执行失败和回滚不生成日志)

binlog可以查看

格式：

**基于段的格式  binlog_format=STATEMENT:记录sql**

**基于段的格式  binlog_format=ROW：记录数据的更改(更安全，可恢复数据)**

**混合日志格式  binlog_fo,rmat=MIXED:记录sql**

数据库语句

:set session binlog_format=row:设置二进制日志的格式

show variables like ‘binlog_format’:查看二进制日志格式

:show binary logs:查看当前日志文件

flush logs:会生出新的log文件

mysqlbinlog   日志文件名  :查看日志文件内容

binlog_row_image:修改row格式日志写入模式

### mysql二进制日志格式对复制的影响

- 基于sql语名的复制（SBR）
    - 二进制日志格式使用的是statement
        - 触发器，自定义函数进行修改数据时可能造成数据不一致
        - 对于非确定性时间，无法保证主从一致
        - 相比起基于行的复制方式在执行上需要更多的行锁
- 基于行的复制（RBR）
    - 二进制日志格式使用的是基于行的日志格式
        - 无法用触发器
        - 表结构一定要一致
- 混合模式
    - 自动切换

## 2.慢查日志

## 3. 通用日志

- **mysql存储引擎日志**

1.重做日志

2.回滚日志

## 日志总结：

**MySQL的redo日志**

用于系统故障发生后的崩溃恢复。

修改数据时，会先修改内存的page，然后才同步到磁盘，如果在此期间发生异常，就恢复不了了，所以修改内存page后会写redo log（顺序写入，所以很快，对性能影响较小）

当数据库意外重启时，会根据 redo log 进行数据恢复，如果 redo log 中有事务提交，则进行事务提交修改数据。

**MySQL的undo日志**

用于故障恢复，方便执行撤销操作。

与 redo log 不同，undo log 一般是逻辑日志，根据每行记录进行记录。例如当 DELETE 一条记录时，undo log 中会记录一条对应的 INSERT 记录，反之亦然当 UPDTAE 一条记录时，它记录一条对应反向 UPDATE 记录。

通过 undo log 一方面可以实现事务回滚，另一方面可以根据 undo log 回溯到某个特定的版本的数据，InnoDB实现 MVCC 的功能时就会用到undo log。

**Mysql的二进制日志:主要用来主从复制**

记录了所有对mysql的修改的时间(执行失败和回滚不生成日志)

binlog可以查看

格式：

**基于段的格式  binlog_format=STATEMENT:记录sql**

**基于段的格式  binlog_format=ROW：记录数据的更改(更安全，可恢复数据)**

**混合日志格式  binlog_fo,rmat=MIXED:记录sql**

数据库语句

:set session binlog_format=row:设置二进制日志的格式

show variables like ‘binlog_format’:查看二进制日志格式

:show binary logs:查看当前日志文件

flush logs:会生出新的log文件

mysqlbinlog   日志文件名  :查看日志文件内容

binlog_row_image:修改row格式日志写入模式