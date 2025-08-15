"use client";

import React from "react";

// import ProductForm from "@/components/admin/ProductForm";
import AdminProductList from "@/components/admin/AdminProductList";
// import PaymentForm from "@/components/admin/PaymentForm"; // uncomment if you have this

export default function AdminPage() {
  return (
    <div className="w-full min-h-screen max-w-6xl mx-auto p-6 space-y-10 px-16">
      

      {/* Products Management */}
      <section>
        <h2 className="text-2xl font-semibold p-8 mb-4">Manage Products</h2>
        <AdminProductList />
      </section>

      {/* Product Add/Edit Form */}
      {/* <section>
        <h2 className="text-2xl font-semibold mb-4">Add / Edit Product</h2>
        <ProductForm />
      </section> */}

      {/* Uncomment when ready */}
      {/* <section>
        <h2 className="text-2xl font-semibold mb-4">Payments</h2>
        <PaymentForm />
      </section> */}
    </div>
  );
}
