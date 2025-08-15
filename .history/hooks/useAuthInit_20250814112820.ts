"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setInitialized } from "@/app/features/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    console.log("useAuthInit -> token:", token);

    (async () => {
      if (!token) {
        dispatch(setInitialized());
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/users/me/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`, // Correct format
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Invalid token");

        const user = await res.json();
        console.log("useAuthInit -> user data:", user);

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
