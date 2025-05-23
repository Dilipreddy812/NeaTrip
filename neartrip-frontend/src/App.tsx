// src/App.tsx
import { useEffect, useState } from "react";
import type { Place } from "./types/place"; // Import the interface
 // Import the interface

// IMPORTANT: Replace this with your actual Render API URL
const API_BASE_URL = "https://neatrip.onrender.com"; // Example: https://neartrip-api-xyz.onrender.com

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/places`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlaces(data);
      } catch (e: any) {
        console.error("Failed to fetch places:", e);
        setError(e.message || "Failed to load places.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading amazing places...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (places.length === 0) {
    return <div className="p-6 text-center">No places found. Stay tuned!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* We'll create and use PlacesFeedPage component here later */}
      <header className="bg-white shadow py-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">NearTrip Places</h1>
      </header>
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-xl mx-auto">
          {/* This will be replaced by individual PlaceCard components */}
          {places.map((place) => (
            <div key={place.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {place.image_url && (
                <img
                  src={place.image_url}
                  alt={place.name}
                  className="w-full h-64 object-cover" // Instagram-like image display
                />
              )}
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{place.name}</h2>
                <p className="text-gray-700 text-sm mb-3">{place.description}</p>

                {place.pre_visiting_info && (
                  <div className="mb-3">
                    <h3 className="font-semibold text-md text-gray-800">Before you go:</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{place.pre_visiting_info}</p>
                  </div>
                )}
                {place.post_visiting_info && (
                  <div className="mb-3">
                    <h3 className="font-semibold text-md text-gray-800">After your visit:</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{place.post_visiting_info}</p>
                  </div>
                )}
                {place.best_time_to_visit && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Best time to visit: {place.best_time_to_visit}
                  </p>
                )}
                {place.location_short && (
                     <p className="text-xs text-gray-500 mt-1">
                         Location: {place.location_short}
                     </p>
                )}
                 {place.tags && place.tags.length > 0 && (
                     <div className="mt-3">
                         {place.tags.map(tag => (
                             <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                                 #{tag}
                             </span>
                         ))}
                     </div>
                 )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;