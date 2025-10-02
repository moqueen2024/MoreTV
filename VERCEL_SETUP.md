# 🚀 Vercel 部署快速指南

## 📋 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/moqueen2024/MoreTV)

## 🔧 手动部署步骤

### 1. 准备工作

1. **Fork 项目到你的 GitHub 账户**
2. **注册 Vercel 账户**: 访问 [vercel.com](https://vercel.com)
3. **连接 GitHub**: 在 Vercel 中连接你的 GitHub 账户

### 2. 导入项目

1. 在 Vercel Dashboard 点击 "New Project"
2. 选择你 Fork 的 MoreTV 项目
3. 点击 "Import"

### 3. 配置环境变量

在部署配置页面添加以下环境变量：

#### 🔑 必填变量

```env
PASSWORD=your_secure_password_here
NEXTAUTH_SECRET=your_random_secret_string_here
NEXTAUTH_URL=https://your-domain.vercel.app
```

#### 📊 存储配置 (选择一种)

**选项 1: 本地存储 (推荐新手)**
```env
NEXT_PUBLIC_STORAGE_TYPE=localstorage
```

**选项 2: Upstash Redis (推荐生产)**
```env
NEXT_PUBLIC_STORAGE_TYPE=upstash
UPSTASH_URL=https://your-redis-instance.upstash.io
UPSTASH_TOKEN=your_upstash_token
```

#### ⚙️ 可选配置

```env
SITE_NAME=MoreTV
NEXT_PUBLIC_ENABLE_REGISTER=false
NEXT_PUBLIC_SEARCH_MAX_PAGE=5
CACHE_TIME=7200
```

### 4. 部署

1. 点击 "Deploy" 开始部署
2. 等待构建完成（约 2-3 分钟）
3. 获取部署 URL

## 🔐 访问权限设置

### 基础密码保护

项目内置密码保护，用户需要输入 `PASSWORD` 环境变量中设置的密码才能访问。

### 高级权限控制

#### 1. 禁用用户注册
```env
NEXT_PUBLIC_ENABLE_REGISTER=false
```

#### 2. 设置管理员
```env
USERNAME=admin
```

#### 3. 会话管理
```env
SESSION_TIMEOUT=3600000  # 1小时
MAX_LOGIN_ATTEMPTS=3
```

## 🗄️ 数据库配置

### Upstash Redis (推荐)

1. **注册 Upstash**: 访问 [upstash.com](https://upstash.com)
2. **创建 Redis 数据库**
3. **获取连接信息**:
   - UPSTASH_URL: Redis 端点 URL
   - UPSTASH_TOKEN: 访问令牌
4. **在 Vercel 中添加环境变量**

### 本地存储模式

适合个人使用，数据存储在浏览器本地：
```env
NEXT_PUBLIC_STORAGE_TYPE=localstorage
```

## 🔄 自动部署

配置完成后，每次推送代码到 GitHub 主分支，Vercel 会自动重新部署。

## 📱 PWA 支持

项目支持 PWA，用户可以：
1. 在手机浏览器中访问网站
2. 选择"添加到主屏幕"
3. 像原生应用一样使用

## 🛠️ 环境变量详解

| 变量名 | 必填 | 说明 | 示例值 |
|--------|------|------|--------|
| `PASSWORD` | ✅ | 站点访问密码 | `my_secure_password` |
| `NEXTAUTH_SECRET` | ✅ | 认证密钥 | `random_string_32_chars` |
| `NEXTAUTH_URL` | ✅ | 站点 URL | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_STORAGE_TYPE` | ❌ | 存储类型 | `localstorage` 或 `upstash` |
| `UPSTASH_URL` | ❌ | Redis URL | `https://xxx.upstash.io` |
| `UPSTASH_TOKEN` | ❌ | Redis Token | `your_token` |
| `SITE_NAME` | ❌ | 站点名称 | `MoreTV` |
| `NEXT_PUBLIC_ENABLE_REGISTER` | ❌ | 开放注册 | `false` |

## 🚨 安全建议

1. **使用强密码**: 设置复杂的 PASSWORD
2. **定期更新**: 保持项目为最新版本
3. **监控访问**: 查看 Vercel Analytics
4. **备份数据**: 定期导出重要数据
5. **限制注册**: 建议设置 `NEXT_PUBLIC_ENABLE_REGISTER=false`

## 🔧 故障排除

### 构建失败
- 检查环境变量是否正确设置
- 查看 Vercel 构建日志
- 确认 Node.js 版本兼容性

### 访问问题
- 确认 PASSWORD 环境变量已设置
- 检查 NEXTAUTH_URL 是否正确
- 验证域名配置

### 数据库连接
- 确认 Upstash 配置正确
- 检查网络连接
- 验证访问令牌有效性

## 📞 获取帮助

- **Vercel 文档**: [vercel.com/docs](https://vercel.com/docs)
- **项目 Issues**: [GitHub Issues](https://github.com/moqueen2024/MoreTV/issues)
- **Vercel 支持**: [vercel.com/support](https://vercel.com/support)

---

**🎉 部署完成后，你就可以通过 Vercel 提供的 URL 访问你的 MoreTV 应用了！**