import Link from 'next/link';
import { MapPin, Users, Star, Search } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About RunClub Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting runners with their perfect training community since 2025.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            RunClub Directory was created to help runners find their perfect training community. 
            Whether you&apos;re a beginner looking to start your running journey or an experienced 
            marathoner seeking like-minded training partners, we make it easy to discover 
            running clubs in your area.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe that running is better together. Our platform connects runners with 
            local clubs, making it simple to find groups that match your pace, goals, and schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Search className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Easy Discovery
              </h3>
            </div>
            <p className="text-gray-600">
              Search for running clubs by location, name, or type. Our intuitive 
              search makes finding the right club effortless.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Star className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Verified Reviews
              </h3>
            </div>
            <p className="text-gray-600">
              Read authentic reviews from fellow runners to help you choose 
              the perfect club for your running goals.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Local Focus
              </h3>
            </div>
            <p className="text-gray-600">
              Find clubs near you with detailed location information and 
              easy-to-use maps for every listing.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Community Driven
              </h3>
            </div>
            <p className="text-gray-600">
              Built by runners, for runners. We understand what makes a 
              great running community and help you find yours.
            </p>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Find Your Running Community?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of runners who have found their perfect training partners 
            through RunClub Directory.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            <Search className="mr-2 h-4 w-4" />
            Find Clubs Near You
          </Link>
        </div>
      </div>
    </div>
  );
}