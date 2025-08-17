#!/bin/bash

echo "🚀 Starting Gofera Backend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create one from env.example"
    echo "cp env.example .env"
    echo "Then edit .env with your configuration"
    exit 1
fi

# Start the development server
echo "🔥 Starting development server..."
npm run dev
