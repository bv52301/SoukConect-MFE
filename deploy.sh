#!/bin/bash

# Deployment script for Soukconect MFE
# Run: ./deploy.sh production

set -e  # Exit on error

ENVIRONMENT=${1:-staging}
SERVER_USER="your-user"
SERVER_HOST="your-server-ip"
SERVER_PATH="/var/www/soukconect"

echo "🚀 Starting deployment to $ENVIRONMENT..."

# 1. Build locally
echo "📦 Building applications..."
pnpm install
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# 2. Deploy files
echo "📤 Uploading files to server..."

# Deploy Shell App
scp -r apps/shell/.next $SERVER_USER@$SERVER_HOST:$SERVER_PATH/shell/
scp -r apps/shell/public $SERVER_USER@$SERVER_HOST:$SERVER_PATH/shell/
scp apps/shell/package.json $SERVER_USER@$SERVER_HOST:$SERVER_PATH/shell/
scp apps/shell/next.config.ts $SERVER_USER@$SERVER_HOST:$SERVER_PATH/shell/

# Deploy Food-Connect App
scp -r apps/food-connect/.next $SERVER_USER@$SERVER_HOST:$SERVER_PATH/food-connect/
scp -r apps/food-connect/public $SERVER_USER@$SERVER_HOST:$SERVER_PATH/food-connect/
scp apps/food-connect/package.json $SERVER_USER@$SERVER_HOST:$SERVER_PATH/food-connect/
scp apps/food-connect/next.config.ts $SERVER_USER@$SERVER_HOST:$SERVER_PATH/food-connect/

echo "✅ Files uploaded!"

# 3. Install and restart on server
echo "🔧 Installing dependencies and restarting services..."

ssh $SERVER_USER@$SERVER_HOST << 'EOF'
    # Shell App
    cd /var/www/soukconect/shell
    pnpm install --prod
    pm2 restart shell 2>/dev/null || pm2 start /var/www/soukconect/ecosystem.config.js --name shell

    # Food-Connect App
    cd /var/www/soukconect/food-connect
    pnpm install --prod
    pm2 restart food-connect 2>/dev/null || pm2 start /var/www/soukconect/ecosystem.config.js --name food-connect

    # Verify services
    pm2 status
EOF

echo "✅ Deployment complete!"
echo "🌐 Apps should be live at:"
echo "   - Shell: http://shell.yourdomain.com"
echo "   - Food-Connect: http://food-connect.yourdomain.com"
