"use client";

import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/redux/store";

export default function AdminRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, initialized } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    // Only decide after auth is initialized
    if (!initialized) return;

    // If not logged in or not admin, bounce to home
    if (!user || !user.isAdmin) {
      console.log("AdminRoute: redirecting to / from", pathname, "user:", user);
      router.replace("/");
    }
  }, [initialized, user, router, pathname]);

  if (!initialized) return <div>Loading…</div>;
  if (!user || !user.isAdmin) return null;

  return <>{children}</>;
}
