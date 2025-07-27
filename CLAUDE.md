# Run Club Directory Website - Version 2

A comprehensive directory website for run clubs with search functionality, detailed listings, and review system. This is the second iteration focusing on improved Vercel deployment and Google Sheets integration.

## Project Overview

This project creates a run club directory website (runclub-v2) based on learnings from the first iteration. The site allows users to search for run clubs by location, view detailed information with improved Google Maps integration, and leave reviews. Key improvements include seamless Vercel deployment and Google Sheets as the primary data source.

### Version 2 Key Improvements
- **Data Source**: Google Sheets API integration (replacing CSV files)
- **Deployment**: Optimized for Vercel with reliable preview deployments
- **Maps Integration**: Enhanced Google Maps implementation with better performance
- **Repository**: Fresh start with runclub-v2 repository for clean deployment

### Key Features
- Homepage with search by zip code/address
- Featured run clubs display
- Run club detail pages with contact info, descriptions, photos, and reviews
- Review system with star ratings
- Responsive design
- Data sourced from Google Sheets API: https://docs.google.com/spreadsheets/d/1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl/edit?gid=821823462#gid=821823462

## Framework Selection: Next.js

**Chosen Framework**: Next.js 15+ with TypeScript
- **Frontend**: React with TypeScript
- **Backend**: Next.js API routes
- **Data Source**: Google Sheets API (primary), with local fallback for development
- **Styling**: Tailwind CSS (matches modern design trends)
- **Search**: Built-in text search with Google Sheets filtering
- **Deployment**: Vercel - Optimized for reliable preview deployments
- **Repository**: GitHub - new "runclub-v2" repository using https://github.com/ednarvaez
- **Maps**: Google Maps Embed (free, no API key required)

### Why Next.js?
- Server-side rendering for SEO
- Built-in API routes
- Excellent performance
- Seamless Vercel deployment integration
- Great Google Sheets API integration capabilities
- Built-in iframe optimization for embedded maps

## Prerequisites

1. **Node.js**: Version 18+ 
2. **npm** or **yarn** package manager
3. **Git** for version control
4. **Code editor** (VS Code recommended)

## Data Structure Analysis

Based on CSV analysis, each run club has:
- `name`: Run club name
- `site`: Website URL
- `category`: Type (Athletic club, Sports club, etc.)
- `phone`: Contact phone
- `full_address`: Complete address
- `city`, `postal_code`: Location details
- `latitude`, `longitude`: Coordinates for mapping
- `rating`: Star rating (1-5)
- `reviews`: Number of reviews
- `photo`: Image URL
- `description`: Club description
- `email_1`: Contact email

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Next.js project with TypeScript
2. Set up Tailwind CSS
3. Configure ESLint and Prettier
4. Set up Git repository
5. Create basic folder structure
6. Ensure that site can be deployed with vercel in a new project called runclub-v2. Here is vercel acct: username: enarvaez-1325

### Phase 2: Data Layer & Google Sheets Integration
1. Set up Google Sheets API credentials and service account
2. Implement Google Sheets API client for data fetching
3. Create TypeScript interfaces for run club data
4. Implement data access layer with Google Sheets as primary source
5. Add local JSON fallback for development and testing
6. Implement caching strategy for Google Sheets data
7. Add search/filter functionality with server-side processing

### Phase 3: Homepage Implementation
1. Create hero section with search bar
2. Implement location-based search
3. Add featured run clubs section
4. Create "Major Cities" showcase
5. Add responsive navigation

### Phase 4: Detail Pages & Free Maps Integration
1. Create dynamic run club detail pages
2. Implement breadcrumb navigation
3. Add contact information display
4. Create photo gallery component
5. Build review display system
6. Implement Google Maps Embed integration (free, no API key)
7. Add responsive iframe maps with address-based URLs
8. Create "Get Directions" links to Google Maps
9. Add fallback address display when maps fail to load

### Phase 5: Review System
1. Create review submission form
2. Implement star rating component
3. Add review validation
4. Create review storage (JSON initially)
5. Display aggregate ratings

### Phase 6: Search & Filtering
1. Implement zip code/address search
2. Add location-based filtering
3. Create search results page
4. Add sorting options (rating, distance)
5. Implement pagination

