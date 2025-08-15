"use client";

import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();
  const { user, initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!initialized) return; // Wait until auth check is complete
    if (!user) return; // Wait until user data is loaded

    if (!user.isAdmin) {
      router.push("/"); // Redirect non-admins to home
    }
  }, [initialized, user, router]);

  if (!initialized || !user) {
    return <div>Loading...</div>; // Prevent flicker while loading
  }

  return <>{children}</>;
}
