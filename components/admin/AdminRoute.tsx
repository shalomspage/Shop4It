'use client';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/redux/store';
import { isAdminUser } from '../utils/authHelpers';
import Spinner from '../common/Spinner';


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

  if (!initialized) return <div className="flex flex-col min-h-screen max-w-2xl gap-8 mx-auto p-6 text-center items-center justify-center">
    <Spinner lg />
    <p>Loading details...</p>
  </div>;

  return <>{children}</>;
}
