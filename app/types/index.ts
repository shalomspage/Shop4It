export interface Category {
  id: number;
  title: string;
  imageUrl?: string | null;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string[];
  description: string;
  ratings: number;
  in_stock: boolean;
  is_featured: boolean;
  clothesType: string;
  slug: string;
  category: number | string;
};


export type DynamicPageProps<T extends Record<string, string>> = {
  params: T;
  searchParams?: Record<string, string | string[] | undefined>;
};
