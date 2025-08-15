"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks";


export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { initialized, isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!initialized) return; // Wait for auth rehydration

    if (!isAuthenticated || !user?.isAdmin) {
      router.replace("/"); // Redirect non-admins
    }
  }, [initialized, isAuthenticated, user, router]);

  // Show loading until initialized
  if (!initialized) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  // Only show children if user is authenticated and is admin
  if (isAuthenticated && user?.isAdmin) {
    return <>{children}</>;
  }

  // Otherwise show nothing while redirecting
  return null;
}
