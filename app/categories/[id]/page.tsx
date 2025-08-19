import { Product } from "@/app/types";
import ProductCard from "@/components/home/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_HOST || "http://localhost:8000";

function deslugify(slug: string) {
  return slug.replace(/-/g, " ");
}

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const categoryTitle = deslugify(id);
  const res = await fetch(
    `${API_URL}/api/products/?category=${encodeURIComponent(categoryTitle)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: Product[] = await res.json();
  return (
    <div className="main-max-width mx-auto padding-x py-9 min-h-screen">
      <p className="font-semibold text-center text-xl capitalize">
        {categoryTitle}
      </p>
      <div className="flex-center flex-wrap my-6 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
