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
    if (initialized && (!user || !user.isAdmin)) {
      router.push(""); // redirect non-admins
    }
  }, [user, initialized, router]);

  if (!initialized || !user || !user.isAdmin) {
  return <div>Loading...</div>;
}

  return <>{children}</>;
}
