"use client";

import React, { useEffect, useState } from "react";
import { Banknote, Package, ShoppingCart, Users } from "lucide-react";

type StatCard = {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<StatCard[]>([
    { label: "Products", value: 0, icon: Package, color: "bg-blue-100" },
    { label: "Orders", value: 0, icon: ShoppingCart, color: "bg-green-100" },
    { label: "Users", value: 0, icon: Users, color: "bg-yellow-100" },
    { label: "Transactions", value: 0, icon: Banknote, color: "bg-rose-100" },
  ]);

  useEffect(() => {
    // Fetch real stats later
  }, []);

  return (
   
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <div className={`p-3 rounded-full ${color} text-white`}>
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
