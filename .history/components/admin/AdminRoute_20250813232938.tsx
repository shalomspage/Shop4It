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
    if (!initialized) return; // Wait until auth state is loaded

    if (!user || !user.isAdmin) {
      // Redirect non-admins to homepage
      router.push("/");
    }
  }, [user, initialized, router]);

  if (!initialized || !user || !user.isAdmin) {
    // Optionally, show a loading spinner while checking
    return <div className="p-6">Checking permissions...</div>;
  }

  return <>{children}</>;
}
