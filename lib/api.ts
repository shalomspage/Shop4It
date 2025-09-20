import { Category, Product, Brand } from "@/app/types";
import axios, { AxiosResponse } from "axios";



const API_URL = process.env.NEXT_PUBLIC_API_URL;


// // Debug logging
// axios.interceptors.request.use((config) => {
//   console.log("➡️ API Request:", config.method?.toUpperCase(), config.url);
//   return config;
// });

// axios.interceptors.response.use(
//   (response) => {
//     console.log("✅ API Response:", response.status, response.config.url);
//     return response;
//   },
//   (error) => {
//     console.error(
//       "❌ API Error:",
//       error.response?.status,
//       error.config?.url
//     );
//     return Promise.reject(error);
//   }
// );

// =======================
// Categories & Brands
// =======================
export const fetchCategories = async (): Promise<Category[]> => {
  const res: AxiosResponse<Category[]> = await axios.get(
    `${API_URL}/products/categories/`
  );
  return res.data;
};

export const fetchBrands = async (): Promise<Brand[]> => {
  const res: AxiosResponse<Brand[]> = await axios.get(
    `${API_URL}/products/brands/`
  );
  return res.data;
};

// =======================
// Products
// =======================
export const fetchPopularProducts = async (): Promise<Product[]> => {
  const res: AxiosResponse<Product[]> = await axios.get(
    `${API_URL}/products/popular/`
  );
  return res.data;
};

export const fetchProductsByCategory = async (
  id: string
): Promise<Product[]> => {
  const res: AxiosResponse<Product[]> = await axios.get(
    `${API_URL}/products/category/`,
    { params: { category: id } }
  );
  return res.data;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res: AxiosResponse<Product> = await axios.get(
      `${API_URL}/products/${id}/`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// =======================
// CRUD (Create, Update, Delete)
// =======================

// Create product
export const createProduct = async (data: Partial<Product>): Promise<Product> => {
  const res: AxiosResponse<Product> = await axios.post(
    `${API_URL}/products/`,
    data
  );
  return res.data;
};

// Update product
export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  const res: AxiosResponse<Product> = await axios.put(
    `${API_URL}/products/${id}/`,
    data
  );
  return res.data;
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}/`);
};
