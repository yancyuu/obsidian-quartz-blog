
### ZooKeeper 是什么

ZooKeeper 是一个开源的分布式协调服务，由 Apache 软件基金会管理。它主要用于构建高可用、高性能和可靠的分布式应用。ZooKeeper 提供了一系列简单的原语（如数据存储、命名服务、分布式锁等），让分布式应用能更容易地实现诸如数据一致性、配置管理、同步和分组服务等复杂功能。

### ZooKeeper 主要特点：

1. **高可用与分区容错**：通过副本机制，ZooKeeper 可以容忍部分节点的失败。
2. **一致性**：所有的写操作都是原子性的，并且能得到全系统一致的视图。
3. **顺序一致性**：所有从同一客户端发出的操作都会按其发出顺序进行应用。
4. **快速读取**：由于 ZooKeeper 将所有数据存储在内存中，因此读操作一般非常快。
5. **简单的API**：提供了非常简单的 API 来管理存储的数据节点，以及监听这些节点数据变化的能力。

### ZooKeeper 基础概念：

1. **节点（ZNode）**：ZooKeeper 的数据模型是一种层次性的文件系统，由节点（ZNode）组成。
2. **临时节点**：除了常规的永久节点外，还有临时节点，这些节点在创建它们的客户端会话结束后会被自动删除。
3. **版本**：每个 ZNode 都有一个与之相关的版本信息，用于在并发条件下解决数据一致性问题。
4. **Watchers**：客户端可以注册 Watcher 来监听数据变化。

### ZooKeeper 常见用例：

1. **名称服务**
2. **配置管理**
3. **分布式锁**
4. **领导选举**
5. **队列和协调**

大型分布式系统，如 Kafka、Hadoop 和 HBase，常常依赖 ZooKeeper 进行分布式协调。

### Dapr和ZooKeeper的不同点

Dapr（分布式应用运行时，Distributed Application Runtime）和 ZooKeeper 虽然都是分布式系统中的重要组件，但它们的目标和功能有很大的不同。

**Dapr：**

1. **抽象和便利性**：Dapr 旨在简化分布式应用开发，通过提供一系列易于使用的 API 和 SDK 来解决微服务中常见的问题。
2. **可扩展性**：Dapr 可以与各种编程语言和框架一起使用。
3. **模块化和可插拔**：Dapr 提供一系列构建块（building blocks），如状态管理、发布/订阅消息、服务调用等，这些构建块是可插拔的。
4. **运行时环境**：Dapr 可以运行在多种环境中，包括 Kubernetes。
5. **跨语言和跨平台**：Dapr 旨在为各种编程语言和应用框架提供统一的接口。

**ZooKeeper：**

1. **分布式协调**：ZooKeeper 主要用于分布式应用的协调服务，例如命名服务、配置管理和领导选举。
2. **一致性和高可用性**：ZooKeeper 的设计目标之一是提供高可用和一致性保证。
3. **低级API**：ZooKeeper 的 API 更为底层，通常用于解决分布式一致性和同步问题。
4. **数据模型**：ZooKeeper 使用基于树的数据结构（ZNode）来存储信息。

总结来说，Dapr 主要是一个用于构建微服务和分布式应用的应用级工具，提供了一系列高级的构建块来简化分布式系统开发。而 ZooKeeper 更多的是一个用于解决分布式系统中的协调问题的底层工具。两者在某些应用场景中可能会一起使用，但它们的功能和目标各有侧重。