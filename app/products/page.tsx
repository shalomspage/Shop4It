"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Product } from "@/app/types";
import ProductCard from "@/components/home/ProductCard";
import Spinner from "@/components/common/Spinner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Product[]>(process.env.NEXT_PUBLIC_API_URL || "");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner lg /> 
        </div>
      ) : products.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
