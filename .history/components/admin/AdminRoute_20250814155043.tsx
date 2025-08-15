"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { initialized, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("AdminRoute -> initialized:", initialized);
    console.log("AdminRoute -> isAuthenticated:", isAuthenticated);
    console.log("AdminRoute -> user:", user);

    if (initialized && (!isAuthenticated || !user?.isAdmin)) {
      router.push("/");
    }
  }, [initialized, isAuthenticated, user, router]);

  if (!initialized) return null;

  return <>{children}</>;
}
