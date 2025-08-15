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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_B}/auth/users/me/`, {
          headers: {
            Authorization: `Token ${token}`, // Djoser uses Token <token>
          },
        });

        if (!res.ok) throw new Error("Invalid token");

        const userData = await res.json();

        // Map backend field to frontend
        const user = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          isAdmin: userData.is_staff || false,
        };

        dispatch(setAuth({ token, user }));
      } catch (err) {
        console.error("Auth init error:", err);
        // Only remove token if explicitly invalid
        if (err instanceof Error && err.message.includes("Invalid token")) {
          localStorage.removeItem("authToken");
        }
      } finally {
        dispatch(setInitialized());
      }
    })();
  }, [dispatch]);
};
