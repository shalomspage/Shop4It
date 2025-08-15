"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setInitialized } from "@/app/features/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      dispatch(setInitialized());
      return;
    }

    (async () => {
      try {
        const AUTH_BASE =
          process.env.NEXT_PUBLIC_AUTH_URL ||
          `${process.env.NEXT_PUBLIC_HOST}/auth`;

        // Djoser “me” endpoint
        const res = await fetch(`${AUTH_BASE}/users/me/`, {
          method: "GET",
          headers: { Authorization: `Token ${token}` }, // Djoser default
        });

        if (!res.ok) {
          throw new Error(`Auth me failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Map Django fields to what your app expects
        const user = {
          id: String(data.id),
          username: data.username,
          email: data.email,
          // treat staff or superuser as admin
          isAdmin: Boolean(data.is_staff || data.is_superuser),
        };

        dispatch(setAuth({ token, user }));
      } catch (err) {
        console.error("Auth init error:", err);
        localStorage.removeItem("authToken");
      } finally {
        dispatch(setInitialized());
      }
    })();
  }, [dispatch]);
};
