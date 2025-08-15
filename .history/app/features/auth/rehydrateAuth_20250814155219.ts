import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuth, setInitialized } from "../authSlice";

const API_URL = process.env.NEXT_PUBLIC_HOST || "http://localhost:8000";

export const rehydrateAuth = createAsyncThunk(
  "auth/rehydrate",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("access");
    if (!token) {
      dispatch(setInitialized());
      return;
    }

    try {
      const { data: fetchedUser } = await axios.get(`${API_URL}/auth/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setAuth({ token, user: fetchedUser }));
    } catch (error) {
      console.error("Error rehydrating auth:", error);
      localStorage.removeItem("access");
    }

    dispatch(setInitialized());
  }
);
