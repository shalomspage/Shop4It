"use client";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();

  // Typed selector
  const { user, initialized } = useSelector((state: RootState) => state.auth);

  // Wait until auth is initialized
  if (!initialized) return null;

  // Redirect if not admin
  if (!user || !user.isAdmin) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}
