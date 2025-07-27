# 🚀 RunClub Directory v2 - Deployment Guide

## Quick Vercel Deployment

### 1. Prerequisites
- GitHub account with runclub-v2 repository
- Vercel account (can sign up with GitHub)
- Google Cloud Console access for Sheets API

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd /home/lab/runclub-v2
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? Select your account
# - Link to existing project? N (for new deployment)
# - Project name? runclub-v2
# - Directory? ./
# - Framework? Next.js
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `runclub-v2`
4. Framework: Next.js (auto-detected)
5. Click "Deploy"

### 3. Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables, add:

```bash
# Google Sheets API (Required)
GOOGLE_SHEETS_PRIVATE_KEY=your_service_account_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_SHEETS_SHEET_ID=1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

**Important**: For `GOOGLE_SHEETS_PRIVATE_KEY`, ensure newlines are preserved:
- Copy the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Paste directly into Vercel (don't escape newlines)

### 4. Google Sheets API Setup

#### Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google Sheets API
4. Create Service Account:
   - IAM & Admin → Service Accounts → Create
   - Name: `runclub-sheets-reader`
   - Role: `Viewer` (minimal permissions)
5. Create Key:
   - Select service account → Keys → Add Key → JSON
   - Download and save the JSON file

#### Share Google Sheet
1. Open: https://docs.google.com/spreadsheets/d/1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl/edit
2. Click "Share" → Add the service account email
3. Set permission: "Viewer"

### 5. Verify Deployment

After deployment:
1. **Homepage**: Should load with featured clubs
2. **API Test**: Visit `your-domain.vercel.app/api/sheets/sync`
3. **Search**: Test search functionality
4. **Individual Clubs**: Check detail pages work

## Features Enabled

✅ **Automatic Deployments**: Every GitHub push triggers new deployment  
✅ **ISR (Incremental Static Regeneration)**: Pages refresh every 6 hours  
✅ **Google Sheets Integration**: Real-time data with fallback  
✅ **Cron Jobs**: Data syncs every 6 hours automatically  
✅ **Edge Optimization**: Fast global content delivery  
✅ **Free Maps**: No API costs for basic Google Maps  

## Cost Optimization

### Free Tier Limits (Vercel)
- **Bandwidth**: 100GB/month
- **Function Execution**: 100GB-hrs/month
- **Build Time**: 6,000 minutes/month

### Stay Within Free Tier
- ✅ **ISR Enabled**: Reduces function calls
- ✅ **Caching**: 5-10 minute cache for API responses
- ✅ **Optimized Images**: Next.js automatic optimization
- ✅ **Edge Functions**: Faster, cheaper execution

### Monitor Usage
- Vercel Dashboard → Project → Analytics
- Set up spending limits in Vercel billing
- Google Sheets API: 100 requests/100 seconds (free tier)

## Environment Configurations

### Preview Deployments
- **Automatic**: Every PR gets preview URL
- **Environment**: Uses same environment variables as production
- **Testing**: Safe environment for testing changes

### Production Deployment
- **Domain**: Custom domain support
- **Performance**: Full edge optimization
- **Monitoring**: Built-in analytics and logging

## Troubleshooting

### Common Issues

**1. Google Sheets API Error**
```
Error: Google Sheets credentials not configured
```
- Verify environment variables are set correctly
- Check service account has access to the sheet
- Ensure private key format is correct (with newlines)

**2. Build Errors**
```
Module not found: 'googleapis'
```
- Verify `package.json` includes `googleapis` dependency
- Run `npm install` to ensure all dependencies are installed

**3. ISR Not Working**
- Check Next.js version (15.4.4+)
- Verify `revalidate` export in page components
- Monitor Vercel function logs for errors

### Debug API
```bash
# Test Google Sheets API locally
curl http://localhost:3000/api/sheets/sync

# Test Google Sheets API on Vercel
curl https://your-domain.vercel.app/api/sheets/sync
```

## Performance Optimizations

### Implemented
- **ISR**: 6-hour revalidation for static pages
- **Caching**: In-memory cache with TTL
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic with Next.js
- **Edge Functions**: Vercel edge runtime

### Next Steps
- **CDN**: Vercel Edge Network (automatic)
- **Database**: Consider upgrading to PostgreSQL for production
- **Analytics**: Google Analytics integration
- **SEO**: Dynamic meta tags and sitemap

---

🏃‍♂️ **Ready to deploy!** The application is optimized for Vercel and will work seamlessly with the configured Google Sheets data source.