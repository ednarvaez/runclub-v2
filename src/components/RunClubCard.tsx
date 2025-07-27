import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Phone, Users } from 'lucide-react';
import { RunClub } from '@/types/runclub';
import { getRunClubImageUrl } from '@/lib/runclubs';

interface RunClubCardProps {
  club: RunClub;
  className?: string;
}

export default function RunClubCard({ club, className = '' }: RunClubCardProps) {
  const imageUrl = getRunClubImageUrl(club);

  return (
    <Link href={`/runclub/${club.id}`}>
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={club.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">
              {(club.rating && club.rating > 0) ? club.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {club.name}
          </h3>
          
          {/* Location */}
          <div className="flex items-start space-x-2 text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm line-clamp-2">{club.full_address}</span>
          </div>

          {/* Category & Reviews */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {club.category}
            </span>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{(club.reviews && club.reviews > 0) ? club.reviews : 0} reviews</span>
            </div>
          </div>

          {/* Description */}
          {club.description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {club.description}
            </p>
          )}

          {/* Contact Info */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {club.phone && (
              <div className="flex items-center space-x-1 text-gray-500">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{club.phone}</span>
              </div>
            )}
            <span className="text-orange-500 font-medium text-sm">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}