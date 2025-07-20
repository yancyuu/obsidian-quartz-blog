

icmp是Internet控制报文协议。它是TCP/IP协议簇的一个子协议，用于在IP主机、路由器之间传递控制消息。控制消息是指网络通不通、主机是否可达、路由是否可用等网络本身的消息。

常见的应用：

1、ping ,该工具是用来测试设备之间互联互通性的；

@-a source-ip-address指定发送ICMP ECHO-REQUEST报文的源IP地址。如果不指定源IP地址，将采用出接口的IP地址作为ICMP ECHO-REQUEST报文发送的源地址。

@-c count指定发送ICMP ECHO-REQUEST报文次数。缺省情况下发送5个ICMP ECHOREQUEST报文。

@-h ttl-value指定TTL的值。缺省值是255。

@-t timeout指定发送完ICMP ECHO-REQUEST后，等待ICMP ECHO-REPLY的超时时间。
工作原理：
1.发送一个 ping  的 请求 (icmp 的 echo request)
2.返回一个 ping  的 回应 (icmp 的 echo reply )
注意：
通常情况下，设备发送的 ping 报文，必须在2s内返回一个“回应”报文，
如果无法在规定的时间返回，就会报错：请求时间超时。

2、tracert 路由跟踪:路由跟踪实用程序，用于确定IP数据报访问目标所采取的路径
@-a source-ip-address指定tracert报文的源地址。

@-f first-ttl指定初始TTL。缺省值是1。

@-m max-ttl指定最大TTL。缺省值是30。

@-name使能显示每一跳的主机名。

@-pport指定目的主机的UDP端口号。