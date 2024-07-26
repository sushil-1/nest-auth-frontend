'use client';

import { useState } from 'react';
import { forgotPassword, resetPassword } from '@/app/api/auth';
import Link from 'next/link';

export default function ResetPass() {
  const [username, setUsername] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);

  const handleUsernameSubmit = async (event :any) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await forgotPassword(username);
     // console.log('forgot pass res : ', response);
      if(response.result) {
        setResetToken(response.result);
        setIsUsernameSubmitted(true);
        setSuccess('Username accepted. Please enter your new password.');
      } else {
        setError("Username doesn't exist");
      }
    } catch (error) {
      setError('Username not found. Please try again.');
    }
  };

  const handlePasswordSubmit = async (event: any) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await resetPassword({
        resetToken,
        newPassword
      });
    //  console.log('reset pass res : ', response);
      setSuccess('Password reset successful.');
    } catch (error) {
      setError('Password reset failed. Please try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
      {!isUsernameSubmitted ? (
        <form onSubmit={handleUsernameSubmit} className="border-2 rounded-md p-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="username" className="font-medium">Username:</label>
            <input
              placeholder='Enter username'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md px-3 py-2"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className='flex justify-center'>
            <button 
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-1.5 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="border-2 rounded-md p-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="font-medium">New Password:</label>
            <input
              placeholder='Enter new password'
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-3 py-2"
              required
              minLength={6}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="font-medium">Confirm Password:</label>
            <input
              placeholder='Confirm new password'
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md px-3 py-2"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className='flex justify-center'>
            <button 
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-1.5 hover:bg-blue-600"
            >
              Reset Password
            </button>
          </div>
          <div className='text-center text-blue-500'>
            <Link href={'/auth/login'}>
            <em>Want to Login?</em>
            </Link>
          </div>
        </form>
        
      )}
    </div>
  );
}
