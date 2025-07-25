
## 事务的隔离级别

[事务](事务.md)

## **事务的隔离级别是由** **MySQL并发控制--MVCC（多版本并发控制）实现的**

概括来说就是当一个事务开始时，它被赋予一个唯一的，永远增长的事务ID。每当事务向数据库写入任何内容时，它所写入的数据都会被标记上写入者的事务ID，**一个事务只能看到在他之前提交的事务修改的数据。**

**实现方式：每行记录都会保存两个隐藏列：创建时版本号、删除时版本号，每开一个事物版本号递增，每次都会用当前版本号跟查询到的版本号做对比**

**具体实现方式：**

首先对于mysql来说相信也并不陌生，**mysql默认的事务的隔离级别是3，即可以实现可重复读**，那mysql又是怎样实现可重复读的呢？

下边进行简单的介绍

这里就要提到了mvcc，即多版本并发控制 首先先来看一个事务的执行图

![Untitled](Untitled%2019.png)

此时分别有四个事物及其执行顺序

事务1，将名字更改为张三并提交

事务2，将名字更改为张小三并提交

事务3，将名字更改为张老三并提交

事物4，进行两次查询，注意图中的查询时机

在RR级别：select1=张三 select2=张三

在rc级别下：select1=张三 select2=张小三

在rc级别下出现了不可重复读。

基于undo_log的版本链

![Untitled](Untitled%2020.png)

readview是什么

readview是快照读sql执行时mvcc提取数据的依据

**快照读就是最普通的select查询sql语句**

**当前读指执行下列语句进行数据读取的方式**

insert、update、delete

select … for update select … lock in share mode

版本链数据访问规则：

判断当前事物id是否等于creator_trx_id？成立的话就说明就是自己的事物更改的，则可以访问

判断trx_id<min_trx_id? 成立就说明事务已经提交了，可以访问

trx_id>min_trx_id？成立说明该事务是在readview生成以后才开启，不允许访问

判断min_trx_id<=trx_id<=max_trx_id，成立在m_ids数据中对比，不再当前活跃事务中的即代表数据已经提交了，即是可以访问的

我们先来分析事务4的第一次查询，此时它的readview是

m_ids={2，3，4}

min_trx_id=2

max_trx_id=5

creator_trx_id=4

再上图中的undo_log中进行寻找，即可读取到1号事务提交的数据，张三

可重复读(RR)：仅在第一次执行快照读时生成readview，后续快照读复用（有例外）

![Untitled](Untitled%2021.png)

RR级别下使用mvcc能避免幻读吗？能，但不完全能

连续多次快照，readview会产生复用，没有幻读问题

特例当两次快照之间存在当前读，readview会重新生成，导致产生幻读

![Untitled](Untitled%2022.png)

**SELECT**

InnoDB会根据以下两个条件检查每行记录：

InnoDB只查找版本早于当前事务版本的数据行（也就是，行的系统版本号小于或等于事务的系统版本号），这样可以确保事务读取的行，要么是在事务开始前已经存在的，要么是事务自身插入或者修改过的。

行的删除版本要么未定义，要么大于当前事务版本号。这可以确保事务读取到的行，在事务开始之前未被删除。

只有符合上述两个条件的记录，才能返回作为查询结果

**INSERT**

InnoDB为新插入的每一行保存当前系统版本号作为行版本号。

**DELETE**

InnoDB为删除的每一行保存当前系统版本号作为行删除标识。

**UPDATE**

InnoDB为插入一行新记录，保存当前系统版本号作为行版本号，同时保存当前系统版本号到原来的行作为行删除标识。

保存这两个额外系统版本号，使大多数读操作都可以不用加锁。这样设计使得读数据操作很简单，性能很好，并且也能保证只会读取到符合标准的行，不足之处是每行记录都需要额外的存储空间，需要做更多的行检查工作，以及一些额外的维护工作。

缓存穿透：

```
   key对应的数据在数据源并不存在，每次针对此key的请求从缓存获取不到，请求都会到数据源，从而可能压垮数据源。比如用一个不存在的用户id获取用户信息，不论缓存还是数据库都没有，若黑客利用此漏洞进行攻击可能压垮数据库。

```

缓存穿透解决方案
一个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。有很多种方法可以有效地解决缓存穿透问题，最常见的则是采用布隆过滤器，将所有可能存在的数据哈希到一个足够大的bitmap中，一个一定不存在的数据会被 这个bitmap拦截掉，从而避免了对底层存储系统的查询压力。另外也有一个更为简单粗暴的方法（我们采用的就是这种），如果一个查询返回的数据为空（不管是数据不存在，还是系统故障），我们仍然把这个空结果进行缓存，但它的过期时间会很短，最长不超过五分钟。