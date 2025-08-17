#!/bin/bash

echo "🧪 Gofera Backend Test Runner"
echo "=============================="

# Check if MongoDB is running locally
echo "🔍 Checking MongoDB availability..."

if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running locally"
    else
        echo "⚠️  MongoDB is installed but not running"
        echo "   Starting MongoDB..."
        mongod --dbpath /tmp/mongodb_test --port 27017 --fork --logpath /tmp/mongodb_test.log
        sleep 3
    fi
else
    echo "⚠️  MongoDB not found locally"
    echo "   Please ensure MongoDB is running on port 27017"
    echo "   Or update MONGODB_URI_TEST in tests/setup.js"
fi

# Check if test database exists
echo "🔍 Checking test database..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run tests
echo "🚀 Running tests..."
echo ""

# Set test environment
export NODE_ENV=test

# Run tests with verbose output
npm test -- --verbose --detectOpenHandles --forceExit

echo ""
echo "✅ Tests completed!"
