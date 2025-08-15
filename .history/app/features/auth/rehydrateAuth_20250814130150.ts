import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuth, setUser, setInitialized, logout } from '../authSlice';

const API_URL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000';

export const rehydrateAuth = createAsyncThunk(
  'auth/rehydrate',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      dispatch(setInitialized());
      return;
    }

    try {
      // Save token in redux
      dispatch(setAuth({ token }));

      // Fetch user profile
      const { data: userData } = await axios.get(`${API_URL}/auth/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      });

      // Ensure isAdmin exists
      const userWithAdmin = {
        ...userData,
        isAdmin: userData.isAdmin ?? userData.is_staff ?? false,
      };

      dispatch(setUser(userWithAdmin));
    } catch (error) {
      console.error('Invalid or expired token — logging out');
      dispatch(logout());
    } finally {
      // Only mark initialized after fetch attempt
      dispatch(setInitialized());
    }
  }
);
