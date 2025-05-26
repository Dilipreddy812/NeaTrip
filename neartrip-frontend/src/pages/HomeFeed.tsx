// src/pages/HomeFeed.tsx
import { useEffect, useState } from 'react';
import type { Place } from '@/types/place';

const API_BASE_URL = 'https://neatrip.onrender.com';

export default function HomeFeed() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('All');

  const categories = ['All', 'Hiking', 'Dining', 'Museums', 'Parks', 'Shopping'];

  const filteredPlaces = selectedCategory && selectedCategory !== 'All'
    ? places.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase())
    : places;

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/places`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPlaces(data);
      } catch (err: any) {
        console.error('Fetch failed:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    // Overall page container with a light background
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      {/* Centered content column with max-width for PC */}
      <div className="max-w-2xl mx-auto px-4"> {/* You can try max-w-xl, max-w-2xl, or max-w-3xl */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">
          Nearby Places
        </h1>

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-150 ease-in-out ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300' // Slightly darker gray for non-selected
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feed */}
        {filteredPlaces.length > 0 ? (
          <div className="flex flex-col gap-6 md:gap-8"> {/* Slightly larger gap on desktop */}
            {filteredPlaces.map((place) => (
              <div key={place.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {place.image_url && (
                  <img
                    src={place.image_url}
                    alt={place.name}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[480px] object-cover" // Responsive height!
                  />
                )}
                <div className="p-4 md:p-6"> {/* More padding on larger cards */}
                  <h2 className="text-xl md:text-2xl font-semibold mb-1">{place.name}</h2>
                  <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
                    {place.category || 'Uncategorized'}
                  </p>
                  {place.description && (
                    <p className="text-base text-gray-700 line-clamp-3 md:line-clamp-4"> {/* Allow more lines on desktop */}
                      {place.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8 py-10 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">No places found for "{selectedCategory}"</h3>
            <p>Try selecting a different category or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}