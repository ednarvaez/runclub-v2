# RunClub Directory v2

A comprehensive directory website for discovering running clubs with search functionality, detailed listings, and free Google Maps integration.

## 🏃‍♂️ Features

- **Search & Discovery**: Find running clubs by location, name, or category
- **Detailed Club Pages**: Contact info, descriptions, reviews, and location maps
- **Free Maps Integration**: Google Maps embed (no API key required)
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Google Sheets Integration**: Real-time data from Google Sheets
- **Fallback Data**: Works with local data when Google Sheets is unavailable

## 🚀 Live Demo

Visit the application at: `http://localhost:3001` (development server)

## 📋 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Source**: Google Sheets API with local fallback
- **Maps**: Google Maps Embed (free)
- **Deployment**: Optimized for Vercel

## 🛠️ Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd runclub-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   # Google Sheets API (Optional)
   GOOGLE_SHEETS_PRIVATE_KEY=your_service_account_private_key
   GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email
   GOOGLE_SHEETS_SHEET_ID=1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Data Sources

### Google Sheets Integration (Optional)

The application can fetch data from Google Sheets for real-time updates:

1. **Create a Google Cloud Service Account**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable the Google Sheets API
   - Create service account credentials
   - Download the JSON key file

2. **Configure Environment Variables**
   ```env
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
   GOOGLE_SHEETS_SHEET_ID="your-sheet-id"
   ```

3. **Share the Google Sheet**
   - Share your Google Sheet with the service account email
   - Give "Viewer" permissions

### Fallback Data

If Google Sheets is not configured, the app uses local fallback data from:
- `data/runclubs-fallback.json`
- Built-in sample data in `src/lib/runclubs.ts`

## 🗺️ Maps Integration

This application uses **free Google Maps embed** (no API key required):

- ✅ Zero cost
- ✅ No usage limits
- ✅ Full functionality (zoom, pan, satellite)
- ✅ Mobile responsive
- ✅ Always works (no quota issues)

Maps are embedded using iframe URLs like:
```
https://www.google.com/maps/embed/v1/place?q=ADDRESS&zoom=15
```

## 📁 Project Structure

```
runclub-directory/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── search/page.tsx    # Search results
│   │   ├── runclub/[id]/      # Individual club pages
│   │   └── api/               # API routes
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utility libraries
│   │   ├── googleSheets.ts    # Google Sheets integration
│   │   ├── runclubs.ts        # Data access layer
│   │   └── cache.ts           # In-memory caching
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper functions
├── data/                      # Fallback data files
├── public/                    # Static assets
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy**
   ```bash
   # Or deploy manually
   npm run build
   vercel --prod
   ```

### Environment Variables for Production

In your Vercel dashboard, add:
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_CLIENT_EMAIL` 
- `GOOGLE_SHEETS_SHEET_ID`

### Cost Control

- **Free Tier**: 100GB bandwidth, 100GB-hrs functions/month
- **Enable spending limits** in Vercel dashboard
- **No maps API costs** - using free Google Maps embed
- **Typical cost**: $0/month for preview sites

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
```

### API Endpoints

- `GET /api/runclubs` - Get all run clubs
- `GET /api/runclubs/[id]` - Get specific run club
- `GET /api/search` - Search run clubs with query parameters
- `GET /api/sheets/sync` - Sync data from Google Sheets

### Adding New Features

1. **New Component**: Add to `src/components/`
2. **New Page**: Add to `src/app/`
3. **New API Route**: Add to `src/app/api/`
4. **Update Types**: Modify `src/types/runclub.ts`

## 🏗️ Version 2 Improvements

This is the second iteration of the RunClub Directory with key improvements:

- ✅ **Free Maps**: No Google Maps API key required
- ✅ **Google Sheets**: Real-time data integration
- ✅ **Vercel Optimized**: Reliable deployment setup
- ✅ **Better Performance**: Caching and ISR ready
- ✅ **TypeScript**: Full type safety
- ✅ **Modern Stack**: Next.js 15 + Tailwind CSS

## 📝 License

MIT License - feel free to use this project for your running community!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the GitHub issues
- Review the CLAUDE.md documentation
- Test with the fallback data first

---

**Built with ❤️ for the running community**
