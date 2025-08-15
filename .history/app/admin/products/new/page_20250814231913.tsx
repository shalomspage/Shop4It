"use client";

import { ProductFormContainer } from "@/components/ProductForm";


export default function NewProductPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
      <ProductFormContainer />
    </div>
  );
}
