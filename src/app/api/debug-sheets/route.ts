import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;

    console.log('Environment check:');
    console.log('PRIVATE_KEY exists:', !!privateKey);
    console.log('PRIVATE_KEY length:', privateKey?.length || 0);
    console.log('CLIENT_EMAIL:', clientEmail);
    console.log('SHEET_ID:', sheetId);

    if (!privateKey || !clientEmail || !sheetId) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        details: {
          hasPrivateKey: !!privateKey,
          hasClientEmail: !!clientEmail,
          hasSheetId: !!sheetId,
        }
      });
    }

    // Test Google API import
    const { google } = await import('googleapis');
    console.log('Google API imported successfully');

    // Test auth creation
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: privateKey.replace(/\\n/g, '\n'),
        client_email: clientEmail,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    console.log('Auth client created');

    // Test getting access token
    const authClient = await auth.getClient();
    console.log('Auth client obtained');

    // Test sheets API creation
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Sheets API client created');

    // Test if we can list all accessible spreadsheets first
    console.log('Testing access with current sheet ID:', sheetId);
    
    // Try to get spreadsheet metadata
    const metadataResponse = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    console.log('Spreadsheet metadata retrieved:', metadataResponse.data.properties?.title);

    // Get sheet tab names
    const sheetTabs = metadataResponse.data.sheets?.map(sheet => ({
      title: sheet.properties?.title,
      sheetId: sheet.properties?.sheetId,
      gridProperties: sheet.properties?.gridProperties
    })) || [];

    console.log('Sheet tabs found:', sheetTabs);

    return NextResponse.json({
      success: true,
      message: 'Debug successful',
      details: {
        sheetTitle: metadataResponse.data.properties?.title,
        sheetId: sheetId,
        clientEmail: clientEmail,
        hasPrivateKey: !!privateKey,
        sheetTabs: sheetTabs,
      }
    });

  } catch (error) {
    console.error('Debug error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Debug failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}