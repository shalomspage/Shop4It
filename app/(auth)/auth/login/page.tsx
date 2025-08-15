'use client';

import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/features/auth/authThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await dispatch(loginUser({ username, password })).unwrap();
      console.log("Login success:", result);
      router.push('/'); 
    } catch (err: unknown) {
  if (
    typeof err === "object" &&
    err !== null &&
    "detail" in err &&
    typeof (err).detail === "string"
  ) {
    setError((err as { detail: string }).detail);
  } else {
    setError("Login failed");
  }
}
  };

  if (isAuthenticated) {
    
    return <p className="min-h-screen text-center mt-20">Redirecting...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 p-2"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 nav-btn disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-green-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
