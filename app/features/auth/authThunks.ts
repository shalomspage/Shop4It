import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAuth, setUser } from '../authSlice'

const API_URL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000'

// Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { username, password }: { username: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/token/login/`, {
        username,
        password,
      })

      const { auth_token } = response.data

      // Save token in Redux
      dispatch(setAuth({ token: auth_token }))

      // Fetch user profile
      const userResponse = await axios.get(`${API_URL}/auth/users/me/`, {
        headers: { Authorization: `Token ${auth_token}` },
      })

      dispatch(setUser(userResponse.data))
      return userResponse.data
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data || 'Login failed')
      }
      return rejectWithValue('Login failed')
    }
  }
)
