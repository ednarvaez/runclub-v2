'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface MapEmbedProps {
  address: string;
  className?: string;
  height?: number;
}

export default function MapEmbed({ 
  address, 
  className = '',
  height = 300 
}: MapEmbedProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
          console.log('Google Maps API key not found, using fallback embed');
          setMapError('API key not configured');
          setIsLoading(false);
          return;
        }

        // Load Google Maps API
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          
          script.onload = () => initializeMap();
          script.onerror = () => {
            setMapError('Failed to load Google Maps');
            setIsLoading(false);
          };
          
          document.head.appendChild(script);
        } else {
          initializeMap();
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setMapError('Failed to initialize map');
        setIsLoading(false);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        // Create geocoder to convert address to coordinates
        const geocoder = new window.google.maps.Geocoder();
        
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            
            // Create map
            const map = new window.google.maps.Map(mapRef.current!, {
              center: location,
              zoom: 15,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              zoomControl: true,
            });

            // Add marker
            new window.google.maps.Marker({
              position: location,
              map: map,
              title: address,
            });

            setIsLoading(false);
          } else {
            console.error('Geocoding failed:', status);
            setMapError('Location not found');
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to create map');
        setIsLoading(false);
      }
    };

    loadGoogleMaps();
  }, [address]);

  // Fallback to basic embed if API fails
  if (mapError) {
    const encodedAddress = encodeURIComponent(address);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    // Use API key for embed if available, otherwise show error message
    if (apiKey) {
      const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&zoom=15`;

      return (
        <div className={`relative ${className}`}>
          <iframe
            src={mapUrl}
            width="100%"
            height={height}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title={`Map showing location of ${address}`}
          />
          
          {/* Fallback notice */}
          <div className="absolute top-2 right-2 bg-blue-100 border border-blue-300 rounded px-2 py-1 text-xs text-blue-800">
            Static embed (enable Maps JavaScript API for interactive)
          </div>
        </div>
      );
    } else {
      return (
        <div className={`relative ${className} bg-gray-100 rounded-lg flex items-center justify-center`} style={{ height }}>
          <div className="text-center p-4">
            <div className="text-gray-600 mb-2">📍</div>
            <p className="text-sm text-gray-700 font-medium">{address}</p>
            <p className="text-xs text-gray-500 mt-2">Interactive map requires API key configuration</p>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-500 hover:text-blue-700 text-xs underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      );
    }
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="bg-gray-100 rounded-lg flex items-center justify-center"
          style={{ height }}
        >
          <div className="text-gray-600 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-sm">Loading interactive map...</p>
          </div>
        </div>
      )}
      
      <div
        ref={mapRef}
        className={`rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        style={{ height }}
      />
    </div>
  );
}