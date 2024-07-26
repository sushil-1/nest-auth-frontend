'use client';

import withAuth from "../withAuth";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProfile, logout } from '../../api/auth';

function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({ username: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1>Profile</h1>
      <div>
        Welcome {profile?.username}
      </div>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white rounded-md px-4 py-1.5 hover:bg-red-600 absolute top-2 right-2 md:top-6 md:right-6"
      >
        Logout
      </button>
    </div>
  );
}

export default withAuth(ProfilePage);
