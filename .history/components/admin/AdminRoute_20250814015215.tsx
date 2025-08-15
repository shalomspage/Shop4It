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
    console.log("AdminRoute useEffect fired");
    console.log("AdminRoute -> user:", user);
    console.log("AdminRoute -> initialized:", initialized);

    if (initialized && (!user || !user.isAdmin)) {
      console.log("AdminRoute -> redirecting to /");
      router.push(""); // redirect non-admins
    }
  }, [user, initialized, router]);

  if (!initialized) {
    return <div>Loading...</div>; // prevent flicker
  }

  return <>{children}</>;
}
