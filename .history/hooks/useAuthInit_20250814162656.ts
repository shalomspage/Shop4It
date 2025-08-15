// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setAuth, setInitialized } from "@/app/features/authSlice";
// import { AppDispatch } from "@/redux/store";

// export const useAuthInit = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     const token =
//       typeof window !== "undefined"
//         ? localStorage.getItem("authToken")
//         : null;

//     (async () => {
//       if (!token) {
//         dispatch(setInitialized());
//         return;
//       }

//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/users/me/`, {
//           method: "GET",
//           headers: {
//             Authorization: `Token ${token}`, // Correct format for Djoser
//           },
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error("Invalid token");

//         const user = await res.json();
//         dispatch(setAuth({ token, user }));
//       } catch (err) {
//         console.error("Auth init error:", err);
//         localStorage.removeItem("authToken");
//       } finally {
//         dispatch(setInitialized()); // Only mark initialized after fetch attempt finishes
//       }
//     })();
//   }, [dispatch]);
// };

// hooks/useAuthInit.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/redux/store';
import { rehydrateAuth } from '@/app/features/auth/rehydrateAuth';

export const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);
};
