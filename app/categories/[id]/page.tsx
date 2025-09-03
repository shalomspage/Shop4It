// remove "use client";
import ProductCard from "@/components/home/ProductCard";
import { fetchProductsByCategory } from "@/lib/api";

interface CategoryPageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { id: categoryId } = params;
  const products = await fetchProductsByCategory(categoryId);

  return (
    <div className="main-max-width mx-auto padding-x py-9 min-h-screen">
      <p className="font-semibold text-center text-xl capitalize">{categoryId}</p>
      <div className="flex-center flex-wrap my-6 gap-4 min-h-[120px] items-center">
        {products.length > 0 ? (
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
