"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types";
import { fetchPopularProducts } from "@/lib/api";
import Spinner from "../common/Spinner";

interface Props {
  title: string;
  endpoint?: string;
}

const ProductSection: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array: Product[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularProducts();
        setProducts(shuffleArray(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">{title}</h2>

      <div className="flex justify-center flex-wrap gap-8 min-h-[120px] items-center">
        {loading ? (
          <Spinner md />
        ) : products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-gray-500">No products available</p>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
