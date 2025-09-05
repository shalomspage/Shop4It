
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/redux/store';
import { rehydrateAuth } from '@/app/features/auth/rehydrateAuth';

export const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);
};
