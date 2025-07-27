export interface RunClub {
  id: string;
  name: string;
  site?: string;
  category: string;
  phone?: string;
  full_address: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews: number;
  photo?: string;
  description?: string;
  email_1?: string;
}

export interface SearchFilters {
  location?: string;
  category?: string;
  rating?: number;
  sortBy?: 'rating' | 'reviews' | 'name' | 'distance';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  clubs: RunClub[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface Review {
  id: string;
  runClubId: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}