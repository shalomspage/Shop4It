import ProductCard from '@/components/home/ProductCard';
import Link from 'next/link';
import { Product } from '@/app/types';

type Category = {
  id: number;
  title: string;
};
const API_URL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000';

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/products/categories/`, {
    cache: 'no-store', 
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  return res.json();
}

async function fetchPopularProductsByCategory(categoryId: number): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products/popular/?category=${categoryId}`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  return res.json();
}

async function fetchTopPopularProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products/popular/`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function CategoryListPage() {
  const categories = await fetchCategories();
  const topPopularProducts = await fetchTopPopularProducts();

  const categoriesWithPopularProducts = await Promise.all(
    categories.map(async (category) => {
      const popularProducts = await fetchPopularProductsByCategory(category.id);
      return { ...category, popularProducts };
    })
  );

  return (
    <div className="min-h-screen main-max-width padding-x mx-auto py-10 space-y-14">
      {/* Categories Section */}
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Browse Categories</h1>

        {categoriesWithPopularProducts.map((category) => (
          <div key={category.id} className="mb-10">
            <Link href={`/products/category/${category.id}`}>
              <h2 className="text-xl font-semibold mb-4 hover:underline">{category.title}</h2>
            </Link>

            {category.popularProducts.length === 0 ? (
              <p className="text-gray-500">No popular products.</p>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 justify-center">
                {category.popularProducts.map((product) => (
                    <div key={product.id} className="w-full">
                        <ProductCard product={product} />
                    </div>
                    ))}

              </div>
            )}
          </div>
        ))}
      </div>

      {/* Popular Products Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Popular Products</h2>

        {topPopularProducts.length === 0 ? (
          <p className="text-center text-gray-500">No popular products available.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 justify-center">
            {topPopularProducts.map((product) => (
               <div key={product.id} className="w-full">
                      <ProductCard product={product} />
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
