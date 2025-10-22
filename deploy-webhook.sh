#!/bin/bash
# Script deploy webhook SePay lên AWS ECS

echo "🚀 Deploying SePay Webhook to inkverse.online..."

# 1. Build client
echo "📦 Building React client..."
cd client
npm run build
echo "✅ Client built successfully"

# 2. Copy webhook files to server
echo "📁 Copying webhook files..."
cd ../server

# Ensure webhook files exist
if [ ! -f "src/controllers/webhookController.js" ]; then
    echo "❌ webhookController.js not found!"
    exit 1
fi

if [ ! -f "src/routes/webhooks.js" ]; then
    echo "❌ webhooks.js not found!"
    exit 1
fi

echo "✅ Webhook files ready"

# 3. Install dependencies
echo "📥 Installing dependencies..."
npm install
echo "✅ Dependencies installed"

# 4. Test locally first
echo "🧪 Testing webhook locally..."
node -e "
import('./src/index.js').then(() => {
    console.log('✅ Server started successfully');
    process.exit(0);
}).catch(err => {
    console.error('❌ Server start failed:', err.message);
    process.exit(1);
});
"

if [ $? -eq 0 ]; then
    echo "✅ Local test passed"
else
    echo "❌ Local test failed"
    exit 1
fi

# 5. Deploy instructions
echo ""
echo "🎯 DEPLOYMENT INSTRUCTIONS:"
echo "=========================="
echo "1. Upload these files to your AWS ECS server:"
echo "   - server/src/controllers/webhookController.js"
echo "   - server/src/routes/webhooks.js"
echo "   - server/src/index.js (updated)"
echo ""
echo "2. Restart your server:"
echo "   sudo systemctl restart your-app-service"
echo ""
echo "3. Test webhook:"
echo "   curl -X POST https://inkverse.online/api/webhooks/test"
echo ""
echo "4. Monitor logs:"
echo "   https://inkverse.online/admin/webhooks"
echo ""
echo "🔧 Webhook URL for SePay:"
echo "https://inkverse.online/api/webhooks/sepay-payment"
echo ""
echo "✅ Ready for deployment!"
