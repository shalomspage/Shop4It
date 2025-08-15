"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { initialized, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    console.log("AdminRoute -> initialized:", initialized);
    console.log("AdminRoute -> isAuthenticated:", isAuthenticated);
    console.log("AdminRoute -> user:", user);

    if (!initialized) return; // wait for auth to rehydrate

    const timer = setTimeout(() => {
      if (!isAuthenticated || !user?.isAdmin) {
        console.log("AdminRoute -> redirecting to / because not admin");
        router.replace("/"); // redirect non-admins
      }
    }, 100); // small delay

    return () => clearTimeout(timer);
  }, [initialized, isAuthenticated, user, router]);

  if (!initialized) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  if (isAuthenticated && user?.isAdmin) {
    return <>{children}</>;
  }

  return null;
}
