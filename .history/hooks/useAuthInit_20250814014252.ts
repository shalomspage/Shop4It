"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setInitialized } from "@/app/features/authSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      console.log("useAuthInit -> token:", token); // log the token

    if (!token) {
      dispatch(setInitialized());
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/users/me/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`, // Djoser expects 'Token <token>'
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Invalid token");
         console.log("useAuthInit -> response status:", res.status);
        const user = await res.json();
        console.log("useAuthInit -> user data:", user);
        // user now includes isAdmin from serializer
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
