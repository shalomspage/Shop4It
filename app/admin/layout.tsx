"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AdminRoute from "@/components/admin/AdminRoute";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg flex flex-col transition-all duration-300 
          w-20 md:w-64 items-center md:items-start p-4">
          <nav className="flex flex-col space-y-3 w-full">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 justify-center md:justify-start",
                  pathname === href ? "bg-gray-200 font-semibold" : ""
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:block">{label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminRoute>
  );
}
