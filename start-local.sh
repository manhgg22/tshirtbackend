#!/bin/bash

echo "🚀 Starting Vietnam T-Shirts Local Development Environment"
echo "=================================================="

# Check if MongoDB is running locally
echo "🔍 Checking MongoDB local connection..."
if ! mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
    echo "❌ MongoDB is not running locally!"
    echo "💡 Please start MongoDB first:"
    echo "   - Windows: Start MongoDB service or run 'mongod'"
    echo "   - Mac: brew services start mongodb-community"
    echo "   - Linux: sudo systemctl start mongod"
    echo ""
    echo "Or switch to Atlas by setting DB_ENVIRONMENT=atlas"
    exit 1
fi

echo "✅ MongoDB is running locally"

# Set environment variables for local development
export DB_ENVIRONMENT=local
export NODE_ENV=development

echo "🔧 Environment configured:"
echo "   - DB_ENVIRONMENT: $DB_ENVIRONMENT"
echo "   - NODE_ENV: $NODE_ENV"
echo ""

# Start backend server
echo "🖥️  Starting backend server..."
cd server
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend development server
echo "🌐 Starting frontend development server..."
cd ../client
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Local development environment started!"
echo "=================================================="
echo "📱 Frontend: http://localhost:3000"
echo "🖥️  Backend API: http://localhost:5000/api"
echo "🔧 Environment: Local Development"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
