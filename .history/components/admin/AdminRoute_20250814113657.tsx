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
    if (!initialized) return; // wait until auth init is done

    if (!user) return; // wait until user is loaded

    if (!user.isAdmin) {
      router.push("/"); // redirect non-admins
    }
  }, [initialized, user, router]);

  if (!initialized || !user) {
    return <div>Loading...</div>; // prevent flicker until user loads
  }

  return <>{children}</>;
}
