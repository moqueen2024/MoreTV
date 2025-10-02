# Zeabur 部署指南

## 🚀 Zeabur 简介

Zeabur 是专为亚洲用户优化的云平台，提供快速、稳定的部署体验。

### 优势
- 🇨🇳 针对中国大陆网络优化
- ⚡ 部署速度快，访问延迟低
- 💰 每月 $5 免费额度
- 🔧 支持 Next.js 一键部署
- 📊 实时监控和日志

## 📋 部署步骤

### 1. 注册 Zeabur 账号

1. 访问 [Zeabur 官网](https://zeabur.com)
2. 使用 GitHub 账号登录
3. 验证邮箱（可选）

### 2. 连接 GitHub 仓库

1. 在 Zeabur 控制台点击 "New Project"
2. 选择 "Deploy from GitHub"
3. 授权 Zeabur 访问你的 GitHub
4. 选择 `moqueen2024/MoreTV` 仓库

### 3. 配置部署设置

#### 基础配置
- **Framework**: Next.js (自动检测)
- **Build Command**: `npm run build`
- **Install Command**: `npm install --legacy-peer-deps`
- **Node Version**: 18.x

#### 环境变量配置
在 Zeabur 项目设置中添加以下环境变量：

```env
# 必需的环境变量
PASSWORD=X*wnHkn3$fU@
NEXTAUTH_SECRET=758f197459a11eaa99f631d654ed89f94ec2aca381e563ce1947ce9aaf288936
NEXTAUTH_URL=https://your-app-name.zeabur.app

# 可选的环境变量
STORAGE_TYPE=localstorage
USERNAME=admin
KVROCKS_URL=redis://localhost:6666
KVROCKS_PASSWORD=
KVROCKS_DATABASE=0
```

### 4. 自定义域名（可选）

1. 在项目设置中点击 "Domains"
2. 添加自定义域名
3. 配置 DNS 记录指向 Zeabur

## 🔧 Zeabur 配置文件

项目已包含 `zeabur.json` 配置文件，支持：
- 自动构建优化
- 环境变量管理
- 域名配置

## 📊 监控和管理

### 查看部署状态
- 实时构建日志
- 应用运行状态
- 资源使用情况

### 管理应用
- 重启应用
- 查看日志
- 环境变量管理
- 域名配置

## 💡 优化建议

### 性能优化
1. **启用 CDN**: Zeabur 自动提供 CDN 加速
2. **压缩资源**: 已在 Next.js 中配置
3. **缓存策略**: 利用 Zeabur 的边缘缓存

### 成本控制
1. **监控用量**: 定期检查资源使用情况
2. **优化构建**: 减少不必要的依赖
3. **合理配置**: 根据实际需求调整资源

## 🆘 常见问题

### Q: 部署失败怎么办？
A: 检查构建日志，通常是依赖安装问题，确保使用 `--legacy-peer-deps`

### Q: 环境变量不生效？
A: 确保变量名正确，重新部署应用

### Q: 访问速度慢？
A: Zeabur 在亚洲有多个节点，通常访问速度很快

### Q: 免费额度用完了？
A: 可以升级到付费计划，或者优化应用减少资源使用

## 🔗 有用链接

- [Zeabur 官网](https://zeabur.com)
- [Zeabur 文档](https://zeabur.com/docs)
- [Zeabur Discord](https://discord.gg/zeabur)
- [GitHub 仓库](https://github.com/moqueen2024/MoreTV)

## 📞 技术支持

如果遇到问题，可以：
1. 查看 Zeabur 官方文档
2. 在 Discord 社区求助
3. 提交 GitHub Issue

---

**注意**: 部署完成后，记得更新 `NEXTAUTH_URL` 环境变量为你的实际域名。