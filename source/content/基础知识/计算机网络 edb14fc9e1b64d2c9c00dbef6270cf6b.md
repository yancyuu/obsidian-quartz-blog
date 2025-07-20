# 计算机网络

Owner: yancy yu
Tags: Interview

OSI 和 TCP/IP 协议之间的对应关系

OSI（开放系统互联）模型和 TCP/IP（传输控制协议/互联网协议）模型都是用于描述网络协议的分层架构，但它们有不同的起源和层次划分。

![Untitled](Untitled%201.jpeg)

### OSI 模型

OSI 模型由七层组成：

1. **物理层（Physical Layer）**
2. **数据链路层（Data Link Layer）**
3. **网络层（Network Layer）**
4. **传输层（Transport Layer）**
5. **会话层（Session Layer）**
6. **表示层（Presentation Layer）**
7. **应用层（Application Layer）**

### TCP/IP 模型

TCP/IP 模型通常由四层或五层组成：

1. **链路层（Link Layer）或网络接口层（Network Interface Layer）**
2. **网络层（Network Layer）**
3. **传输层（Transport Layer）**
4. **应用层（Application Layer）**

### OSI 和 TCP/IP 的对应关系

下面是 OSI 和 TCP/IP 模型之间的一种常见对应关系：

- **物理层（OSI）** 对应于 **链路层（TCP/IP）**
- **数据链路层（OSI）** 对应于 **链路层（TCP/IP）**
- **网络层（OSI）** 对应于 **网络层（TCP/IP）**
- **传输层（OSI）** 对应于 **传输层（TCP/IP）**
- **会话层（OSI）、表示层（OSI）和应用层（OSI）** 通常都被认为对应于 **应用层（TCP/IP）**

需要注意的是，这种对应关系并不是严格的一一对应，而是一种大致的层次映射。实际上，不同的网络协议和应用可能会有不同的层次划分和功能实现。

总体而言，OSI 模型更为详细和严格，而 TCP/IP 模型则更加灵活和实用，更贴近实际的网络协议和应用。

[TCP/IP](TCP%20IP%206894f6a7b1904d33a56ed3743a0f33c6.md)

[OAuth2 授权码模式为什么不直接返回access_token](OAuth2%20%E6%8E%88%E6%9D%83%E7%A0%81%E6%A8%A1%E5%BC%8F%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%9B%B4%E6%8E%A5%E8%BF%94%E5%9B%9Eaccess_token%2058ff3e00669c430d905145c0d96901ae.md)

[HTTP/HTTPS](HTTP%20HTTPS%207c58cdeaaf134f4593fde686b0d51ccc.md)

[GET/POST](GET%20POST%20d3a1a852ffac49f4907689ccc9216cf4.md)

[icmp](icmp%20e953984d0ccf4244b6f99be77507a85f.md)

[DNS](DNS%20fd529720652d44cca53926c688cefb69.md)

[负载均衡](%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%207f70e4984585443fa2b181db1002984f.md)

[Socket](Socket%20777173b8ede9467ca677c113ae6951c5.md)