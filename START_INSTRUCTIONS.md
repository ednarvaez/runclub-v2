# 🚀 RunClub Directory v2 - Startup Instructions

## Quick Start

1. **Open Terminal and Navigate to Project**
   ```bash
   cd /home/lab/runclub-v2
   ```

2. **Install Dependencies (if needed)**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open your browser
   - Go to: `http://localhost:3000`

## Alternative Start Commands

If port 3000 is busy, try:
```bash
npm run dev -- --port 3001
```

## Environment Setup (Optional)

To enable Google Sheets integration:
```bash
# Edit .env.local file
nano .env.local

# Add these lines:
GOOGLE_SHEETS_PRIVATE_KEY=your_service_account_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email
GOOGLE_SHEETS_SHEET_ID=1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl
```

## Troubleshooting

1. **Port Already in Use**
   ```bash
   # Kill existing process
   pkill -f "next dev"
   
   # Or use different port
   npm run dev -- --port 3001
   ```

2. **Dependencies Issues**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Issues**
   ```bash
   # Test build
   npm run build
   ```

## Features Available

✅ **Homepage**: Hero section with search and featured clubs
✅ **Search**: Full-text search with filtering
✅ **Club Details**: Individual pages with free Google Maps
✅ **About Page**: Information about the platform
✅ **API Routes**: RESTful endpoints for data
✅ **Responsive Design**: Mobile-first approach

## File Structure

```
runclub-v2/
├── src/app/           # Next.js pages
├── src/components/    # React components  
├── src/lib/          # Business logic
├── data/             # Fallback data
├── package.json      # Dependencies
└── README.md         # Full documentation
```

🏃‍♂️ **Happy Running!**