import { NextResponse } from 'next/server';
import { getAllRunClubs } from '@/lib/runclubs';

export async function GET() {
  try {
    const clubs = await getAllRunClubs();
    return NextResponse.json({ clubs });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
}