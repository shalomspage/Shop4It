"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { fetchPopularProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import Spinner from "../common/Spinner";
import axios from "axios";

interface Props {
  title: string;
  endpoint?: string;
  categoryId?: string | number;
  excludeId?: string | number;
  limit?: number;     
  random?: boolean;   
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductSection({
  title,
  endpoint,
  categoryId,
  excludeId,
  limit,
  random,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let data: Product[] = [];

        if (endpoint) {
          const res = await axios.get(`${API_URL}${endpoint}`);
          data = res.data;
        } else {
          data = await fetchPopularProducts();
        }

        // 1) Filter by categoryId & excludeId if provided
        if (categoryId !== undefined || excludeId !== undefined) {
          data = data.filter((p) => {
            const matchesCategory =
              categoryId !== undefined ? String(p.category) === String(categoryId) : true;
            const notExcluded = excludeId !== undefined ? String(p.id) !== String(excludeId) : true;
            return matchesCategory && notExcluded;
          });
        }

        // 2) Apply explicit limit/random if provided (priority)
        if (typeof limit === "number") {
          if (random) {
            data = shuffleArray(data).slice(0, limit);
          } else {
            data = data.slice(0, limit);
          }
        } else {
          // 3) Backwards-compatible title-based fallback
          const lowerTitle = title.toLowerCase();
          if (lowerTitle.includes("featured")) {
            data = shuffleArray(data).slice(0, 4);
          } else if (lowerTitle.includes("popular")) {
            data = data.slice(0, 8);
          }
        }

        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [endpoint, title, categoryId, excludeId, limit, random]);

  // Simple Fisher-Yates-ish shuffle (good enough for UI)
  const shuffleArray = (arr: Product[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Spinner md />
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;
  if (products.length === 0)
    return <p className="flex items-center justify-center min-h-[500px]">No products found.</p>;

  return (
    <section className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">{title}</h2>

      <div className="flex justify-center flex-wrap gap-8 items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
