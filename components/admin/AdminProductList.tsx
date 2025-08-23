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
      const res = await fetch(`${baseUrl}/api/products/`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
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
    return (
      <div className="flex flex-col min-h-[200px] gap-4 text-center items-center justify-center">
        <Spinner lg />
        <p>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Products</h3>
          <Button onClick={() => router.push("/admin/products/new")}>Add New Product</Button>
        </div>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Products</h3>
        <Button className="nav-btn text-sm" onClick={() => router.push("/admin/products/new")}>Add New Product</Button>
      </div>

      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-gray-500 border-b ">
          <tr>
            <th className="pb-2">Image</th>
            <th className="pb-2">Title</th>
            <th className="pb-2">Price</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, title, price, imageUrl }) => {
            const image = imageUrl && imageUrl.length > 0 ? imageUrl[0] : null;

            return (
              <tr key={id} className="border-b last:border-none">
                <td className="py-2">
                  {image ? (
                    <div className="w-16 h-16 relative">
                      <Image src={image} alt={title} fill className="object-cover rounded" unoptimized />
                    </div>
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-gray-500 text-xs">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-2">{title}</td>
                <td className="py-2">${price.toFixed(2)}</td>
                <td className="py-2 flex gap-2">
                  <Button className="nav-btn text-sm" onClick={() => router.push(`/admin/products/${id}/edit`)}>
                    Edit
                  </Button>
                  <Button className="nav-btn-delete text-sm" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;




