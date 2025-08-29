"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types";
import axios from "axios";
import Spinner from "../common/Spinner";

interface Props {
  title: string;
  endpoint?: string; // optional endpoint
}

const ProductSection: React.FC<Props> = ({ title, endpoint = "/api/products/popular/" }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fisher–Yates shuffle function
  const shuffleArray = (array: Product[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}${endpoint}`);
        setProducts(shuffleArray(res.data)); // shuffle before setting
      } catch (error) {
        console.error(`Error fetching products from ${endpoint}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint]);

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
