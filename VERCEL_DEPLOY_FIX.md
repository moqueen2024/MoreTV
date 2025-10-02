# 🔧 Vercel 部署错误修复指南

## ❌ 遇到的错误

```
错误：函数运行时必须具有有效版本，例如"now-php"
```

## 🔍 问题分析

这个错误通常由以下原因引起：

1. **函数运行时配置错误**: `vercel.json` 中的 `functions` 配置不正确
2. **路径匹配问题**: API 路由路径配置与实际文件结构不匹配
3. **Edge Runtime 配置**: Next.js 13+ App Router 的 Edge Runtime 配置方式

## ✅ 解决方案

### 1. 修复 vercel.json 配置

我已经更新了 `vercel.json` 配置，移除了可能导致问题的 `functions` 和 `crons` 配置：

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### 2. API 路由 Edge Runtime 配置

对于 Next.js 13+ App Router，Edge Runtime 应该在路由文件中配置：

```typescript
// src/app/api/search/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  // API 逻辑
}
```

### 3. 免费计划限制

移除了以下付费计划专用功能：
- ❌ `regions` - 多区域部署
- ❌ `crons` - 定时任务
- ❌ 复杂的 `functions` 配置

## 🚀 重新部署步骤

### 方法 1: 自动重新部署
推送修复后的代码，Vercel 会自动重新部署：

```bash
git add .
git commit -m "fix: 修复 Vercel 部署配置错误"
git push origin main
```

### 方法 2: 手动重新部署
1. 访问 Vercel Dashboard
2. 选择你的项目
3. 点击 "Redeploy" 按钮

### 方法 3: 重新导入项目
如果问题持续存在：
1. 在 Vercel Dashboard 中删除当前项目
2. 重新导入 GitHub 仓库
3. 使用之前的环境变量配置

## 🔧 环境变量检查

确保以下环境变量已正确设置：

```env
PASSWORD=X*wnHkn3$fU@
NEXTAUTH_SECRET=758f197459a11eaa99f631d654ed89f94ec2aca381e563ce1947ce9aaf288936
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_STORAGE_TYPE=localstorage
SITE_NAME=MoreTV
NEXT_PUBLIC_ENABLE_REGISTER=false
```

## 📋 构建成功检查清单

部署成功后应该看到：

- ✅ 构建完成无错误
- ✅ 函数部署成功
- ✅ 静态文件上传完成
- ✅ 域名分配成功
- ✅ 网站可以正常访问

## 🚨 常见问题解决

### 问题 1: 依赖安装失败
**解决方案**: 使用 `--legacy-peer-deps` 标志
```json
{
  "installCommand": "npm install --legacy-peer-deps"
}
```

### 问题 2: 构建超时
**解决方案**: 优化构建过程
- 移除不必要的依赖
- 使用 `.vercelignore` 排除文件
- 检查构建脚本

### 问题 3: API 路由不工作
**解决方案**: 检查路由配置
- 确认文件路径正确
- 验证 export 语法
- 检查 Edge Runtime 配置

## 📞 获取帮助

如果问题仍然存在：

1. **查看构建日志**: Vercel Dashboard → Deployments → 点击失败的部署
2. **检查函数日志**: Functions 标签页查看运行时错误
3. **社区支持**: [Vercel Discord](https://vercel.com/discord)
4. **官方文档**: [Vercel Docs](https://vercel.com/docs)

---

**🎯 修复完成后，你的 MoreTV 应用应该可以在 Vercel 上正常部署和运行了！**