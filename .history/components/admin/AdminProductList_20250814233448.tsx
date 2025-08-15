"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../uiComponentes/Button";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string[];
}

const baseUrl = "http://localhost:8000";

const AdminProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/products/`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      console.log("Raw products data:", JSON.stringify(data, null, 2));
      console.log("Products from backend:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };
     
const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}/`, {
      method: "DELETE",
      credentials: "include",
    });
    console.log("Delete response status:", res.status);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Delete failed:", errorText);
      throw new Error("Failed to delete product");
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


  if (loading) {
    return <p className="min-h-screen max-w-4xl mx-auto p-6">Loading...</p>;
  }

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={() => router.push("/admin/products/new")}>Add New Product</Button>
        </div>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button className="nav-btn" onClick={() => router.push("/admin/products/new")}>Add New Product</Button>
      </div>

      <ul className="space-y-4">
        {products.map(({ id, title, price, imageUrl }) => {

  const image = imageUrl && imageUrl.length > 0 ? imageUrl[0] : null;

  return (
    <li key={id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 gap-4">
      <div className="flex items-center gap-4">
        {image ? (
          <div className="w-20 h-20 relative flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded"
              
              unoptimized
            />
          </div>
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded text-gray-500 text-sm">
            No Image
          </div>
        )}

        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button className="nav-btn" onClick={() => router.push(`/admin/products/${id}/edit`)}>Edit</Button>
        <Button className="nav-btn-delete" onClick={() => handleDelete(id)}>Delete</Button>
      </div>
    </li>
  );
})}

      </ul>
    </div>
  );
};

export default AdminProductList;
