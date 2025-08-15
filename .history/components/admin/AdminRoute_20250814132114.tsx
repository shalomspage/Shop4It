"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const { initialized, isAuthenticated, user } = useSelector((s: RootState) => s.auth);

  const debugBypass = search?.get("debug") === "1"; // add ?debug=1 to URL to bypass temporarily

  useEffect(() => {
    if (debugBypass) return;
    if (!initialized) return;          // wait for rehydrateAuth
    if (!isAuthenticated) {
      router.replace("/");             // not logged in
      return;
    }
    if (!user) return;                 // still hydrating user object
    if (!user.isAdmin) {
      // avoid loops: only redirect when inside /admin
      if (pathname?.startsWith("/admin")) router.replace("/");
    }
  }, [initialized, isAuthenticated, user, pathname, router, debugBypass]);

  if (!initialized || (!debugBypass && (!isAuthenticated || !user))) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  return <>{children}</>;
}
