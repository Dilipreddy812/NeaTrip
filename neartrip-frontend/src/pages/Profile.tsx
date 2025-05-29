import { useAuth } from '../context/AuthContext'; // Adjusted import path

export default function Profile() {
  const { user, signOut, loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4 text-red-500">Not logged in</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Profile</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={signOut}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}
