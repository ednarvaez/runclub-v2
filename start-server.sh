#!/bin/bash

# RunClub Directory v2 - Server Startup Script

echo "🏃‍♂️ Starting RunClub Directory v2..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local file..."
    cat > .env.local << EOL
# Google Sheets API Configuration (Optional)
GOOGLE_SHEETS_PRIVATE_KEY=your_service_account_private_key_here
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email_here
GOOGLE_SHEETS_SHEET_ID=1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl

# Optional Analytics
NEXT_PUBLIC_ANALYTICS_ID=
EOL
    echo "✅ Created .env.local file"
fi

echo "🚀 Starting development server..."
echo "📍 The application will be available at:"
echo "   http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev