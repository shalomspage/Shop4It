"use client";

import { useAppSelector } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "./common/Spinner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, initialized } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/auth/login"); // redirect only when check is complete
    }
  }, [initialized, isAuthenticated, router]);

  if (!initialized) {
    // prevent flash by showing spinner until auth state is known
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner lg />
      </div>
    );
  }

  if (!isAuthenticated) {
   return <div className="min-h-screen" />;
  }

  return <>
  {children}
  
  </>;
}
