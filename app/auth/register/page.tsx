'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '../../api/auth';

export default function RegistrationPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await register({
        username,
        password,
      });
      setSuccess('Registration successful. You can now log in.');
      router.push('/auth/profile');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="border-2 rounded-md p-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="font-medium">Email:</label>
          <input
            placeholder='enter email'
            type="email"
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
            placeholder='enter password'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-3 py-2"
            required
            minLength={6}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className='flex justify-center'>
          <button 
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-1.5 hover:bg-blue-600"
          >
            Register
          </button>
        </div>
        <div className='text-center'>
          <Link href={'/auth/login'}>
           <em className='text-blue-600'>
            Already Registered?
           </em>
          </Link>
        </div>
      </form>
    </div>
  );
}
