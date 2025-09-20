"use client";

import { useParams } from "next/navigation";
import ProductFormContainer from "@/components/ProductForm/ProductFormContainer";

export default function EditProductPage() {
  const { id } = useParams();

  return (
    <section className="w-full min-h-screen mx-auto space-y-10">
      <ProductFormContainer productId={id as string} />
    </section>
  );
}
