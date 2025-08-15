"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      // Redirect non-admin users to login or homepage
      router.replace("/auth/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.isAdmin) {
    return null; // Don't render content while redirecting
  }

  return <>{children}</>;
};

export default AdminRoute;
