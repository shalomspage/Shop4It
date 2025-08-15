import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { setAuth, setUser, setInitialized, logout } from "../authSlice";

const API_URL = (process.env.NEXT_PUBLIC_HOST || "http://localhost:8000").replace(/\/+$/, "");

async function fetchMeWith(token: string, scheme: "Token" | "Bearer") {
  return axios.get(`${API_URL}/auth/users/me/`, {
    headers: { Authorization: `${scheme} ${token}` },
  });
}

export const rehydrateAuth = createAsyncThunk(
  "auth/rehydrate",
  async (_, { dispatch }) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      dispatch(setInitialized());
      return;
    }

    // Put token into redux so isAuthenticated = true
    dispatch(setAuth({ token }));

    try {
      // Try Token first (Djoser TokenAuth), then Bearer (JWT)
      let res;
      try {
        res = await fetchMeWith(token, "Token");
      } catch (e) {
        const err = e as AxiosError;
        if (!err.response || err.response.status >= 500) throw e;
        res = await fetchMeWith(token, "Bearer");
      }

      const raw = res.data || {};
      const userWithAdmin = {
        ...raw,
        // normalize different backends
        isAdmin:
          raw.isAdmin ??
          raw.is_admin ??
          raw.is_staff ??
          raw.is_superuser ??
          false,
      };

      dispatch(setUser(userWithAdmin));
    } catch (e) {
      console.error("[rehydrateAuth] failed:", e);
      dispatch(logout());
    } finally {
      dispatch(setInitialized());
    }
  }
);