### Phase 7: Vercel Deployment & Optimization
1. Configure Vercel project settings for reliable deployment
2. Set up environment variables for Google Sheets and Maps APIs
3. Implement ISR (Incremental Static Regeneration) for data freshness
4. Add loading states and error handling
5. Optimize images and performance for Vercel edge functions
6. Add SEO meta tags with dynamic data from Google Sheets
7. Configure preview deployments for testing
8. Set up deployment pipeline with GitHub integration

## File Structure (Version 2)
```
runclub-v2/
├── src/
│   ├── app/                           # Next.js 15 App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx                   # Homepage
│   │   ├── runclub/[id]/page.tsx      # Detail pages
│   │   ├── search/page.tsx            # Search results
│   │   └── api/                       # API routes
│   │       ├── sheets/route.ts        # Google Sheets data fetching
│   │       └── reviews/route.ts       # Review management
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── RunClubCard.tsx
│   │   ├── ReviewForm.tsx
│   │   ├── StarRating.tsx
│   │   └── MapEmbed.tsx               # Google Maps embed component
│   ├── lib/
│   │   ├── googleSheets.ts            # Google Sheets API client
│   │   ├── cache.ts                   # Data caching layer
│   │   └── runclubs.ts                # Data access layer
│   ├── types/
│   │   └── runclub.ts
│   └── utils/
│       ├── sheetsParser.ts            # Google Sheets data processing
│       └── search.ts
├── public/
│   └── images/
├── data/                              # Fallback data for development
│   └── runclubs-fallback.json
├── .env.local                         # API keys and configuration
├── vercel.json                        # Vercel deployment config
└── package.json
```

## Version 2 Specific Considerations

### Google Sheets API Integration (Primary Focus)
- Google Sheets API v4 for real-time data access
- Service account authentication for secure API access
- Implement caching to avoid API rate limits
- ISR (Incremental Static Regeneration) for fresh data with performance
- Fallback to local JSON data during development/API failures

### Vercel Deployment Optimization
- Configure environment variables for production and preview
- Set up proper build commands and output directories
- Implement edge functions for improved performance
- Configure ISR for data-heavy pages
- Set up preview deployments for testing changes

### Airtable Integration
#- Use Airtable REST API
#- Implement webhook notifications
#- Add image management

### Database Migration
#- PostgreSQL with Prisma ORM
#- User authentication system
#- Advanced review moderation

## Git Workflow

1. Create feature branches for each phase
2. Use conventional commits
3. Set up GitHub Actions for CI/CD
4. Deploy to Vercel 

## Getting Started Commands
```bash
# Initialize Next.js project
npx create-next-app@latest runclub-directory --typescript --tailwind --app

# Install additional dependencies for version 2
npm install googleapis date-fns lucide-react

# Development server
npm run dev

# Build for production
npm run build
```

## ✅ COMPLETED IMPLEMENTATION STATUS

### 🚀 Fully Implemented Features (January 2025)

**✅ Core Application Built & Running**
- Next.js 15.4.3 with TypeScript and Tailwind CSS
- Development server running on `http://localhost:3000`
- Production-ready build system configured

**✅ Homepage Implementation**
- Hero section with search functionality matching daycare finder design
- Featured run clubs section with cards showing images, ratings, locations
- Major cities showcase with gradient cards linking to city searches
- Responsive navigation header with mobile menu

**✅ Data Layer & CSV Integration**
- Complete CSV parsing system for `runclub-Outscraper-20250622.xlsx.csv`
- TypeScript interfaces for run club data structure
- Server-side data loading with caching
- Search and filtering utilities

**✅ Run Club Detail Pages**
- Dynamic routing for individual run club pages (`/runclub/[id]`)
- Breadcrumb navigation matching daycare finder UI
- Contact information sidebar with action buttons
- Star ratings and review display system
- Image galleries with fallbacks
- "Similar run clubs" recommendations

**✅ Search & Discovery**
- Global search page with real-time filtering
- Search by location, name, category, zip code
- Results page with grid layout
- URL-based search parameters
- City-specific search functionality

**✅ Visual Design System**
- Professional running-themed imagery system
- 10 curated Unsplash images for clubs without photos
- Consistent image assignment (same club = same image)
- Optimized Next.js Image component configuration
- Star rating component with visual feedback

