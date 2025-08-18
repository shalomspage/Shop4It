'use client';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/redux/store';
import { isAdminUser } from '../utils/authHelpers';


interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();
  const { user, initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (initialized && !isAdminUser(user)) {
      console.log('AdminRoute -> redirecting to / because not admin');
      router.push('/');
    }
  }, [user, initialized, router]);

  if (!initialized) return <div className='min-h-screen'>Loading...</div>;

  return <>{children}</>;
}
