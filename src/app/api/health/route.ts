import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are available
    const envCheck = {
      hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      hasSheetId: !!process.env.GOOGLE_SHEETS_SHEET_ID,
      hasMapsKey: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      status: 'healthy',
      environment: envCheck,
      message: 'API is working correctly'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}