**✅ Technical Implementation**
- TypeScript for type safety
- ESLint configuration with error fixes
- Responsive design with Tailwind CSS
- External image domain configuration
- Suspense boundaries for client-side components

## 📊 Current Data Source

**Primary Data**: `runclub-Outscraper-20250622.xlsx.csv`
- **Location**: Primarily NYC area run clubs
- **Fields**: Name, location, contact info, ratings, reviews, photos
- **Count**: ~100+ run clubs processed
- **Status**: Fully integrated and functional

## 🛠️ Technical Architecture

### Current File Structure
```
runclub-directory/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with header
│   │   ├── page.tsx                   # Homepage with hero & features
│   │   ├── runclub/[id]/page.tsx      # Dynamic detail pages
│   │   └── search/page.tsx            # Search results page
│   ├── components/
│   │   ├── Header.tsx                 # Navigation component
│   │   ├── SearchBar.tsx              # Global search component
│   │   ├── RunClubCard.tsx            # Club listing card
│   │   ├── StarRating.tsx             # Rating display component
│   │   └── GoogleMap.tsx              # Interactive Google Maps component
│   ├── lib/
│   │   └── runclubs.ts                # Data access layer
│   ├── utils/
│   │   ├── csvParser.ts               # CSV processing utilities
│   │   └── imageUtils.ts              # Image fallback system
│   └── types/
│       └── runclub.ts                 # TypeScript interfaces
├── data/
│   └── runclub-Outscraper-20250622.xlsx.csv
├── .env.local                         # Environment variables (Google Maps API key)
├── MAPS_SETUP.md                      # Google Maps setup instructions
├── next.config.ts                     # Next.js configuration
└── package.json                       # Dependencies
```

### Dependencies Installed
```json
{
  "dependencies": {
    "next": "15.4.3",
    "react": "19.1.0",
    "tailwindcss": "4.0",
    "typescript": "5.7.2",
    "papaparse": "^5.5.3",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.525.0",
    "@googlemaps/js-api-loader": "^1.16.10"
  },
  "devDependencies": {
    "@types/google.maps": "^3.58.1"
  }
}
```

## 🌐 Running the Application

### Development Server
```bash
cd runclub-directory
npm run dev
```
- **URL**: `http://localhost:3000`
- **Status**: ✅ Running and functional
- **Features**: Hot reload, TypeScript checking, Tailwind compilation

### Production Build
```bash
npm run build
```
- **Status**: ✅ Builds successfully
- **Output**: Optimized static pages and server functions
- **Performance**: Lighthouse-ready with image optimization

## 🎨 Design Implementation

**Visual Style**: Professional daycare finder aesthetic adapted for running clubs
- **Color Scheme**: Orange/blue accents, clean whites and grays
- **Typography**: Modern sans-serif with clear hierarchy
- **Images**: High-quality running photography from Unsplash
- **Layout**: Card-based design with consistent spacing
- **Responsive**: Mobile-first design approach

## 🔧 Configuration Details

### Image Optimization
```typescript
// next.config.ts - Configured domains
remotePatterns: [
  { hostname: 'lh3.googleusercontent.com' },  // Google Photos
  { hostname: 'images.unsplash.com' },        // Unsplash images
  // ... other Google domains
]
```

### Random Image System
- **Fallback Images**: 10 professional running photos
- **Consistency**: Same club always gets same image
- **Categories**: Group running, trails, marathons, city running, beach running

## 🗺️ Google Maps Integration (January 2025)

### ✅ IMPLEMENTED: Interactive Google Maps
- **Component**: `/src/components/GoogleMap.tsx` - Interactive map component
- **Integration**: Updated individual runclub pages with live maps
- **API**: Uses Google Maps JavaScript API with `@googlemaps/js-api-loader`
- **Fallback**: Graceful degradation when no API key is configured
- **Features**: 
  - Interactive zoom, pan, satellite view
  - Custom markers for each runclub location
  - Clean styling with reduced POI clutter
  - TypeScript support with `@types/google.maps`

