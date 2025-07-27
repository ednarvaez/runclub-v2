import { RunClub } from '@/types/runclub';
import { cache, CACHE_KEYS } from './cache';

// Fallback data for development when Google Sheets is not available
const fallbackRunClubs: RunClub[] = [
  {
    id: 'fallback-1',
    name: 'Central Park Running Club',
    category: 'Athletic club',
    phone: '(555) 123-4567',
    full_address: '1234 Central Park West, New York, NY 10025',
    city: 'New York',
    postal_code: '10025',
    latitude: 40.7829,
    longitude: -73.9654,
    rating: 4.5,
    reviews: 123,
    description: 'Join us for regular runs around Central Park with runners of all levels.',
    email_1: 'info@cprunning.com',
  },
  {
    id: 'fallback-2',
    name: 'Brooklyn Bridge Runners',
    category: 'Athletic club',
    phone: '(555) 987-6543',
    full_address: '567 Brooklyn Heights Promenade, Brooklyn, NY 11201',
    city: 'Brooklyn',
    postal_code: '11201',
    latitude: 40.6962,
    longitude: -73.9969,
    rating: 4.2,
    reviews: 87,
    description: 'Experience the thrill of running across the iconic Brooklyn Bridge.',
    email_1: 'contact@bbrunners.org',
  },
];

// Load data from fallback JSON file
async function loadFallbackData(): Promise<RunClub[]> {
  try {
    const fallbackData = await import('../../data/runclubs-fallback.json');
    return fallbackData.default;
  } catch (error) {
    console.error('Error loading fallback data:', error);
    return fallbackRunClubs;
  }
}

export async function getAllRunClubs(): Promise<RunClub[]> {
  // Check cache first
  const cached = cache.get<RunClub[]>(CACHE_KEYS.ALL_RUNCLUBS);
  if (cached) {
    return cached;
  }

  try {
    // Try Google Sheets first (server-side only)
    if (typeof window === 'undefined') {
      try {
        const { fetchRunClubsFromSheets } = await import('./googleSheets');
        const clubs = await fetchRunClubsFromSheets();
        if (clubs.length > 0) {
          cache.set(CACHE_KEYS.ALL_RUNCLUBS, clubs, 10 * 60 * 1000); // 10 minutes
          return clubs;
        }
      } catch (sheetsError) {
        console.log('Google Sheets not available, using fallback data:', 
          sheetsError instanceof Error ? sheetsError.message : 'Unknown error');
      }
    }

    // Fall back to local data
    const clubs = await loadFallbackData();
    cache.set(CACHE_KEYS.ALL_RUNCLUBS, clubs, 2 * 60 * 1000); // Shorter cache for fallback
    return clubs;
  } catch (error) {
    console.error('Error loading club data:', error);
    return fallbackRunClubs;
  }
}

export async function getRunClubById(id: string): Promise<RunClub | null> {
  // Check cache first
  const cached = cache.get<RunClub>(CACHE_KEYS.RUNCLUB_BY_ID(id));
  if (cached) {
    return cached;
  }

  try {
    const clubs = await getAllRunClubs();
    const club = clubs.find(c => c.id === id) || null;
    
    if (club) {
      cache.set(CACHE_KEYS.RUNCLUB_BY_ID(id), club);
    }
    
    return club;
  } catch (error) {
    console.error('Error fetching run club by ID:', error);
    return null;
  }
}

export async function searchRunClubs(query: string = '', location: string = ''): Promise<RunClub[]> {
  const cacheKey = CACHE_KEYS.SEARCH_RESULTS(query, location);
  
  // Check cache first
  const cached = cache.get<RunClub[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // Try Google Sheets search first (server-side only)
    if (typeof window === 'undefined') {
      try {
        const { searchRunClubs: sheetsSearch } = await import('./googleSheets');
        const results = await sheetsSearch(query, location);
        if (results.length > 0 || (!query && !location)) { // Accept empty results for valid searches
          cache.set(cacheKey, results, 5 * 60 * 1000); // 5 minutes for search results
          return results;
        }
      } catch (sheetsError) {
        console.log('Google Sheets search not available, using local search:', 
          sheetsError instanceof Error ? sheetsError.message : 'Unknown error');
      }
    }

    // Fall back to local search
    const allClubs = await getAllRunClubs();
    const filtered = allClubs.filter(club => {
      const matchesQuery = !query || 
        club.name.toLowerCase().includes(query.toLowerCase()) ||
        club.description?.toLowerCase().includes(query.toLowerCase()) ||
        club.category.toLowerCase().includes(query.toLowerCase());
      
      const matchesLocation = !location ||
        club.city.toLowerCase().includes(location.toLowerCase()) ||
        club.postal_code.toLowerCase().includes(location.toLowerCase()) ||
        club.full_address.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(club.city.toLowerCase());
      
      return matchesQuery && matchesLocation;
    });
    
    cache.set(cacheKey, filtered, 2 * 60 * 1000); // Shorter cache for fallback
    return filtered;
  } catch (error) {
    console.error('Error searching run clubs:', error);
    return [];
  }
}

export async function getFeaturedRunClubs(): Promise<RunClub[]> {
  const clubs = await getAllRunClubs();
  
  // Return top-rated clubs with at least 5 reviews, or clubs with ratings > 4
  return clubs
    .filter(club => club.reviews >= 5 || club.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
}

export function getRunClubImageUrl(club: RunClub): string {
  // Check if club.photo is a valid URL
  if (club.photo) {
    try {
      new URL(club.photo);
      return club.photo; // Valid URL
    } catch {
      // Invalid URL, fall through to fallback images
    }
  }

  // Fallback to curated running images based on club ID
  const fallbackImages = [
    'https://images.unsplash.com/photo-1544913938-d00ddaf2e19b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461731449317-d19e139fb625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502904550040-7534597429ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566027964239-ede2e76370e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  // Use consistent image for same club
  const index = club.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbackImages.length;
  return fallbackImages[index];
}