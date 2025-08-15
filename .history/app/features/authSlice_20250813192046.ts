import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  username: string
  email: string
  isAdmin?: boolean;
}

export interface AuthState {
  token: string | null
  isAuthenticated: boolean
  user: User | null
  initialized: boolean
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  initialized: false,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        token: string
        user?: User
      }>
    ) => {
      state.token = action.payload.token
      state.isAuthenticated = true

      // Persist token
      localStorage.setItem('authToken', action.payload.token)

      if (action.payload.user) {
        state.user = action.payload.user
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.user = null

      // Remove persisted token
      localStorage.removeItem('authToken')
    },
    setInitialized: (state) => {
      state.initialized = true
    },
  },
})

export const { setAuth, setUser, logout, setInitialized } = authSlice.actions
export default authSlice.reducer
