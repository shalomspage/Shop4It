"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../uiComponentes/Button";
import Spinner from "../common/Spinner";

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
      const res = await fetch(`${baseUrl}/api/products/`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-[300px] items-center justify-center gap-4">
        <Spinner lg />
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Button className="nav-btn text-sm" onClick={() => router.push("/admin/products/new")}>Add New Product</Button>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ id, title, price, imageUrl }) => {
            const image = imageUrl && imageUrl.length > 0 ? imageUrl[0] : null;
            return (
              <div
                key={id}
                className="border rounded-lg shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Image */}
                {image ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover rounded-t-lg"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-t-lg">
                    No Image
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-lg truncate">{title}</h3>
                  <p className="text-gray-500 mb-4">${price.toFixed(2)}</p>

                  <div className="flex gap-2">
                    <Button
                      className="nav-btn text-sm flex-1"
                      onClick={() => router.push(`/admin/products/${id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="nav-btn-delete text-sm flex-1"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
