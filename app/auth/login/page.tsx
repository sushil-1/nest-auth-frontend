'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../api/auth';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const response = await login({
        username,
        password,
      });
      router.push('/auth/profile');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form 
        onSubmit={handleSubmit}
        className="border-2 rounded-md p-6 space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="font-medium">Username:</label>
          <input
            placeholder="enter username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="font-medium">Password:</label>
          <input
            placeholder="enter password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-3 py-2"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center">
          <button 
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-1.5 hover:bg-blue-600"
          >
            Login
          </button>
        </div>
        <p className="text-center">
          <Link href="/auth/reset-password">
            <em className="text-blue-700">forgot password?</em>
          </Link>
        </p>
      </form>
    </div>
  );
}
