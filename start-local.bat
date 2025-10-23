@echo off
echo 🚀 Starting Vietnam T-Shirts Local Development Environment
echo ==================================================

REM Check if MongoDB is running locally
echo 🔍 Checking MongoDB local connection...
mongosh --eval "db.runCommand('ping')" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB is not running locally!
    echo 💡 Please start MongoDB first:
    echo    - Start MongoDB service from Services
    echo    - Or run 'mongod' in command prompt
    echo.
    echo Or switch to Atlas by setting DB_ENVIRONMENT=atlas
    pause
    exit /b 1
)

echo ✅ MongoDB is running locally

REM Set environment variables for local development
set DB_ENVIRONMENT=local
set NODE_ENV=development

echo 🔧 Environment configured:
echo    - DB_ENVIRONMENT: %DB_ENVIRONMENT%
echo    - NODE_ENV: %NODE_ENV%
echo.

REM Start backend server
echo 🖥️  Starting backend server...
cd server
start "Backend Server" cmd /k "npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend development server
echo 🌐 Starting frontend development server...
cd ..\client
start "Frontend Server" cmd /k "npm start"

echo.
echo 🎉 Local development environment started!
echo ==================================================
echo 📱 Frontend: http://localhost:3000
echo 🖥️  Backend API: http://localhost:5000/api
echo 🔧 Environment: Local Development
echo.
echo Press any key to exit...
pause >nul
