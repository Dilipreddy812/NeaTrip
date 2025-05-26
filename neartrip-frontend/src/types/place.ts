// src/types/place.ts
export interface Place {
  id: string;
  created_at: string;
  name: string;
  image_url: string | null;
  description: string | null;
  pre_visiting_info: string | null;
  post_visiting_info: string | null;
  best_time_to_visit: string | null;
  location_short: string | null;
  category: string | null;
  tags: string[] | null;
  priority: number | null;
  // Add any other fields you expect from the backend
}