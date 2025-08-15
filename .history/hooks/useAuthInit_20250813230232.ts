"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setInitialized } from "@/app/features/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
   
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    (async () => {
      try {
        const res = await fetch("/api/auth/user", {
          method: "GET",
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined,
          credentials: "include", // VERY important for cookie-based auth
        });

        if (!res.ok) throw new Error("Not authenticated");

        const user = await res.json();
        dispatch(setAuth({ token, user }));
      } catch (err) {
        if (token) {
          localStorage.removeItem("authToken");
        }
        dispatch(setAuth({ token: null, user: null }));
      } finally {
        dispatch(setInitialized());
      }
    })();
  }, [dispatch]);
};
