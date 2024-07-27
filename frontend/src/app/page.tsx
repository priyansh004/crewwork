'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

const Home: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
      router.push('/taskboard');
    
  }, [currentUser, router]);

  // Render nothing; redirection happens in useEffect
  return null;
};

export default Home;
