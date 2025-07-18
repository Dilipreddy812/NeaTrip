// src/pages/HomeFeed.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PostCard from '@/components/posts/PostCard';

// Define the Post type according to your new API response
interface Post {
  id: string;
  created_at: string;
  caption: string;
  image_url: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  places: {
    name: string;
    location_short: string;
  };
}

export default function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feed?page=${page}&limit=10`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPosts(prevPosts => [...prevPosts, ...data]);
      } catch (err: any) {
        console.error('Fetch failed:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  if (loading && page === 1) return <div className="p-6 text-center">Loading feed...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Home Feed
          </h1>
          {!session && (
            <button
              onClick={() => navigate('/login')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Login
            </button>
          )}
        </div>

        {posts.length > 0 ? (
          <div className="flex flex-col gap-6 md:gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8 py-10 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p>Be the first to check in and share your experience!</p>
          </div>
        )}

        {/* Simple pagination button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </div>
    </div>
  );
}