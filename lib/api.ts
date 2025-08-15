import { Category, Product } from "@/app/types";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_HOST || "http://localhost:8000";

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${API_URL}/categories/`);
  return res.data;
};

export const fetchProductsByCategory = async (slug: string): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/category/`, {
    params: { category: slug },
  });
  return res.data;
};

export async function getProductById(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/products/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

