import { NextResponse } from 'next/server';
import { fetchRunClubsFromSheets } from '@/lib/googleSheets';

export async function GET() {
  try {
    const clubs = await fetchRunClubsFromSheets();
    
    return NextResponse.json({
      success: true,
      clubs,
      count: clubs.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Google Sheets sync error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sync with Google Sheets',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  // Force refresh the Google Sheets data
  return GET();
}