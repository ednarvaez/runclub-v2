import { NextResponse } from 'next/server';
import { getAllRunClubs } from '@/lib/runclubs';

export async function GET() {
  try {
    const allClubs = await getAllRunClubs();
    
    // Count clubs by city for debugging
    const cityBreakdown = allClubs.reduce((acc, club) => {
      const city = club.city.toLowerCase();
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Borough counting logic (same as homepage)
    const getBoroughCount = (boroughName: string) => {
      return allClubs.filter(club => {
        const cityLower = club.city.toLowerCase();
        const boroughLower = boroughName.toLowerCase();
        
        if (boroughLower === 'manhattan') {
          return cityLower === 'new york' || cityLower.includes('manhattan');
        }
        if (boroughLower === 'queens') {
          return cityLower.includes('queens') || cityLower === 'long island city' || cityLower === 'jamaica';
        }
        if (boroughLower === 'brooklyn') {
          return cityLower === 'brooklyn' || cityLower.includes('brooklyn');
        }
        if (boroughLower === 'bronx') {
          return cityLower === 'bronx' || cityLower.includes('bronx');
        }
        
        return cityLower === boroughLower || cityLower.includes(boroughLower);
      }).length;
    };

    const boroughCounts = {
      Manhattan: getBoroughCount('Manhattan'),
      Brooklyn: getBoroughCount('Brooklyn'),
      Queens: getBoroughCount('Queens'),
      Bronx: getBoroughCount('Bronx'),
    };

    // Sample of NYC clubs for verification
    const nycSample = allClubs
      .filter(club => 
        club.city.toLowerCase() === 'new york' || 
        club.city.toLowerCase() === 'brooklyn' ||
        club.city.toLowerCase() === 'bronx' ||
        club.city.toLowerCase().includes('queens') ||
        club.city.toLowerCase() === 'long island city' ||
        club.city.toLowerCase() === 'jamaica'
      )
      .slice(0, 10)
      .map(club => ({ name: club.name, city: club.city, id: club.id }));

    return NextResponse.json({
      totalClubs: allClubs.length,
      cityBreakdown,
      boroughCounts,
      nycSample,
      timestamp: new Date().toISOString(),
      dataSource: allClubs.length > 50 ? 'Google Sheets' : 'Fallback Data'
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}