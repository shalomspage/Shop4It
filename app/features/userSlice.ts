import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

interface UserState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("access") || localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/auth/users/me/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user profile");
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error fetching user";
      });
  },
});

export const { clearUser } = userSlice.actions;

// 👇 THIS fixes the error in store.ts
export default userSlice.reducer;
