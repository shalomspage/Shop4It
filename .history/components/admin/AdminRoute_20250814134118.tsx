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
    if (!initialized) return; // wait for auth to rehydrate

    // small delay to avoid redirect firing before store updates
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user?.isAdmin) {
        router.replace("/"); // redirect non-admins
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timer); // cleanup
  }, [initialized, isAuthenticated, user, router]);

  if (!initialized) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  if (isAuthenticated && user?.isAdmin) {
    return <>{children}</>;
  }

  // show nothing while redirecting
  return null;
}
