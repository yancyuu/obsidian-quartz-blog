---
tags:
  - basic-knowledge
  - devops
  - docker
  - learning-note
---


**一句话总结：** 要成功加入 Worker 节点，必须在 Manager 节点获取 Join Token 并在 Worker 节点执行加入命令，**关键步骤是加入后必须重启 Docker 服务**以确保新证书生效，最后验证节点状态。

## 一、准备工作

### 1. 环境要求确认

- **操作系统**：64位 Linux 系统，内核版本 3.10 或更高
- **Docker 版本**：所有节点需安装 **Docker Engine 17.06 或更高版本**，**强烈建议使用相同版本**（推荐 20.10+）
- **网络要求**：
    - 开放必要端口：**TCP 2377**（集群管理）、**TCP/UDP 7946**（节点通信）、**UDP 4789**（Overlay 网络）
    - 节点间网络延迟应低于 **5ms**，确保稳定通信
    - **防火墙配置**：确保所有节点间上述端口互通，可临时关闭防火墙测试：
        
        bash
        
        ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
        
        复制
        
        `systemctl stop firewalld  # CentOS ufw disable               # Ubuntu ```<websource>source_group_web_1</websource>`
        

### 2. 证书配置（关键步骤）

- 在 Manager 节点执行以下命令确保证书系统正常：
    
    bash
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `# 重新生成CA证书 docker swarm ca --rotate  # 设置证书有效期为99年（推荐） docker swarm update --cert-expiry 867240h0m0s`
    
- **验证证书生成**：
    
    bash
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `# 导出CA证书并检查 docker swarm ca > swarm-ca.crt openssl x509 -in swarm-ca.crt -text -noout | grep "Not Before\|Not After"`
    
- **重要提示**：证书配置缺失会导致节点间 TLS 通信失败，表现为 `incomplete log stream` 错误5

## 二、Worker 节点加入步骤

### 1. 获取 Join Token（在 Manager 节点执行）

bash

![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色

复制

`# 获取Worker节点的Join Token docker swarm join-token worker`

- **输出示例**：
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `To add a worker to this swarm, run the following command: docker swarm join --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c 192.168.99.100:2377`
    

### 2. 加入 Worker 节点（在 Worker 节点执行）

bash

![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色

复制

`# 执行从Manager节点获取的Join命令 docker swarm join --token <TOKEN> <MANAGER_IP>:2377`

- **成功加入的标志**：
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `This node joined a swarm as a worker.`
    
- **常见错误处理**：
    - **超时错误**：检查防火墙设置，确保 2377 端口开放
    - **节点已存在错误**：先执行 `docker swarm leave` 再重新加入4

### 3. 配置节点属性（可选）

- **添加节点标签**（在 Manager 节点执行）：
    
    bash
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `# 为节点添加类型标签 docker node update --label-add type=worker <NODE_NAME>  # 为节点添加磁盘类型标签 docker node update --label-add disk=ssd <NODE_NAME>`
    
- **资源限制配置**（可选）：
    
    bash
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `# 停止调度新任务到该节点 docker node update --availability drain <NODE_NAME>  # 恢复调度 docker node update --availability active <NODE_NAME>`
    

### 4. 重启 Docker 服务（关键步骤）

bash

![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色

复制

`# 在Worker节点上执行 systemctl restart docker`

- **为什么需要重启**：Docker 守护进程在启动时加载证书，运行时不会自动重新加载新证书，重启是确保新证书生效的必要步骤
- **多节点集群建议**：避免同时重启所有 Worker 节点，应**逐个重启**以保持集群可用性
- **重启后验证**：
    
    bash
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `# 检查Docker服务状态 systemctl status docker  # 确认节点已重新加入 docker info | grep "Swarm" ```<websource>source_group_web_4</websource>`
    

## 三、验证与故障排除

### 1. 验证节点状态（在 Manager 节点执行）

bash

![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色

复制

`# 查看所有节点状态 docker node ls`

- **正常状态**：Worker 节点应显示为 `Ready` 状态，`MANAGER STATUS` 列为空
- **关键检查**：确认节点 ID 旁无 `*` 号（表示该节点不是当前连接的节点）12

### 2. 验证证书配置

bash

![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色

复制

`# 检查CA配置 docker system info | grep "CA Configuration"  # 验证节点TLS状态 docker node inspect <NODE_ID> --format '{{.Description.TLSInfo}}'`

- **正常输出**：应显示 `"TrustRoot": true` 和有效的证书信息5

### 3. 验证服务通信

bash

![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色

复制

`# 尝试获取服务日志 docker service logs <SERVICE_NAME>`

- **成功标志**：不再出现 `incomplete log stream` 错误
- **网络连通性测试**：
    
    bash
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `# 在Worker节点测试与Manager节点的连通性 ping <MANAGER_IP> telnet <MANAGER_IP> 2377 ```<websource>source_group_web_7</websource>`
    

### 4. 常见问题及解决

- **节点无法加入集群**：
    - 检查防火墙设置，确保必要端口已开放
    - 验证 Join Token 是否正确（可通过 `docker swarm join-token worker` 重新获取）
    - 确认 Manager 节点 IP 地址是否正确（使用 `--advertise-addr` 指定的 IP）
- **节点显示为 Down**：
    - 检查节点网络连接
    - 验证 Docker 服务是否正常运行
    - 检查节点与 Manager 节点之间的连通性14
- **证书问题持续存在**：
    
    bash
    
    ![](https://cdn.sm.cn/static/25/04/08/6dde6cccfb252115393d782994df6a63.svg)亮色
    
    复制
    
    `# 清理所有节点的证书并重启 rm -rf /var/lib/docker/swarm/certificates/* systemctl restart docker  # 重新加入集群 docker swarm join --token <TOKEN> <MANAGER_IP>:2377`
    

## 四、最佳实践与建议

### 1. 证书管理

- **设置长期有效期**：`docker swarm update --cert-expiry 867240h0m0s`（99年）
- **定期轮换**：每月执行 `docker swarm ca --rotate` 更新证书
- **备份机制**：定期备份 `/var/lib/docker/swarm/certificates/` 目录

### 2. 节点配置

- **标签管理**：为不同类型节点添加标签，便于服务调度和资源管理
- **资源限制**：根据业务需求合理设置节点资源限制
- **节点角色**：生产环境中建议将 Manager 节点设置为 "manager-only" 模式

### 3. 集群维护

- **滚动重启**：避免同时重启所有节点，应采用滚动重启策略
- **监控节点状态**：定期执行 `docker node ls` 监控节点状态
- **服务副本**：为关键服务设置至少 3 个副本，确保高可用性12

### 4. 安全建议

- **TLS 加密**：确保所有节点间通信使用 TLS 加密
- **访问控制**：限制集群访问权限，只允许特定 IP 地址或网络段访问
- **定期更新**：及时更新 Docker 版本，获取最新的安全修复12

### 5. 生产环境部署建议

- **节点数量**：生产环境建议至少 **3 个 Manager 节点** 实现高可用
- **节点分布**：Manager 节点应分散在不同物理机上，避免单点故障
- **数据备份**：定期备份 Swarm 集群的 Raft 数据（位于 `/var/lib/docker/swarm`）212

**重要提醒**：在生产环境中，建议在非高峰时段执行节点加入操作，并确保有完整的回滚计划。加入新节点后，应持续监控集群状态至少 24 小时，确保所有服务正常运行。**特别注意**，证书更新后必须重启 Docker 服务，否则会导致节点间通信失败，影响集群稳定性。