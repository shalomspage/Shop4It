"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface AdminRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export default function AdminRoute({
  children,
  redirectPath = "/",
}: AdminRouteProps) {
  const router = useRouter();
  const { user, initialized } = useSelector((state: RootState) => state.auth);
  const [allowRender, setAllowRender] = useState(false);

  // Debug logs
  console.log("AdminRoute -> user:", user);
  console.log("AdminRoute -> initialized:", initialized);

  useEffect(() => {
    console.log("AdminRoute useEffect fired");

    if (!initialized) return;

    if (!user || !user.isAdmin) {
      console.log("AdminRoute -> redirecting to", redirectPath);
      router.replace(redirectPath);
    } else {
      console.log("AdminRoute -> user is admin, allow render");
      setAllowRender(true);
    }
  }, [user, initialized, router, redirectPath]);

  if (!initialized || !allowRender) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
