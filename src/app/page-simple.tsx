import Link from 'next/link';
import { MapPin, Search, Star } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

export default function SimpleHome() {
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

      {/* Status Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            Having issues? Check our <Link href="/api/health" className="text-blue-500 hover:underline">system status</Link> or visit the <Link href="/search" className="text-blue-500 hover:underline">search page</Link> directly.
          </p>
        </div>
      </section>
    </div>
  );
}