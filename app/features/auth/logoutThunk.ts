import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../authSlice';
import { RootState } from '@/redux/store';
 // <-- adjust to your store path

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000'}/auth/token/logout/`,
          {},
          { headers: { Authorization: `Token ${token}` } }
        );
      } catch (error) {
        // Optional: log error but continue logout locally
        console.error('Error during logout:', error);
      }
    }

    // Always clear local Redux state (even if API fails)
    dispatch(logout());
    localStorage.removeItem('authToken'); // optional persistence cleanup
  }
);
