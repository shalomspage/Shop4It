import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuth, setInitialized } from '../authSlice';

const API_URL = process.env.NEXT_PUBLIC_HOST || 'http://127.0.0.1:8000';

export const rehydrateAuth = createAsyncThunk(
  'auth/rehydrate',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('authToken');
    console.log('rehydrateAuth -> token from localStorage:', token);

    if (token) {
      try {
        dispatch(setAuth({ token }));

        const userResponse = await axios.get(`${API_URL}/auth/users/me/`, {
          headers: { Authorization: `Token ${token}` },
        });

        const user = userResponse.data;
        console.log('rehydrateAuth -> fetched user:', user);

        dispatch(setAuth({ token, user }));
      } catch (error) {
        console.error('rehydrateAuth -> token invalid, clearing localStorage', error);
        localStorage.removeItem('authToken');
      }
    }

    dispatch(setInitialized());
    console.log('rehydrateAuth -> initialized set to true');
  }
);
