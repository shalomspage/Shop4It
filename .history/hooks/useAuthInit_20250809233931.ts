"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setInitialized } from "@/app/features/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      dispatch(setInitialized());
      return;
    }

    (async () => {
      try {
        // Replace with your real user endpoint
        const res = await fetch("/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Invalid token");

        const user = await res.json();
        dispatch(setAuth({ token, user }));
      } catch (err) {
        // token invalid -> remove and continue as unauthenticated
        localStorage.removeItem("authToken");
      } finally {
        // ALWAYS mark initialized so pages stop waiting
        dispatch(setInitialized());
      }
    })();
  }, [dispatch]);
};
