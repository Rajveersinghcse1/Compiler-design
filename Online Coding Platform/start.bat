@echo off
REM Startup script for Web Compiler on Windows
REM This script starts both the backend and frontend servers

echo 🚀 Starting Web Compiler...

REM Start backend server in a new window
echo 📡 Starting backend server...
start "Backend Server" cmd /k "cd /d backend && npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend server in a new window
echo 🎨 Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

echo ✅ Both servers are starting!
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:5000
echo 📚 Backend Health: http://localhost:5000/api/health
echo.
echo Check the opened terminal windows for server status
echo Close the terminal windows to stop the servers

pause
