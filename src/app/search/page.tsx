'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Grid, List } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import RunClubCard from '@/components/RunClubCard';
import { RunClub } from '@/types/runclub';

function SearchContent() {
  const [clubs, setClubs] = useState<RunClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('rating');
  
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (location) params.set('location', location);
        if (sortBy) params.set('sortBy', sortBy);

        const response = await fetch(`/api/search?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setClubs(data.clubs || []);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, location, sortBy]);

  const handleSearch = (newQuery: string, newLocation: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    if (newLocation) params.set('location', newLocation);
    
    window.history.pushState({}, '', `/search?${params.toString()}`);
    
    // Trigger a re-fetch by updating the effect dependencies
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {query || location ? 'Search Results' : 'Find Running Clubs'}
          </h1>
          <SearchBar 
            initialQuery={query}
            initialLocation={location}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {loading ? 'Searching...' : `${clubs.length} clubs found`}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="reviews">Sort by Reviews</option>
              <option value="name">Sort by Name</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No running clubs found</div>
            <p className="text-gray-400">Try adjusting your search criteria or location</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {clubs.map((club) => (
              <RunClubCard 
                key={club.id} 
                club={club}
                className={viewMode === 'list' ? 'flex-row' : ''}
              />
            ))}
          </div>
        )}

        {/* Pagination could go here */}
        {clubs.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Showing {clubs.length} results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}