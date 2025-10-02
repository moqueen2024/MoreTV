#!/usr/bin/env node

/**
 * Zeabur 部署脚本
 * 自动化部署到 Zeabur 平台
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始 Zeabur 部署准备...\n');

// 检查必要文件
const requiredFiles = [
  'package.json',
  'next.config.js',
  'zeabur.json'
];

console.log('📋 检查必要文件...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} 存在`);
  } else {
    console.log(`❌ ${file} 不存在`);
    process.exit(1);
  }
});

// 检查环境变量配置
console.log('\n🔧 检查环境变量配置...');
const envExample = `
# Zeabur 环境变量配置示例
PASSWORD=your-secure-password
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.zeabur.app
STORAGE_TYPE=localstorage
USERNAME=admin
`;

if (!fs.existsSync('.env.example')) {
  fs.writeFileSync('.env.example', envExample.trim());
  console.log('✅ 已创建 .env.example 文件');
}

// 构建项目
console.log('\n🔨 构建项目...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 项目构建成功');
} catch (error) {
  console.log('❌ 项目构建失败');
  process.exit(1);
}

// 提交代码
console.log('\n📤 提交代码到 GitHub...');
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: 添加 Zeabur 部署配置"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✅ 代码已推送到 GitHub');
} catch (error) {
  console.log('⚠️ 代码推送失败，请手动推送');
}

console.log('\n🎉 Zeabur 部署准备完成！');
console.log('\n📖 下一步操作：');
console.log('1. 访问 https://zeabur.com');
console.log('2. 使用 GitHub 登录');
console.log('3. 创建新项目并选择 moqueen2024/MoreTV 仓库');
console.log('4. 配置环境变量（参考 ZEABUR_SETUP.md）');
console.log('5. 部署应用');
console.log('\n📚 详细说明请查看 ZEABUR_SETUP.md 文件');