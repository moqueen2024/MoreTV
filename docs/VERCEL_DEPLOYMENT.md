# Vercel 部署指南

## 📋 部署步骤

### 1. 准备工作

#### 1.1 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 1.2 登录 Vercel
```bash
vercel login
```

### 2. 配置环境变量

#### 2.1 创建 .env.local 文件
```bash
cp .env.example .env.local
```

#### 2.2 编辑环境变量
```env
# 必填配置
PASSWORD=your_secure_password_here
SITE_NAME=MoreTV
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-domain.vercel.app

# 存储配置 (推荐使用 Upstash Redis)
NEXT_PUBLIC_STORAGE_TYPE=upstash
UPSTASH_URL=https://your-instance.upstash.io
UPSTASH_TOKEN=your_upstash_token

# 可选配置
NEXT_PUBLIC_ENABLE_REGISTER=false
NEXT_PUBLIC_SEARCH_MAX_PAGE=5
CACHE_TIME=7200
```

### 3. 部署到 Vercel

#### 3.1 初始化项目
```bash
vercel
```

按照提示选择：
- Set up and deploy? → Yes
- Which scope? → 选择你的账户
- Link to existing project? → No
- What's your project's name? → moretv (或其他名称)
- In which directory is your code located? → ./

#### 3.2 配置环境变量
在 Vercel Dashboard 中设置环境变量：

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 Settings → Environment Variables
4. 添加以下环境变量：

**必填变量：**
```
PASSWORD = your_secure_password_here
NEXTAUTH_SECRET = your_nextauth_secret_here
NEXTAUTH_URL = https://your-domain.vercel.app
```

**存储配置（选择一种）：**

**选项 1: Upstash Redis (推荐)**
```
NEXT_PUBLIC_STORAGE_TYPE = upstash
UPSTASH_URL = https://your-instance.upstash.io
UPSTASH_TOKEN = your_upstash_token
```

**选项 2: 本地存储 (单用户)**
```
NEXT_PUBLIC_STORAGE_TYPE = localstorage
```

#### 3.3 重新部署
```bash
vercel --prod
```

## 🔐 访问权限设置

### 1. 基础密码保护

项目内置了密码保护功能，通过 `PASSWORD` 环境变量设置：

```env
PASSWORD=your_secure_password_here
```

用户访问时需要输入正确密码才能使用。

### 2. 用户管理系统

#### 2.1 启用用户注册
```env
NEXT_PUBLIC_ENABLE_REGISTER=true
USERNAME=admin  # 默认管理员用户名
```

#### 2.2 禁用用户注册 (推荐)
```env
NEXT_PUBLIC_ENABLE_REGISTER=false
```

### 3. Vercel 团队访问控制

#### 3.1 设置团队权限
1. 在 Vercel Dashboard 中选择项目
2. 进入 Settings → General
3. 在 "Team" 部分添加团队成员
4. 设置不同的权限级别：
   - **Owner**: 完全控制权限
   - **Member**: 部署和查看权限
   - **Viewer**: 仅查看权限

#### 3.2 域名访问控制
1. 进入 Settings → Domains
2. 添加自定义域名
3. 配置 DNS 记录
4. 可以通过防火墙或 CDN 设置 IP 白名单

### 4. 高级安全配置

#### 4.1 设置访问日志
```env
ENABLE_MONITORING=true
ENABLE_ERROR_TRACKING=true
```

#### 4.2 配置会话管理
```env
SESSION_TIMEOUT=3600000  # 1小时
MAX_LOGIN_ATTEMPTS=3
LOGIN_LOCKOUT_TIME=900000  # 15分钟
```

#### 4.3 启用 HTTPS 重定向
在 `vercel.json` 中已配置自动 HTTPS 重定向。

## 🗄️ 数据库配置

### 1. Upstash Redis (推荐)

#### 1.1 创建 Upstash 账户
1. 访问 [Upstash](https://upstash.com/)
2. 注册并创建 Redis 数据库
3. 获取连接信息

#### 1.2 配置环境变量
```env
NEXT_PUBLIC_STORAGE_TYPE=upstash
UPSTASH_URL=https://your-instance.upstash.io
UPSTASH_TOKEN=your_upstash_token
```

### 2. 本地存储模式

适用于个人使用，数据存储在浏览器本地：

```env
NEXT_PUBLIC_STORAGE_TYPE=localstorage
```

## 🚀 部署命令

### 开发环境
```bash
vercel dev
```

### 预览部署
```bash
vercel
```

### 生产部署
```bash
vercel --prod
```

### 查看部署状态
```bash
vercel ls
```

### 查看部署日志
```bash
vercel logs
```

## 🔧 故障排除

### 1. 构建失败
- 检查 Node.js 版本是否兼容
- 确认所有依赖都已安装
- 查看构建日志中的错误信息

### 2. 环境变量问题
- 确认所有必需的环境变量都已设置
- 检查变量名是否正确
- 重新部署以应用新的环境变量

### 3. 访问权限问题
- 确认 PASSWORD 环境变量已设置
- 检查用户管理配置
- 验证数据库连接

### 4. 性能优化
- 启用缓存：设置合适的 CACHE_TIME
- 限制并发：调整 MAX_CONCURRENT_REQUESTS
- 监控性能：启用 ENABLE_MONITORING

## 📱 移动端适配

项目已支持 PWA，用户可以将应用添加到手机桌面：

1. 在移动浏览器中访问网站
2. 选择"添加到主屏幕"
3. 应用将以原生应用形式运行

## 🔄 更新部署

### 自动部署
每次推送到 main 分支时，Vercel 会自动部署。

### 手动部署
```bash
git push origin main
# 或者
vercel --prod
```

## 📊 监控和分析

### 1. Vercel Analytics
在项目设置中启用 Vercel Analytics 来监控访问数据。

### 2. 错误监控
```env
ENABLE_ERROR_TRACKING=true
```

### 3. 性能监控
```env
ENABLE_MONITORING=true
```

## 🛡️ 安全建议

1. **使用强密码**: 设置复杂的 PASSWORD 和 NEXTAUTH_SECRET
2. **定期更新**: 保持依赖包为最新版本
3. **监控访问**: 启用日志和监控功能
4. **备份数据**: 定期备份用户数据和配置
5. **限制访问**: 考虑使用 IP 白名单或 VPN

## 📞 技术支持

如果遇到问题，可以：

1. 查看 [Vercel 文档](https://vercel.com/docs)
2. 检查项目的 GitHub Issues
3. 查看 Vercel 部署日志
4. 联系项目维护者

---

**注意**: 请根据实际需求调整配置，确保在生产环境中使用安全的密码和配置。