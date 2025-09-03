"use client";
import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import ProductCard from "@/components/home/ProductCard";
import { fetchProductsByCategory } from "@/lib/api";
import Spinner from "@/components/common/Spinner";


interface CategoryPageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { id: categoryId } = params;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsByCategory(categoryId);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [categoryId]);

  return (
    <div className="main-max-width mx-auto padding-x py-9 min-h-screen">
      <p className="font-semibold text-center text-xl capitalize">{categoryId}</p>
      <div className="flex-center flex-wrap my-6 gap-4 min-h-[120px] items-center">
        {loading ? (
          <Spinner lg />
        ) : products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
      {searchParams && (
        <div className="mt-6">
          <h2 className="font-semibold">Search Parameters:</h2>
          <pre>{JSON.stringify(searchParams, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}