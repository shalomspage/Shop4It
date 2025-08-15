'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { rehydrateAuth } from './features/auth/rehydrateAuth';
import { useAppDispatch } from './hooks';
import { store } from '@/redux/store';
;

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
