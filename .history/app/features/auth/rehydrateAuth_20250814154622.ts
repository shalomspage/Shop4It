import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuth, setUser, setInitialized } from '../authSlice';

const API_URL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000';

export const rehydrateAuth = createAsyncThunk(
  'auth/rehydrate',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Save token in redux
        dispatch(setAuth({ token }));

        // Fetch user profile
        const userResponse = await axios.get(`${API_URL}/auth/users/me/`, {
          headers: { Authorization: `Token ${token}` },
        });

        // TEMPORARY: force isAdmin true for testing
        // const user = { ...userResponse.data, isAdmin: true };
        // dispatch(setUser(user));
      } catch (error) {
        console.error('Token invalid, clearing localStorage');
        localStorage.removeItem('authToken');
      }
    }
    dispatch(setInitialized()); // mark app ready
  }
);
