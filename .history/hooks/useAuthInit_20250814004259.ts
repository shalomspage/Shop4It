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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`, // Djoser token auth
          },
        });

        if (!res.ok) throw new Error("Invalid token");

        const data = await res.json();

        // Map backend field (e.g., is_staff) to isAdmin
        const user = {
          id: data.id,
          username: data.username,
          email: data.email,
          isAdmin: data.is_staff || false, // <-- ensure isAdmin exists
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
