"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface AdminRouteProps {
  children: ReactNode;
  redirectPath?: string; // optional, defaults to "/"
}

export default function AdminRoute({
  children,
  redirectPath = "/",
}: AdminRouteProps) {
  const router = useRouter();
  const { user, initialized } = useSelector((state: RootState) => state.auth);
  const [allowRender, setAllowRender] = useState(false);

  useEffect(() => {
    if (!initialized) return; // wait for auth to initialize

    if (!user || !user.isAdmin) {
      router.replace(redirectPath); // safe redirect without flicker
    } else {
      setAllowRender(true);
    }
  }, [user, initialized, router, redirectPath]);

  if (!initialized || !allowRender) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ); // show loading until auth status is ready
  }

  return <>{children}</>;
}
