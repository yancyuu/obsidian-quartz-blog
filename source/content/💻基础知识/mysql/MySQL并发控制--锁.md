
## 面试问题：

<aside>
✅ 两个事务，事务A根据主键索引进行update, 事务B根据二级索引进行update，两者可能会发生死锁吗？（事务B根据二级索引查到的数据行等于事务A要更新的数据行）为什么
**在数据库系统中，当两个或多个事务试图互相等待对方释放资源时，就会发生死锁。死锁是一种资源竞争的情况，其中每个事务都在等待另一个事务释放某个资源，从而导致它们都无法继续执行**。

在你描述的情况下，事务A使用主键索引进行更新，而事务B使用二级索引进行更新，同时二级索引查找到的数据行与事务A要更新的数据行相同。这种情况下，死锁可能会发生，但不是必然发生，它取决于数据库管理系统的锁管理策略以及事务的具体执行方式。

以下是可能导致死锁的一种场景：

1. 事务A获取了主键索引上的锁，准备进行更新。
2. 事务B获取了二级索引上的锁，并查找到了与事务A要更新的数据行相对应的数据行。
3. 事务A尝试获取二级索引上的锁，因为它需要更新二级索引，而事务B已经持有了这些锁。
4. 事务B尝试获取主键索引上的锁，因为它需要更新主键索引，而事务A已经持有了这些锁。

在这种情况下，事务A和事务B会互相等待对方释放锁，从而导致死锁。

然而，是否会发生死锁还取决于数据库管理系统的具体实现。现代数据库管理系统通常具有死锁检测和解决机制，它们可以检测到死锁并采取适当的措施，例如终止一个事务以解开死锁。因此，虽然死锁是可能的，但数据库管理系统通常会采取措施来减少死锁的影响。

</aside>

## 共享锁(也称读锁)

在MySQL数据库中，共享锁（Shared Locks），也常被称为读锁（Read Locks），是一种锁定机制，用于控制多个事务对数据的并发访问。具体地，共享锁允许多个事务同时读取一个数据项，但阻止任何事务对其进行写操作（即添加排他锁或写锁）。

### 1. 共享锁的特点：

1. **允许多读**: 当一个数据项被共享锁锁定后，其他的事务还是可以对这个数据项加共享锁进行读取。
2. **阻止写**: 一旦一个数据项被加了共享锁，任何其他的事务都不能对这个数据项加排他锁（Exclusive Locks）或写锁（Write Locks），直到所有共享锁都被释放。
3. **兼容性**: 共享锁和其他共享锁是兼容的，即多个事务可以同时持有对同一数据项的共享锁。但它和排他锁是不兼容的。

### 2. 在MySQL中如何使用：

在SQL语句中，可以使用`LOCK IN SHARE MODE`子句来请求共享锁，例如：

```sql
SELECT * FROM table_name WHERE column_name = some_value LOCK IN SHARE MODE;

```

这条SQL语句会对选中的数据行加上共享锁。

### 共享锁与隔离级别：

MySQL的事务隔离级别也会影响共享锁的行为。例如，在"可重复读"（REPEATABLE READ）隔离级别下，读操作不会自动地添加共享锁，需要通过显式的锁定语句来添加。

总体来说，共享锁是数据库事务控制中非常重要的一种锁类型，用于实现数据的并发读取和数据一致性。

## 独占锁(也称写锁)

### 兼容关系

共享锁（读锁）和其他共享锁是兼容的，即多个事务可以同时持有对同一数据项的共享锁。但它和排他锁是不兼容的。

|  | 写锁 | 读锁 |
| --- | --- | --- |
| 写锁 | 不兼容 | 不兼容 |
| 读锁 | 不兼容 | 兼容 |

### 锁的粒度:

表级锁:并发性低

行级锁:并发高，开销大。

阻塞和死锁

阻塞:慢查询，排它锁。占有了被锁事务的资源。

死锁:两个及其以上的事务，出现循环等待。事务之间相互占用事务之前的资源。

### **Innodb提供四种粒度的锁：**

S：共享锁，也称为读锁：只许读不许写

X：排他锁，也称为写锁：读写都不允许

IS：意向共享锁，也称为意向读锁 select ..lock in share mode

IX：意向排他锁，也称为意向写锁 select.. for update

1 记录锁：行级锁，依据InnoDB的聚集索引实现，针对索引加的锁。

2 间隙锁：两个索引项之间的间隔称为间隙。把这个间隙视为一个对象，然后在此对象上加锁，就是间隙锁。

3 Next-key lock：由记录锁和此记录前的间隙上的间隙锁组成。用于在重复读的隔离级别下解决幻读问题。

4 插入意象锁：基于间隙锁，专门用于插入操作。目的是为了提高并发度。

**悲观锁与乐观锁**:是人们定义出来的概念，你可以理解为一种思想，是处理并发资源的常用手段。

不要把他们与mysql中提供的锁机制(表锁，行锁，排他锁，共享锁)混为一谈。

### 1、悲观锁

顾名思义，就是对于数据的处理持悲观态度，总认为会发生并发冲突，获取和修改数据时，别人会修改数据。所以在整个数据处理过程中，需要将数据锁定。

悲观锁的实现，通常依靠数据库提供的锁机制实现，比如mysql的排他锁，select .... for update来实现悲观锁。

将商品库存数量nums字段类型设为unsigned，保证在数据库层面不会发生负数的情况。

悲观锁在并发控制上采取的是先上锁然后再处理数据的保守策略，虽然保证了数据处理的安全性，但也降低了效率。

注意：使用悲观锁，需要关闭mysql的自动提交功能，将 set autocommit = 0;

注意：使用select…for update会把数据给锁住，需要注意一些锁的级别，MySQL InnoDB默认Row-Level Lock，所以只有「明确」地指定主键，MySQL 才会执行Row lock (只锁住被选取的数据) ，否则MySQL 将会执行Table Lock (将整个数据表单给锁住)。

### 2、乐观锁

顾名思义，就是对数据的处理持乐观态度，乐观的认为数据一般情况下不会发生冲突，只有提交数据更新时，才会对数据是否冲突进行检测。

如果发现冲突了，则返回错误信息给用户，让用户自已决定如何操作。

乐观锁的实现不依靠数据库提供的锁机制，需要我们自已实现，实现方式一般是记录数据版本，一种是通过版本号，一种是通过时间戳。

给表加一个版本号或时间戳的字段，读取数据时，将版本号一同读出，数据更新时，将版本号加1。

当我们提交数据更新时，判断当前的版本号与第一次读取出来的版本号是否相等。如果相等，则予以更新，否则认为数据过期，拒绝更新，让用户重新操作。

乐观锁是基于程序实现的，所以不存在死锁的情况，适用于读多的应用场景。如果经常发生冲突，上层应用不断的让用户进行重新操作，

这反而降低了性能，这种情况下悲观锁就比较适用。