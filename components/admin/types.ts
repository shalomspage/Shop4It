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
export interface ProductFormProps {
  productId?: string;
  form: ProductFormState;
  setForm: (updater: (prev: ProductFormState) => ProductFormState) => void;
  categories: Category[];
  brands: Brand[];
  onSuccess: (msg: string) => void;
  onError: (errMsg: string) => void;
}