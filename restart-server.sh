#!/bin/bash

# Restart script for runclub-v2 Next.js development server
# Usage: ./restart-server.sh

echo "🔄 Restarting runclub-v2 development server..."

# Kill any existing Node.js processes on port 3000
echo "🛑 Stopping existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No existing processes found on port 3000"

# Wait a moment for processes to fully terminate
sleep 2

# Navigate to project directory
cd /home/lab/runclub-v2

# Start the development server
echo "🚀 Starting Next.js development server..."
npm run dev
