"use client";

import DashboardStats from "@/components/admin/DashboardStats";
import RecentOrders from "@/components/admin/RecentOrders";
import RecentUsers from "@/components/admin/RecentUsers";
import SalesOverview from "@/components/sales-overview/page";

export default function AdminPage() {
  return (
    <div className="max-w-7xl min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <DashboardStats />
      <RecentOrders />
      <RecentUsers />
      <section className="bg-white rounded-lg shadow p-6 mt-8">
        <SalesOverview />
      </section>
    </div>
  );
}
