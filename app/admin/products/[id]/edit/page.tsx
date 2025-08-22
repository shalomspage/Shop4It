"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import type { ProductFormState, Category, Brand } from "@/components/ProductForm/types";
import { ProductFormFields } from "@/components/ProductForm";
import Spinner from "@/components/common/Spinner";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<ProductFormState | null>(null);
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

  // Fetch product data
  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Product not found: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title ?? "",
          price: data.price ?? 0,
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
  }, [id]);

  const setFormState = (updater: (prev: ProductFormState) => ProductFormState) =>
    setForm((prev) => (prev ? updater(prev) : prev));

  const handleCancel = () => router.back();

  // Build payload safely
  const buildPayload = (form: ProductFormState) => {
    if (!form.categoryId) throw new Error("Category is required");
    if (!form.brandId) throw new Error("Brand is required");

    return {
      title: form.title || "",
      price: form.price ? parseFloat(String(form.price)) : 0,
      description: form.description || "",
      is_featured: !!form.isFeatured,
      clothesType: form.clothesType || "",
      ratings: form.ratings ? parseFloat(String(form.ratings)) : 1.0,
      category: Number(form.categoryId),
      brand: Number(form.brandId),
      colors: form.colors
        ? form.colors.split(",").map((c) => c.trim()).filter(Boolean)
        : [],
      sizes: form.sizes
        ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      image_url: form.imageUrl
        ? form.imageUrl.split(",").map((u) => u.trim()).filter(Boolean)
        : [],
      created_at: form.createdAt || new Date().toISOString(),
    };
  };

  const handleSave = async () => {
    if (!form) return;

    setLoading(true);
    setMessage(null);

    try {
      const payload = buildPayload(form);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Backend error:", errorData);
        const errorText = errorData?.detail || `Failed to save product: ${res.status}`;
        setMessage({ type: "error", text: errorText });
        return;
      }

      setMessage({ type: "success", text: "✅ Product saved successfully!" });
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "❌ Error saving product";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Disable save if category or brand is missing
  const isFormValid = form?.categoryId && form?.brandId;

  if (!form)
    return (
      <div className="flex flex-col min-h-screen max-w-2xl gap-8 mx-auto p-6 text-center items-center justify-center">
        <Spinner lg />
        <p>Loading product details...</p>
      </div>
    );

  return (
    <div className="max-w-7xl min-h-screen pl-4 md:pl-8 lg:pl-20 bg-white p-8 m-8 rounded-lg shadow">
      <h1 className="flex text-2xl font-semibold mb-8">Edit Product</h1>

      <ProductFormFields form={form} setForm={setFormState} categories={categories} brands={brands} />

      {/* Inline validation hints */}
      {!form?.categoryId && <p className="text-red-600 text-sm mt-1">Category is required</p>}
      {!form?.brandId && <p className="text-red-600 text-sm mt-1">Brand is required</p>}

      {message && (
        <div
          className={`mt-4 text-center py-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading || !isFormValid}
          className="update-item-btn disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
