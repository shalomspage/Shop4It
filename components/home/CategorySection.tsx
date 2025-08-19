'use client'

import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import { Category } from '@/app/types'
import axios from 'axios'
import Spinner from '../common/Spinner'

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/api/products/categories/`
        )
        setCategories(res.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <section className="main-max-width padding-x mx-auto">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        Browse By Category
      </h2>

      <div className="flex justify-center flex-wrap gap-8 min-h-[120px] items-center">
        {loading ? (
          <Spinner md />
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <p className="text-gray-500">No categories available</p>
        )}
      </div>
    </section>
  )
}

export default CategorySection
