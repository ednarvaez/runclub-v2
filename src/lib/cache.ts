interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class InMemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const timeToLive = ttl || this.defaultTTL;
    
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + timeToLive,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new InMemoryCache();

// Cache keys
export const CACHE_KEYS = {
  ALL_RUNCLUBS: 'all_runclubs',
  SEARCH_RESULTS: (query: string, location: string) => `search_${query}_${location}`,
  RUNCLUB_BY_ID: (id: string) => `runclub_${id}`,
} as const;

// Cleanup expired cache entries every 10 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 10 * 60 * 1000);
}