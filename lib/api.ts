import { Category, Product } from "@/app/types";
import axios from "axios";

// Use environment variable for base URL
const API_URL = process.env.NEXT_PUBLIC_HOST!; // must include `/api` in production env

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${API_URL}/products/categories/`, { withCredentials: true });
  return res.data;
};

export const fetchProductsByCategory = async (slug: string): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/products/`, {
    params: { category: slug },
    withCredentials: true,
  });
  return res.data;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}/`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
export const fetchPopularProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/products/popular/`, { withCredentials: true });
  return res.data;
};

