'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Product } from '@/app/types'

import axios from 'axios'
import ProductCard from '@/components/home/ProductCard'

const CategoryPage = () => {
  const { id } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products/')
        setProducts(res.data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (id && products.length) {
      const filtered = products.filter(
        (product) => product.category === Number(id)
      )
      setFilteredProducts(filtered)
    }
  }, [id, products])

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Category Products</h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found for this category</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage
