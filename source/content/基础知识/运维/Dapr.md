

Dapr的全称是 “Distributed Application Runtime”，即 “分布式应用运行时”。Dapr 是一个开源项目，由微软发起，目前已加入CNCF孵化器项目。

在ServiceMesh初步成功，Sidecar模式被云原生社区普遍接受之后，效仿ServiceMesh，将应用需要的其他分布式能力外移到各种Runtime变成为一个趋势。这些Runtime会逐渐整合，最后和应用 Runtime 共同组成微服务，形成所谓的“Multi-Runtime”架构，又称Mecha：

![](https://pic1.zhimg.com/v2-a1f7c66e52b0ff493012be3e5fef3ef4_r.jpg)

Dapr项目是目前业界第一个Multi-Runtime / Mecha实践项目，下图来自Dapr官方，比较完善的概括了 Dapr 的能力和层次架构：

![](https://pic3.zhimg.com/v2-6c510fcf28eac33b82349a6cb6863cb6_r.jpg)

Dapr的愿景：**any language, any framework, anywhere**

Dapr的本质：面向云原生应用的**分布式能力抽象层**

![](https://pic4.zhimg.com/v2-82738d588df447e8fa9c57af03d3d5a7_r.jpg)

可移植性是Dapr的重要目标和核心价值。Dapr 的愿景， “any language, any framework, anywhere"，这里的 anywhere 包括：

- 公有云
- 私有云
- 混合云
- 边缘网络

而 Dapr 可移植性的基石在于标准API + 可拔插可替换的组件，下面这张来自 Dapr 官方网站的图片非常形象的展示了Dapr的这一特性：

![](https://pic1.zhimg.com/v2-224e3db1184ba1971ea78dc6b608a3b0_r.jpg)

从架构设计的角度看，Dapr 的精髓在于：通过抽象/隔离/可替换，解耦能力和实现，从而实现可移植性。

![](https://pic1.zhimg.com/v2-5267973feca363690f0ef9292f8db67c_r.jpg)

在传统的应用开发方式中，应用需要面向具体的实现编程，即当应用需要使用到某个能力时，就需要找到能提供该能力的底层组件，如上图中的 redis / consul / memcached / zookeeper 都可以提供分布式状态的存储能力。应用在选择具体组件之后，就需要针对该组件进行编程开发，典型如引入该组件的客户端SDK，然后基于这些SDK实现需要的分布式能力，如缓存、状态、锁、消息通讯等具体功能。

在 Dapr 中，Dapr 倡导 “面向能力编程"，即：

- Dapr API 提供了对分布式能力的抽象，并提取为标准API
- Dapr 的 Runtime 隔离 应用和底层组件的具体实现

而这些组件都是可替换的，可以在运行时才进行绑定。

Dapr 通过这样的方式，实现了能力和实现的解耦，并给出了一个美好的愿景：在有一个业界普遍认可并遵循的标准化API的基础上，用户可以自由选择编程语言开发云原生，这些云原生可以在不同的平台上运行，不被厂商和平台限制——终极目标是使得云原生应用真正具备跨云跨平台的可移植性。