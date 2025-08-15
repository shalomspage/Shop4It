export interface Category {
  id: number;
  title: string;
}

export interface Brand {
  id: number;
  title: string;
}

export interface ProductFormProps {
  productId?: string;
}

export interface ProductFormState {
  title: string;
  price: number | string;
  description: string;
  isFeatured: boolean;
  clothesType: string;
  ratings: number | string;
  categoryId: number | "";
  brandId: number | "";
  colors: string; 
  sizes: string; 
  imageUrl: string; 
  createdAt: string; 
}

export interface Option<T extends string | number = string | number> {
  value: T;
  label: string;
}
