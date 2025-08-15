// redux/features/auth/rehydrateAuth.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuth, setInitialized } from '../authSlice';

const API_URL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000';

export const rehydrateAuth = createAsyncThunk(
  'auth/rehydrate',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        // Fetch user profile
        const res = await axios.get(`${API_URL}/auth/users/me/`, {
          headers: { Authorization: `Token ${token}` },
        });

        const fetchedUser = res.data;
        // temporarily force isAdmin for testing
        const user = { ...fetchedUser, isAdmin: true };
        dispatch(setAuth({ token, user }));

      } catch (error) {
        console.error('Token invalid, clearing localStorage', error);
        localStorage.removeItem('authToken');
      }
    }

    dispatch(setInitialized()); // mark app ready
  }
);
