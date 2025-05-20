import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data, error } = await supabase.from("places").select("*");
      if (error) {
        console.error("Error fetching places:", error);
      } else if (data) {
        setPlaces(data);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Places</h1>
      {places.length === 0 && <p>No places found or still loading...</p>}
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {places.map((place) => (
          <li key={place.id} className="border rounded p-4 shadow">
            {place.image_url && <img src={place.image_url} alt={place.name} className="mb-2 w-full h-40 object-cover rounded" />}
            <h2 className="text-lg font-semibold">{place.name}</h2>
            <p className="text-sm text-gray-700">{place.description}</p>
            <p className="text-xs mt-2 italic">Best time: {place.best_time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;