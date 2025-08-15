"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setInitialized } from "@/app/features/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken")
        : null;

    (async () => {
      if (!token) {
        dispatch(setInitialized());
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/users/me/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`, // Djoser expects this format
          },
        });

        if (!res.ok) throw new Error("Invalid token");

        const user = await res.json();
        dispatch(setAuth({ token, user }));
      } catch (err) {
        console.error("Auth init error:", err);
        localStorage.removeItem("authToken");
      } finally {
        // IMPORTANT: only set initialized after fetch attempt finishes
        dispatch(setInitialized());
      }
    })();
  }, [dispatch]);
};
