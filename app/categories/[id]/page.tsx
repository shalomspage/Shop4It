import { Product } from "@/app/types";
import ProductCard from "@/components/home/ProductCard";
import { fetchProductsByCategory } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { id: categoryId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  // Fetch products using the API helper
  const products: Product[] = await fetchProductsByCategory(categoryId);

  return (
    <div className="main-max-width mx-auto padding-x py-9 min-h-screen">
      <p className="font-semibold text-center text-xl capitalize">{categoryId}</p>
      {resolvedSearchParams && (
        <pre>{JSON.stringify(resolvedSearchParams, null, 2)}</pre>
      )}

      <div className="flex-center flex-wrap my-6 gap-4">
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