### Setup Required
1. **Get Google Maps API Key**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable APIs**: Maps JavaScript API (required), Places API (optional)
3. **Configure**: Add key to `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. **Documentation**: See `MAPS_SETUP.md` for complete setup instructions

### Current Behavior
- **With API Key**: Interactive Google Maps with markers and full functionality
- **Without API Key**: Fallback display with address and setup instructions
- **Get Directions**: Always works via direct Google Maps links (unchanged)

## 📈 Next Steps & Future Enhancements

### Immediate Additions (Ready to implement)
1. **Review Submission System**: Form to add new reviews
2. **Advanced Filtering**: By rating, distance, club type
3. ~~**Map Integration**: Google Maps for club locations~~ ✅ **COMPLETED**
4. **User Favorites**: Save/bookmark favorite clubs

### Data Integration Upgrades
1. **Google Sheets API**: Real-time data sync
2. **Airtable Integration**: Content management system
3. **User Authentication**: Login/registration system
4. **Admin Dashboard**: Content management interface

### Performance & SEO
1. **Meta Tags**: Dynamic SEO optimization
2. **Sitemap Generation**: Automatic XML sitemaps
3. **Analytics Integration**: Google Analytics setup
4. **Performance Monitoring**: Core Web Vitals tracking

## 📋 Deployment Ready

The application is fully deployment-ready for:
- **Vercel**: Recommended (zero-config Next.js deployment)
- **Netlify**: Alternative static hosting
- **AWS/Google Cloud**: Container deployment options

## Environment Variables (Version 2)

### Required for Production
```bash
# .env.local
GOOGLE_SHEETS_PRIVATE_KEY=your_service_account_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email
GOOGLE_SHEETS_SHEET_ID=1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl
```

### Optional for Enhanced Features
```bash
AIRTABLE_API_KEY=
NEXT_PUBLIC_ANALYTICS_ID=
```

### Vercel Deployment Variables
- Only Google Sheets credentials need to be configured in Vercel dashboard
- Use Vercel CLI for easy variable management: `vercel env`
- Separate configurations for Preview and Production environments
- No maps API costs - using free Google Maps embed

### Cost Control for Vercel
- **Free Tier**: 100GB bandwidth, 100GB-hrs functions/month
- **Enable spending limits** in dashboard to prevent overages
- **Use ISR caching** to minimize function calls
- **Monitor usage** via Vercel analytics
- **Typical preview site cost**: $0/month (stays within free tier)

## 🚀 Version 2 Planning Updates (January 26, 2025)

### 📋 Key Changes from Version 1
- **Data Source Migration**: From CSV files to Google Sheets API for real-time data
- **Deployment Focus**: Optimized for reliable Vercel preview deployments
- **Free Maps Integration**: Google Maps Embed (no API key, no costs)
- **Repository**: Fresh runclub-v2 repository for clean deployment workflow

### 🎯 Version 2 Priority Features
1. **Google Sheets Integration**: Primary data source with real-time sync
2. **Vercel Optimization**: Reliable preview deployments and ISR implementation
3. **Free Maps Integration**: Google Maps Embed with zero API costs
4. **Clean Architecture**: Leveraging lessons learned from version 1

### 📝 Implementation Notes
- Build upon successful components from version 1
- Focus on deployment reliability and data source flexibility
- Maintain design consistency while improving technical foundation
- Ensure seamless transition from development to production

### 🗺️ Free Maps Implementation Strategy
**Google Maps Embed Integration** (No API Key Required)
```html
<!-- Example: Free Google Maps embed -->
<iframe
  src="https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(address)}&zoom=15"
  width="100%"
  height="300"
  style="border:0;"
  allowfullscreen=""
  loading="lazy">
</iframe>
```

**Benefits:**
- ✅ **Zero cost** - no API key required
- ✅ **No usage limits** - unlimited map displays
- ✅ **Full functionality** - zoom, pan, satellite view
- ✅ **Mobile responsive** - works on all devices
- ✅ **Fast loading** - optimized by Google
- ✅ **Always works** - no API quota issues

**Implementation Details:**
- Use address string directly in embed URL
- Responsive iframe container with Tailwind CSS
- Fallback to address text if iframe fails
- "Get Directions" button opens Google Maps app/website

---
**Planning Completed**: January 26, 2025  
**Status**: 📋 Ready for Version 2 implementation  
**Next Phase**: Begin development with Google Sheets integration and Vercel optimization
