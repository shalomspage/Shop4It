"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import ProductFormHeader from "./ProductFormHeader";
import ProductFormFields from "./ProductFormFields";
import type { Brand, Category, ProductFormProps, ProductFormState } from "./types";

const ProductFormContainer: React.FC<ProductFormProps> = ({ productId }) => {
  const router = useRouter();

  const [form, setForm] = useState<ProductFormState>({
    title: "",
    price: "",
    description: "",
    isFeatured: false,
    clothesType: "",
    ratings: 1.0,
    categoryId: "",
    brandId: "",
    colors: "",
    sizes: "",
    imageUrl: "",
    createdAt: new Date().toISOString().slice(0, 16),
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch categories & brands
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`)
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands/`)
      .then((r) => r.json())
      .then(setBrands)
      .catch(console.error);
  }, []);

  // Fetch product data for editing
  useEffect(() => {
    if (!productId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${productId}/`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title ?? "",
          price: data.price ?? "",
          description: data.description ?? "",
          isFeatured: Boolean(data.is_featured),
          clothesType: data.clothesType ?? "",
          ratings: data.ratings ?? 1.0,
          categoryId: data.category?.id ?? "",
          brandId: data.brand?.id ?? "",
          colors: (data.colors || []).join(", "),
          sizes: (data.sizes || []).join(", "),
          imageUrl: (data.imageUrl || []).join(", "),
          createdAt: data.created_at
            ? new Date(data.created_at).toISOString().slice(0, 16)
            : new Date().toISOString().slice(0, 16),
        });
      })
      .catch(console.error);
  }, [productId]);

  const setFormState = (updater: (prev: ProductFormState) => ProductFormState) =>
    setForm((prev) => updater(prev));

  const handleCancel = () => router.back();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        title: form.title,
        price: parseFloat(String(form.price)),
        description: form.description,
        is_featured: form.isFeatured,
        clothesType: form.clothesType,
        ratings: parseFloat(String(form.ratings)),
        category: form.categoryId !== "" ? form.categoryId : null,
        brand_id: form.brandId !== "" ? form.brandId : null,
        colors: form.colors
          ? form.colors.split(",").map((c) => c.trim()).filter(Boolean)
          : [],
        sizes: form.sizes
          ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        imageUrl: form.imageUrl
          ? form.imageUrl.split(",").map((u) => u.trim()).filter(Boolean)
          : [],
        created_at: form.createdAt,
      };

      const method = productId ? "PUT" : "POST";
      const url = productId
        ? `${process.env.NEXT_PUBLIC_API_URL}/${productId}/`
        : `${process.env.NEXT_PUBLIC_API_URL}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMsg = `Failed to save product: ${res.status} ${res.statusText}`;
        try {
          const errorData = await res.json();
          console.error("Backend error:", errorData);
          errorMsg = errorData?.detail || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      setMessage({ type: "success", text: "✅ Product saved successfully!" });
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Error saving product" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen max-w-lg mx-auto bg-white p-8 m-8 rounded-lg shadow"
    >
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* <ProductFormHeader
        title={productId ? "Edit Product" : "Add New Product"}
        loading={loading}
        
      /> */}

      <ProductFormFields
        form={form}
        setForm={setFormState}
        categories={categories}
        brands={brands}
      />

      {/* Save & Cancel Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="update-item-btn disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ProductFormContainer;
