#!/bin/bash

# Startup script for Web Compiler
# This script starts both the backend and frontend servers

echo "🚀 Starting Web Compiler..."

# Function to kill processes on exit
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "📡 Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "✅ Both servers are running!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:5000"
echo "📚 Backend Health: http://localhost:5000/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for either process to exit
wait
