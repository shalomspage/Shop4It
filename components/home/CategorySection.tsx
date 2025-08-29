"use client";

import React, { useEffect, useState } from "react";
import { Category } from "@/app/types";
import axios from "axios";
import Spinner from "../common/Spinner";
import CategoryCard from "./CategoryCard"; // your existing component

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array: Category[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/products/categories/`);
        setCategories(shuffleArray(res.data));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        Categories
      </h2>

      <div className="flex justify-center flex-wrap gap-6 min-h-[120px] items-center">
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
  );
};

export default CategorySection;
