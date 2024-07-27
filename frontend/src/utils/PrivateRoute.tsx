"use clinet"
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { useAppSelector } from '@/redux/hooks';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
const {currentUser} = useAppSelector((state) => state.user);
const {error , loading} = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <p>Loading...</p>; // or a loading spinner
  }

  return currentUser ? <>{children}</> : null;
};

export default PrivateRoute;
