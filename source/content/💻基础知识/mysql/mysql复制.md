

Owner: yancy yu

## mysql复制功能介绍

1. 实现在不同服务器上的数据分布
    1. 利用二进制日志增量进行
    2. 不需要太多带宽
    3. 但是使用基于行的复制在进行大批量的更改时会对带宽带来一定的压力，特别时跨IDC(互联网数据中心)环境下进行复制，应该分批进行。
2. 实现读取的负载均衡
    1. 需要其他主键配合完成
    2. 利用DNS轮询的方式把程序的读连接到不同的备份数据库
    3. 使用[LVS](https://www.cnblogs.com/vycz/p/12917932.html)，[haproxy](https://baike.baidu.com/item/haproxy/5825820?fr=aladdin)这样得代理方式
3. 增强了数据的安全性
    1. 非数据共享
    2. 利用备库的备份来减少主库的负载
    3. 复制不能代替备份
    4. 避免单点失败
4. 实现数据库高可用和故障切换
5. 实现数据库在线升级

## mysql的复制工作方式

1. 主将变更写入二进制文件
2. 从将读取主的二进制日志变更写入到relay_log中
3. 在从上重放relay_log中得日志

![Untitled](Untitled%2015.png)

## 基于日志点的复制配置步骤

1. 设置权限
    
    在主DB服务器建立账号 create user ‘repl’ @‘ip段’ identified by ‘PassWord’ //建议网段最好是从服务器的网段
    
    授权 GRANT
    

**配置日志点的复制配置步骤如下**

1. 配置主数据库服务器
    
    bin_log = mysql-bin
    
    sever_id = 100
    
2. 从服务器配置
    
    relay_log = mysql-relay-bin
    
    read_only = on[可选建议]
    
3. 初始化从服务器数据
    
    mysqldump   – master-data =2 -single-transaction (会加锁)
    
    xtrabackup --slave-info（纯innodb的话不阻塞）
    
4. 启动复制链路
    
    创建完链路后启动链路
    
    ![Untitled](Untitled%2016.png)
    
    start  slaver；
    
    优点：
    
    - 相对成熟，bug少
    - 对sql查询没有任何限制
    
    缺点:
    
    - 故障转移时重新获取新主的日志点的节点信息很难获取到

## 基于GTID的复制

**从mysql5.6开始**

![Untitled](Untitled%2017.png)

GTID：全局事务ID，其保证为每一个在主上提交的事务在复制集群中可以生成一个唯一的ID

1. 设置用户
    
    在主DB服务器建立账号 create user ‘repl’ @‘ip段’ identified by ‘PassWord’ //建议网段最好是从服务器的网段
    
    授权 GRANT
    

 **配置日志点的复制配置步骤**

1. 配置主数据库服务器
    
    bin_log = mysql-bin
    
    sever_id = 100
    
    gtid_mode = on (启动gtid的方式)
    
    enforce-gtid-consistency 强制gtid一致性
    
    log-slave-updates = on 从记录主的修改日志[mysql≤5.6 一定要设置]
    
2. 从服务器配置
    
    sever_id = 101
    
    relay_log = mysql-relay-bin
    
    gtid_mode = on (启动gtid的方式)
    
    enforce-gtid-consistency 强制gtid一致性
    
    read_only = on[可选建议]
    
3. 初始化从服务器数据：记录的备份的最后的事务值
    
    mysqldump   – master-data =2 -single-transaction (会加锁)
    
    xtrabackup --slave-info（纯innodb的话不阻塞）
    
4. 启动复制链路
    
    缺点：
    
    - 故障处理比较复杂
    - 对执行的sql有一定的限制

## 复制性能优化

### 影响主从延迟的因素:

- 主库写入二进制日志的时间 ------→ 控制主库的事务大小，分割大事务
- 二进制日志传输的时间 ------→ 使用MINED日志格式或设置set binlog_row_image=minimal
- 默认情况下从只有一个sql线程，主上并发修改变成了串行------→5.6以上可以多线程复制，5.7可以配置逻辑时钟
    
    ![Untitled](Untitled%2018.png)
    
    ## mysql复制常见问题
    
    ### 数据损坏或丢失
    
    - 主或者从意外宕机
        - 使用跳过二进制日志事件
        - 注入空事务的方式先恢复中断的复制链路
        - 在使用其他方法来对比主从服务器上的数据
    - 主库上的二进制文件损害
    - 备库上的中继日志损坏
    - 在从库上进行数据修改造成主从复制错误
    - 不唯一的server_id或server_uuid
    - max_allow_packer设置引起的主从复制错误
    
    ### 主从复制无法解决的问题
    
    - 分担主数据库的写负载
    - 自动进行故障转移以及主从切换(需要组件)
    - 提供读写分离功能(需要组件)