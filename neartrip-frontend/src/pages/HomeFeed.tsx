import { useEffect, useState } from 'react';
import type { Place } from '@/types/place'; // Make sure this type exists

const API_BASE_URL = 'https://neatrip.onrender.com';

export default function HomeFeed() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Nearby</h1>

      {/* Category Filter (static for now) */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        {['Hiking', 'Dining', 'Museums', 'Parks', 'Shopping'].map((cat) => (
          <button
            key={cat}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Feed */}
      <div className="grid grid-cols-2 gap-4">
        {places.map((place) => (
          <div key={place.id} className="rounded-lg overflow-hidden shadow bg-white">
            {place.image_url && (
              <img
                src={place.image_url}
                alt={place.name}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-2">
              <h2 className="font-medium text-md truncate">{place.name}</h2>
              <p className="text-sm text-gray-500">{place.category || '—'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
