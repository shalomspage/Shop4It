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

  // Redirect effect
  useEffect(() => {
    if (initialized && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [initialized, user, router]);

  // Wait until auth is initialized or redirect
  if (!initialized || !user?.isAdmin) return null;

  return <>{children}</>;
}
