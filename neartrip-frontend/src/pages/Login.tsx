import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjusted import path

export default function Login() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    await signInWithEmail(email);
    setMessage('Check your email for the magic login link!');
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        type="email"
        className="border px-4 py-2 w-full"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Magic Link
      </button>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
