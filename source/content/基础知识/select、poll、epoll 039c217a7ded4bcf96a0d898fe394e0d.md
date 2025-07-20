# select、poll、epoll

Owner: yancy yu

select、poll和epoll及区别

都是io复用模型

1、表面上看epoll的性能最好，但是在连接数少并且连接都十分活跃的情况下，select和poll的性能可能比epoll好，毕竟epoll的通知机制需要很多函数回调。

select，poll实现需要自己不断轮询所有fd集合，直到设备就绪，期间可能要睡眠和唤醒多次交替。但是select和poll在“醒着”的时候要遍历整个fd集合，而epoll在“醒着”的时候只要判断一下就绪链表是否为空就行了，这节省了大量的CPU时间。这就是回调机制带来的性能提升。

2、select低效是因为每次它都需要轮询。

select，poll每次调用都要把fd集合从用户态往内核态拷贝一次，而epoll只要一次拷贝。

3.epoll是事件驱动的，主动轮询改为被动通知（时间复杂度从on降到o1），当有事件发生时，被动接收通知。所以epoll模型注册socket后，主程序可做其他事情，当事件发生时，接收到通知后再去处理。