#!/bin/bash

# Stop Script for New-interface-connect

if [ ! -f server.pid ]; then
    echo "⚠️  No server.pid file found. Server may not be running."
    exit 0
fi

PID=$(cat server.pid)

if kill -0 $PID 2>/dev/null; then
    echo "🛑 Stopping server (PID: $PID)..."
    kill $PID
    rm server.pid
    echo "✅ Server stopped."
else
    echo "⚠️  Server is not running."
    rm server.pid
fi
