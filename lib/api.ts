import { Category, Product, Brand } from "@/app/types";
import axios from "axios";

// Dynamically set API URL based on environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://ecommerce-django-backend-1.onrender.com/api" // your Render backend URL
    : "http://localhost:8000/api";           // local dev

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${API_URL}/products/categories/`, { withCredentials: true });
  return res.data;
};

export const fetchBrands = async (): Promise<Brand[]> => {
  const res = await axios.get(`${API_URL}/products/brands/`);
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

