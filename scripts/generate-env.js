#!/usr/bin/env node

/**
 * 环境变量生成脚本
 * 用于生成安全的环境变量配置
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 生成随机密钥
function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// 生成随机密码
function generatePassword(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// 环境变量模板
function generateEnvConfig(domain = 'localhost:3000') {
  const secret = generateSecret();
  const password = generatePassword();
  
  return `# MoreTV 环境变量配置
# 生成时间: ${new Date().toISOString()}

# ===========================================
# 🔑 必填配置
# ===========================================

# 站点访问密码
PASSWORD=${password}

# NextAuth 认证密钥
NEXTAUTH_SECRET=${secret}

# 站点 URL
NEXTAUTH_URL=https://${domain}

# ===========================================
# 📊 存储配置
# ===========================================

# 存储类型：localstorage 或 upstash
NEXT_PUBLIC_STORAGE_TYPE=localstorage

# Upstash Redis 配置（如果使用）
# UPSTASH_URL=https://your-redis.upstash.io
# UPSTASH_TOKEN=your_upstash_token

# ===========================================
# ⚙️ 可选配置
# ===========================================

SITE_NAME=MoreTV
NEXT_PUBLIC_ENABLE_REGISTER=false
NEXT_PUBLIC_SEARCH_MAX_PAGE=5
CACHE_TIME=7200
USERNAME=admin

# ===========================================
# 🔒 安全配置
# ===========================================

SESSION_TIMEOUT=3600000
MAX_LOGIN_ATTEMPTS=3
LOGIN_LOCKOUT_TIME=900000
`;
}

// Vercel 环境变量格式
function generateVercelEnv(domain = 'your-app.vercel.app') {
  const secret = generateSecret();
  const password = generatePassword();
  
  return `# Vercel 环境变量配置
# 请复制以下内容到 Vercel Dashboard → Settings → Environment Variables

PASSWORD=${password}
NEXTAUTH_SECRET=${secret}
NEXTAUTH_URL=https://${domain}
NEXT_PUBLIC_STORAGE_TYPE=localstorage
SITE_NAME=MoreTV
NEXT_PUBLIC_ENABLE_REGISTER=false
NEXT_PUBLIC_SEARCH_MAX_PAGE=5
CACHE_TIME=7200
USERNAME=admin
SESSION_TIMEOUT=3600000
MAX_LOGIN_ATTEMPTS=3
LOGIN_LOCKOUT_TIME=900000
`;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const domain = args[1];

  switch (command) {
    case 'local': {
      const localEnv = generateEnvConfig(domain);
      fs.writeFileSync('.env.local', localEnv);
      console.log('✅ .env.local 文件已生成');
      console.log('🔑 生成的密码:', localEnv.match(/PASSWORD=(.+)/)[1]);
      break;
    }
      
    case 'vercel': {
      const vercelEnv = generateVercelEnv(domain);
      fs.writeFileSync('.env.vercel', vercelEnv);
      console.log('✅ .env.vercel 文件已生成');
      console.log('📋 请复制文件内容到 Vercel Dashboard');
      break;
    }
      
    case 'both': {
      const localConfig = generateEnvConfig(domain);
      const vercelConfig = generateVercelEnv(domain);
      fs.writeFileSync('.env.local', localConfig);
      fs.writeFileSync('.env.vercel', vercelConfig);
      console.log('✅ 环境变量文件已生成');
      console.log('🔑 生成的密码:', localConfig.match(/PASSWORD=(.+)/)[1]);
      break;
    }
      
    default:
      console.log(`
🔧 环境变量生成工具

用法:
  node scripts/generate-env.js local [domain]     # 生成本地环境变量
  node scripts/generate-env.js vercel [domain]    # 生成 Vercel 环境变量
  node scripts/generate-env.js both [domain]      # 生成两种环境变量

示例:
  node scripts/generate-env.js local
  node scripts/generate-env.js vercel my-app.vercel.app
  node scripts/generate-env.js both my-domain.com
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  generateSecret,
  generatePassword,
  generateEnvConfig,
  generateVercelEnv
};