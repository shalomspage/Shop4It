"use client";

import { ProductFormContainer } from "@/components/ProductForm";

i
export default function NewProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
      <ProductFormContainer />
    </div>
  );
}
