'use client';

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/app/features/auth/logoutThunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { usePathname } from "next/navigation";
import CartIcon from "../cart/CartIcon";

interface Props {
  mobile?: boolean;
}

const NavItems = ({ mobile }: Props) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-6",
        mobile ? "flex-col" : "flex-row"
      )}
    >
      {!isAuthenticated && pathname === "/auth/login" && (
        <Link href="/auth/register" className="nav-btn">
          Signup
        </Link>
      )}

      {!isAuthenticated && pathname === "/auth/register" && (
        <Link href="/auth/login" className="nav-btn">
          Login
        </Link>
      )}

      {!isAuthenticated &&
        pathname !== "/auth/login" &&
        pathname !== "/auth/register" && (
          <>
            <Link href="/auth/login" className="nav-btn">
              Login
            </Link>
            <Link href="/auth/register" className="nav-btn">
              Signup
            </Link>
          </>
        )}

      {isAuthenticated && (
        <>
          {/* Profile Avatar */}
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-black shadow-md flex items-center justify-center bg-gray-200">
            {user?.username?.[0]?.toUpperCase() ?? "?"}
          </div>

          {/* Profile link */}
          <Link
            href="/profile"
            className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
          >
            {user?.username || "Profile"}
          </Link>

          {/* Admin link (only if user is admin) */}
          {user?.isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "nav-btn",
                mobile ? "w-full text-center" : ""
              )}
            >
              Admin
            </Link>
          )}

          {/* Logout button */}
          <button
            className="nav-btn"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </button>
        </>
      )}

      {/* Cart: show if logged in OR if on homepage */}
      <CartIcon />
    </div>
  );
};

export default NavItems;
