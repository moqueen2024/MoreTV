# 🔧 Vercel 环境变量配置

## 📋 复制以下环境变量到 Vercel Dashboard

在 Vercel 项目设置 → Environment Variables 中添加以下变量：

### 🔑 必填变量

| 变量名 | 值 | 说明 |
|--------|----|----|
| `PASSWORD` | `MoreTV2024!@#` | 站点访问密码（请修改为你的密码） |
| `NEXTAUTH_SECRET` | `0f43e60d6d7f9dadc4e4ac8b22e1b0fa2552e7f052d4fa5bda8796f928707ee7` | 认证密钥（已生成，请保持不变） |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | 你的 Vercel 域名（部署后替换） |

### 📊 存储配置（选择一种）

**选项 1: 本地存储（推荐新手）**
| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_STORAGE_TYPE` | `localstorage` |

**选项 2: Upstash Redis（推荐生产）**
| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_STORAGE_TYPE` | `upstash` |
| `UPSTASH_URL` | `https://your-redis.upstash.io` |
| `UPSTASH_TOKEN` | `your_upstash_token` |

### ⚙️ 可选配置

| 变量名 | 值 | 说明 |
|--------|----|----|
| `SITE_NAME` | `MoreTV` | 站点名称 |
| `NEXT_PUBLIC_ENABLE_REGISTER` | `false` | 禁用用户注册 |
| `NEXT_PUBLIC_SEARCH_MAX_PAGE` | `5` | 搜索最大页数 |
| `CACHE_TIME` | `7200` | 缓存时间（秒） |
| `USERNAME` | `admin` | 管理员用户名 |

### 🔒 安全配置（可选）

| 变量名 | 值 | 说明 |
|--------|----|----|
| `SESSION_TIMEOUT` | `3600000` | 会话超时（1小时） |
| `MAX_LOGIN_ATTEMPTS` | `3` | 最大登录尝试 |
| `LOGIN_LOCKOUT_TIME` | `900000` | 锁定时间（15分钟） |

## 🚀 部署步骤

1. **访问 Vercel Dashboard**: https://vercel.com/dashboard
2. **导入项目**: 选择你的 GitHub 仓库
3. **添加环境变量**: 复制上述变量到 Environment Variables
4. **修改域名**: 将 `NEXTAUTH_URL` 改为你的实际域名
5. **点击部署**: 等待构建完成

## 🔐 重要安全提醒

1. **修改密码**: 请将 `PASSWORD` 改为你的强密码
2. **保护密钥**: 不要泄露 `NEXTAUTH_SECRET`
3. **更新域名**: 部署后立即更新 `NEXTAUTH_URL`
4. **禁用注册**: 建议保持 `NEXT_PUBLIC_ENABLE_REGISTER=false`

## 📱 Upstash Redis 配置（可选）

如果选择 Upstash Redis 存储：

1. **注册账户**: 访问 https://upstash.com
2. **创建数据库**: 选择免费套餐
3. **获取连接信息**:
   - 复制 REST URL 到 `UPSTASH_URL`
   - 复制 REST Token 到 `UPSTASH_TOKEN`
4. **更新存储类型**: 设置 `NEXT_PUBLIC_STORAGE_TYPE=upstash`

## ✅ 部署完成检查

部署完成后请检查：

- [ ] 网站可以正常访问
- [ ] 密码登录功能正常
- [ ] 搜索功能可用
- [ ] PWA 安装正常
- [ ] 移动端适配良好

---

**🎉 配置完成后，你的 MoreTV 应用就可以在 Vercel 上正常运行了！**