import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Users, Navigation, Star } from 'lucide-react';
import { getRunClubById, getAllRunClubs, getRunClubImageUrl } from '@/lib/runclubs';
import StarRating from '@/components/StarRating';
import MapEmbed from '@/components/MapEmbed';
import RunClubCard from '@/components/RunClubCard';

// Enable ISR - revalidate every 6 hours
export const revalidate = 21600;

interface RunClubPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RunClubPage({ params }: RunClubPageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.id) {
    notFound();
  }
  
  const club = await getRunClubById(resolvedParams.id);

  if (!club) {
    notFound();
  }

  // Get similar clubs (same city, different club)
  const allClubs = await getAllRunClubs();
  const similarClubs = allClubs
    .filter(c => c.id !== club.id && c.city === club.city)
    .slice(0, 3);

  const imageUrl = getRunClubImageUrl(club);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/search" className="text-gray-600 hover:text-gray-900">
              Search
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {club.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/search"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={club.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {club.name}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <StarRating rating={club.rating} size="lg" />
                    <span className="text-gray-600">
                      ({club.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-start space-x-2 text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{club.full_address}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {club.category}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {club.reviews} members
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {club.description && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Club
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {club.description}
                </p>
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <MapEmbed address={club.full_address} height={400} />
              <div className="mt-4 flex justify-center">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(club.full_address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Reviews & Ratings
              </h2>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {club.rating.toFixed(1)}
                  </div>
                  <StarRating rating={club.rating} showNumber={false} />
                  <div className="text-sm text-gray-600 mt-1">
                    {club.reviews} reviews
                  </div>
                </div>
              </div>

              {/* Review Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                {club.reviews_link && (
                  <a
                    href={club.reviews_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <Star className="h-5 w-5 mr-2" />
                    View Google Reviews ({club.reviews})
                  </a>
                )}
                
                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Reviews are sourced from Google My Business
                  </p>
                  {!club.reviews_link && (
                    <p className="text-gray-500 text-sm mt-1">
                      No public reviews available for this club
                    </p>
                  )}
                </div>
              </div>

              {/* Sample Review Layout (for future expansion) */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Reviews
                </h3>
                <div className="text-center py-6 text-gray-500">
                  <p>Individual reviews coming soon!</p>
                  <p className="text-sm mt-1">
                    For now, view all reviews on Google
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {club.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <a
                      href={`tel:${club.phone}`}
                      className="text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      {club.phone}
                    </a>
                  </div>
                )}
                
                {club.email_1 && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <a
                      href={`mailto:${club.email_1}`}
                      className="text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      {club.email_1}
                    </a>
                  </div>
                )}
                
                {club.site && (
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <a
                      href={club.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Join This Club
                </button>
              </div>
            </div>

            {/* Similar Clubs */}
            {similarClubs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Similar Clubs in {club.city}
                </h3>
                <div className="space-y-4">
                  {similarClubs.map((similarClub) => (
                    <div key={similarClub.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <RunClubCard club={similarClub} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}