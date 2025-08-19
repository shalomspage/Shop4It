import { Product } from "@/app/types";
import ProductCard from "@/components/home/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_HOST || "http://localhost:8000";

function deslugify(slug: string) {
  return slug.replace(/-/g, " ");
}


type CategoryPageProps = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { id } = params;
  const categoryTitle = deslugify(id);

  // Fetch products for this category
  const res = await fetch(
    `${API_URL}/api/products/?category=${encodeURIComponent(categoryTitle)}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const products: Product[] = await res.json();

  return (
    <div className="main-max-width mx-auto padding-x py-9 min-h-screen">
      <p className="font-semibold text-center text-xl capitalize">{categoryTitle}</p>

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
