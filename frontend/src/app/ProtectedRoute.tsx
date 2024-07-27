"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust import path as needed

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // Optionally, return a loader or null while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
