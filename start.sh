#!/bin/bash

# Quick Start Script for New-interface-connect
# Run this script to start the application

echo "🚀 Starting New-interface-connect..."
echo ""

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP first."
    exit 1
fi

# Check if server is already running
if [ -f server.pid ] && kill -0 $(cat server.pid) 2>/dev/null; then
    echo "⚠️  Server is already running on http://localhost:8000"
    echo "   PID: $(cat server.pid)"
    exit 0
fi

# Start the server
echo "✅ Starting PHP server on http://localhost:8000..."
nohup php -S localhost:8000 > server.log 2>&1 &
echo $! > server.pid

sleep 2

# Check if server started successfully
if kill -0 $(cat server.pid) 2>/dev/null; then
    echo ""
    echo "✅ Server is running!"
    echo ""
    echo "📍 Access points:"
    echo "   - Main: http://localhost:8000/"
    echo "   - Login: http://localhost:8000/login/"
    echo "   - Phone: http://localhost:8000/phone/"
    echo "   - Trading: http://localhost:8000/trading/"
    echo ""
    echo "🛑 To stop: ./stop.sh or kill $(cat server.pid)"
else
    echo "❌ Failed to start server. Check server.log for details."
    exit 1
fi
