'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  onSearch?: (query: string, location: string) => void;
  className?: string;
}

export default function SearchBar({ 
  initialQuery = '', 
  initialLocation = '', 
  onSearch,
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query, location);
    } else {
      // Navigate to search page with parameters
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (location) params.set('location', location);
      
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-4xl ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for running clubs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="City, zip code, or address..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-0 sm:border-l border-gray-200 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors flex items-center justify-center space-x-2 min-w-[120px]"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}