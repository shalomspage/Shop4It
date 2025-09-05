'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Product } from '@/app/types'
import ProductCard from '@/components/home/ProductCard'
import { fetchPopularProducts } from '@/lib/api' // fetch all/popular products
import Spinner from '@/components/common/Spinner'

const CategoryPage = () => {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState<string>('')

  useEffect(() => {
    if (!id) return

    const loadProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchPopularProducts()

        // Filter products by category ID
        const filtered = allProducts.filter(p => p.category === Number(id))
        setProducts(filtered)

        // Set category name from first product if available
        if (filtered.length > 0) {
          setCategoryName(filtered[0].category_name || `Category ${id}`)
        } else {
          setCategoryName(`Category ${id}`)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [id])

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {categoryName || `Category ${id}`}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner lg />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found for this category</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage
