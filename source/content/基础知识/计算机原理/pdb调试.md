
> pdb是基于命令⾏的调试⼯具，⾮常类似gnu的gdb（调试c/c++）。
> 

| **命令** | **简写命令** | **作⽤** |
| --- | --- | --- |
| break | b | 设置断点 |
| continue | c | 继续执⾏程序 |
| list | l | 查看当前⾏的代码段 |
| step | s | 进⼊函数 |
| return | r | 执⾏代码直到从当前函数返回 |
| quit | q | 中⽌并退出 |
| next | n | 执⾏下⼀⾏ |
| print | p | 打印变量的值 |
| help | h | 帮助 |
| args | a | 查看传⼊参数 |
|  | 回⻋ | 重复上⼀条命令 |
| break | b | 显示所有断点 |
| break lineno | b lineno | 在指定⾏设置断点 |
| break file:lineno | b file:lineno | 在指定⽂件的⾏设置断点 |
| clear num |  | 删除指定断点 |
| bt |  | 查看函数调⽤栈帧 |

> 执⾏时调试，-m pdb
> 
> 
> 程序启动，停⽌在第⼀⾏等待单步调试。
> 

### 交互调试

> 进⼊python或ipython解释器，代码种导入pdb
> 
> 
> 程序⾥埋点👇：
> 
> 当程序执⾏到pdb.set_trace() 位置时停下来调试
>