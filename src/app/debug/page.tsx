import { getAllRunClubs, searchRunClubs } from '@/lib/runclubs';

export default async function DebugPage() {
  const allClubs = await getAllRunClubs();
  const newYorkClubs = await searchRunClubs('', 'New York');
  const brooklynClubs = await searchRunClubs('', 'Brooklyn');
  
  const cityCounts = allClubs.reduce((acc, club) => {
    acc[club.city] = (acc[club.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">All Clubs ({allClubs.length})</h2>
          {allClubs.map(club => (
            <div key={club.id} className="p-2 border-b">
              <strong>{club.name}</strong> - {club.city}
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">City Counts</h2>
          {Object.entries(cityCounts).map(([city, count]) => (
            <div key={city} className="p-2">
              <strong>{city}</strong>: {count} clubs
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">New York Search Results ({newYorkClubs.length})</h2>
          {newYorkClubs.map(club => (
            <div key={club.id} className="p-2 border-b">
              <strong>{club.name}</strong> - {club.city}
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Brooklyn Search Results ({brooklynClubs.length})</h2>
          {brooklynClubs.map(club => (
            <div key={club.id} className="p-2 border-b">
              <strong>{club.name}</strong> - {club.city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}