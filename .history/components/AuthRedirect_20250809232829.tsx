"use client";


import { useAppSelector } from "@/app/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRedirect() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      isAuthenticated &&
      (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))
    ) {
      router.push("/");
    }
  }, [isAuthenticated, pathname, router]);

  return null; 
}
