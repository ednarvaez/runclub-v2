import Link from 'next/link';
import { MapPin, Search, Star } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import RunClubCard from '@/components/RunClubCard';
import { getFeaturedRunClubs, getAllRunClubs } from '@/lib/runclubs';
import { RunClub } from '@/types/runclub';

// Enable ISR - revalidate every 6 hours
export const revalidate = 21600;

export default async function Home() {
  let featuredClubs: RunClub[] = [];
  let allClubs: RunClub[] = [];
  
  try {
    featuredClubs = await getFeaturedRunClubs();
    allClubs = await getAllRunClubs();
    console.log(`Loaded ${allClubs.length} clubs, ${featuredClubs.length} featured`);
  } catch (error) {
    console.error('Error loading data:', error);
    // Fall back to empty arrays - homepage will still work
  }
  
  // Count clubs that would match each borough search
  const getBoroughCount = (boroughName: string) => {
    return allClubs.filter(club => {
      const cityLower = club.city.toLowerCase();
      const boroughLower = boroughName.toLowerCase();
      
      // Handle specific borough mappings
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
  
  const majorCities = [
    { 
      name: 'Manhattan', 
      count: `${getBoroughCount('Manhattan')} club${getBoroughCount('Manhattan') === 1 ? '' : 's'}`, 
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' 
    },
    { 
      name: 'Brooklyn', 
      count: `${getBoroughCount('Brooklyn')} club${getBoroughCount('Brooklyn') === 1 ? '' : 's'}`, 
      image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop' 
    },
    { 
      name: 'Queens', 
      count: `${getBoroughCount('Queens')} club${getBoroughCount('Queens') === 1 ? '' : 's'}`, 
      image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=400&h=300&fit=crop' 
    },
    { 
      name: 'Bronx', 
      count: `${getBoroughCount('Bronx')} club${getBoroughCount('Bronx') === 1 ? '' : 's'}`, 
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' 
    },
  ].filter(city => parseInt(city.count) > 0); // Only show cities with clubs

  // If no data loaded, show placeholder cities
  const displayCities = majorCities.length > 0 ? majorCities : [
    { name: 'Manhattan', count: 'Loading...', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' },
    { name: 'Brooklyn', count: 'Loading...', image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop' },
    { name: 'Queens', count: 'Loading...', image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=400&h=300&fit=crop' },
    { name: 'Bronx', count: 'Loading...', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-orange-500 block">Running Club</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover running clubs near you, connect with fellow runners, and join a community 
            that shares your passion for running.
          </p>
          
          {/* Search Bar */}
          <SearchBar className="mx-auto" />
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Local clubs near you</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>Verified reviews</span>
            </span>
            <span className="flex items-center space-x-1">
              <Search className="h-4 w-4" />
              <span>Easy to find</span>
            </span>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Running Clubs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top-rated running clubs in your area. Join thousands of runners who have 
              found their perfect training partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredClubs.map((club) => (
              <RunClubCard key={club.id} club={club} />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/search"
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              View All Clubs
              <Search className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Major Cities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Cities
            </h2>
            <p className="text-gray-600">
              Explore running clubs in major metropolitan areas
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCities.map((city) => (
              <Link
                key={city.name}
                href={`/search?location=${encodeURIComponent(city.name)}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <div 
                    className="h-32 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${city.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-4 text-white bg-black/60 rounded-md px-3 py-2 backdrop-blur-sm border border-white/20">
                    <h3 className="font-bold text-lg">{city.name}</h3>
                    <p className="text-sm font-medium opacity-90">{city.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Running?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join a community of runners today and discover the joy of group training.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-colors text-lg"
          >
            Find Clubs Near Me
            <MapPin className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}