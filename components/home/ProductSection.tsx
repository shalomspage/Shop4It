'use client'

import React, { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { Product } from "@/app/types"
import axios from "axios"

interface Props {
  title: string
  endpoint?: string   
}

const ProductSection: React.FC<Props> = ({ title, endpoint }) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/products/popular/`);

        setProducts(res.data)
      } catch (error) {
        console.error(`Error fetching products from ${endpoint}:`, error)
      }
    }
    fetchProducts()
  }, [endpoint])

  return (
    <section className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title}
      </h2>

      <div className="flex-center flex-wrap gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">No products available</p>
        )}
      </div>
    </section>
  )
}

export default ProductSection
