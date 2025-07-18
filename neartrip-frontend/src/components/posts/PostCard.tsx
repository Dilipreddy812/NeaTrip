import React from 'react';

// Define the types for the props
interface PostCardProps {
  post: {
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
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center p-4">
        <img
          src={post.profiles.avatar_url || '/default-avatar.png'}
          alt={post.profiles.username}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">{post.profiles.username}</p>
          <p className="text-sm text-gray-500">{post.places.name}</p>
        </div>
      </div>
      <img
        src={post.image_url}
        alt={post.caption}
        className="w-full h-auto"
      />
      <div className="p-4">
        <p>
          <span className="font-semibold">{post.profiles.username}</span>{' '}
          {post.caption}
        </p>
        <div className="flex justify-between mt-4">
          <button className="text-blue-500">Like</button>
          <button className="text-blue-500">Comment</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
