import { Category, Product, Brand } from "@/app/types";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${API_URL}/products/categories/`);
  return res.data;
};


export const fetchBrands = async (): Promise<Brand[]> => {
  const res = await axios.get(`${API_URL}/products/brands/`);
  return res.data;
};


export const fetchProductsByCategory = async (id: string): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/products/`, {
    params: { category: id },
  });
  return res.data;
};


export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};


export const fetchPopularProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/products/popular/`);
  return res.data;
};
