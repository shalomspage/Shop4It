"use client";

import React from "react";


import AdminProductList from "@/components/admin/AdminProductList";


export default function AdminPage() {
  return (
    <div className="w-full min-h-screen mx-auto ">
      {/* Products Management */}
      <section>
        <AdminProductList />
      </section>

    
    </div>
  );
}
