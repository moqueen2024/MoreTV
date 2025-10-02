#!/bin/bash

# Vercel 部署脚本
# 使用方法: ./scripts/deploy-vercel.sh [环境]
# 环境选项: dev, preview, prod

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查参数
ENVIRONMENT=${1:-preview}

log_info "开始部署到 Vercel (环境: $ENVIRONMENT)"

# 检查 Vercel CLI 是否安装
if ! command -v vercel &> /dev/null; then
    log_error "Vercel CLI 未安装，请先安装："
    echo "npm install -g vercel"
    exit 1
fi

# 检查是否已登录
if ! vercel whoami &> /dev/null; then
    log_warning "未登录 Vercel，请先登录："
    vercel login
fi

# 检查环境变量文件
if [ ! -f ".env.local" ] && [ ! -f ".env.example" ]; then
    log_warning "未找到环境变量文件，请确保已配置必要的环境变量"
fi

# 构建前检查
log_info "执行构建前检查..."

# 检查 Node.js 版本
NODE_VERSION=$(node --version)
log_info "Node.js 版本: $NODE_VERSION"

# 安装依赖
if [ ! -d "node_modules" ]; then
    log_info "安装依赖..."
    npm install --legacy-peer-deps
fi

# 运行 lint 检查
log_info "运行代码检查..."
if npm run lint; then
    log_success "代码检查通过"
else
    log_warning "代码检查有警告，继续部署..."
fi

# 运行类型检查
log_info "运行类型检查..."
if npm run type-check 2>/dev/null || npx tsc --noEmit; then
    log_success "类型检查通过"
else
    log_warning "类型检查有警告，继续部署..."
fi

# 生成运行时配置
log_info "生成运行时配置..."
if [ -f "scripts/convert-config.js" ]; then
    node scripts/convert-config.js
    log_success "运行时配置已生成"
fi

# 生成 manifest
log_info "生成 PWA manifest..."
if [ -f "scripts/generate-manifest.js" ]; then
    node scripts/generate-manifest.js
    log_success "PWA manifest 已生成"
fi

# 根据环境执行不同的部署命令
case $ENVIRONMENT in
    "dev")
        log_info "启动开发服务器..."
        vercel dev
        ;;
    "preview")
        log_info "部署到预览环境..."
        vercel
        ;;
    "prod")
        log_info "部署到生产环境..."
        
        # 确认生产部署
        read -p "确认部署到生产环境？(y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            vercel --prod
            log_success "生产环境部署完成！"
        else
            log_info "取消生产环境部署"
            exit 0
        fi
        ;;
    *)
        log_error "无效的环境参数: $ENVIRONMENT"
        echo "支持的环境: dev, preview, prod"
        exit 1
        ;;
esac

# 部署后检查
if [ "$ENVIRONMENT" != "dev" ]; then
    log_info "获取部署信息..."
    
    # 获取部署 URL
    DEPLOYMENT_URL=$(vercel ls --scope=$(vercel whoami) | grep "$(basename $(pwd))" | head -1 | awk '{print $2}')
    
    if [ ! -z "$DEPLOYMENT_URL" ]; then
        log_success "部署完成！"
        echo "部署 URL: https://$DEPLOYMENT_URL"
        
        # 可选：打开浏览器
        read -p "是否在浏览器中打开部署的网站？(y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if command -v open &> /dev/null; then
                open "https://$DEPLOYMENT_URL"
            elif command -v xdg-open &> /dev/null; then
                xdg-open "https://$DEPLOYMENT_URL"
            elif command -v start &> /dev/null; then
                start "https://$DEPLOYMENT_URL"
            else
                log_info "请手动访问: https://$DEPLOYMENT_URL"
            fi
        fi
    fi
fi

log_success "部署脚本执行完成！"