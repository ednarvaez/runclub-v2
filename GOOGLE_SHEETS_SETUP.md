# 🔑 Google Sheets API Setup Guide

## Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Project name: `runclub-directory`
   - Click "Create"

## Step 2: Enable Google Sheets API

1. **Navigate to APIs & Services**
   - In the sidebar: APIs & Services → Library
   - Search for: "Google Sheets API"
   - Click on "Google Sheets API"
   - Click "Enable"

## Step 3: Create Service Account

1. **Go to Credentials**
   - APIs & Services → Credentials
   - Click "Create Credentials" → "Service Account"

2. **Service Account Details**
   - Service account name: `runclub-sheets-reader`
   - Service account ID: `runclub-sheets-reader` (auto-filled)
   - Description: `Read access for runclub directory data`
   - Click "Create and Continue"

3. **Grant Permissions**
   - Role: `Viewer` (this gives read-only access)
   - Click "Continue" → "Done"

## Step 4: Create Private Key

1. **Find Your Service Account**
   - In Credentials page, find your service account
   - Click on the service account email

2. **Generate Key**
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Key type: **JSON**
   - Click "Create"
   - **Important**: The JSON file will download automatically - save it securely!

## Step 5: Extract Credentials from JSON

The downloaded JSON file contains your credentials. Open it and find:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n",
  "client_email": "runclub-sheets-reader@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  ...
}
```

**Extract these values:**
- `private_key`: The entire string including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- `client_email`: The service account email address

## Step 6: Share Google Sheet with Service Account

1. **Open the Google Sheet**
   - Go to: https://docs.google.com/spreadsheets/d/1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl/edit

2. **Share the Sheet**
   - Click "Share" button (top right)
   - In "Add people and groups" field, paste your service account email:
     `runclub-sheets-reader@your-project.iam.gserviceaccount.com`
   - Set permission: **Viewer**
   - Uncheck "Notify people" (optional)
   - Click "Share"

## Step 7: Update Environment Variables

Edit your `.env.local` file:

```bash
# Google Sheets API Configuration
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
...your actual private key content...
...
-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL=runclub-sheets-reader@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_SHEET_ID=1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl
```

**Important Notes:**
- Keep the private key exactly as it appears in the JSON (including line breaks)
- Use quotes around the private key
- Don't escape the newlines - paste them as-is

## Step 8: Test the Integration

1. **Restart your development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Test the API endpoint:**
   ```bash
   curl http://localhost:3000/api/sheets/sync
   ```

3. **Expected success response:**
   ```json
   {
     "success": true,
     "clubs": [...],
     "count": 10,
     "timestamp": "2025-01-26T..."
   }
   ```

## Troubleshooting

### Common Errors

**Error: "Google Sheets credentials not configured"**
- Check that environment variables are set correctly
- Restart your development server after updating `.env.local`

**Error: "The caller does not have permission"**
- Ensure you shared the Google Sheet with the service account email
- Verify the service account has "Viewer" permission

**Error: "DECODER routines::unsupported"**
- This means the private key format is incorrect
- Copy the private key exactly from the JSON file (including line breaks)
- Don't add extra quotes or escape characters

### Verify Your Setup

1. **Check Environment Variables:**
   ```bash
   # In your project directory
   node -e "console.log(process.env.GOOGLE_SHEETS_CLIENT_EMAIL)"
   ```

2. **Check Sheet Access:**
   - Open the Google Sheet
   - Verify the service account email is in the "Share" list

3. **Test API Endpoint:**
   ```bash
   curl -s http://localhost:3000/api/sheets/sync | jq '.success'
   # Should return: true
   ```

## For Vercel Deployment

When deploying to Vercel, add the same environment variables:

1. **Go to Vercel Dashboard**
   - Select your project
   - Settings → Environment Variables

2. **Add Variables:**
   - `GOOGLE_SHEETS_PRIVATE_KEY`: Paste the full private key
   - `GOOGLE_SHEETS_CLIENT_EMAIL`: Service account email
   - `GOOGLE_SHEETS_SHEET_ID`: `1GsQDd6zqvDF6Os9Y2Z6P1Z8NPBcPL5Sl`

3. **Deploy:**
   - Vercel will automatically redeploy with new environment variables

---

🔐 **Security Notes:**
- Never commit the `.env.local` file to git
- Keep your JSON credentials file secure
- Use environment variables for all sensitive data
- Consider rotating keys periodically for production use

📊 **Data Format:**
The Google Sheet should have columns matching your RunClub interface:
- Column A: name
- Column B: site (website URL)
- Column C: category
- Column D: phone
- Column E: full_address
- Column F: city
- Column G: postal_code
- Column H: latitude
- Column I: longitude
- Column J: rating
- Column K: reviews
- Column L: photo (image URL)
- Column M: description
- Column N: email_1