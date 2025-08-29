export interface Category {
  id: number;
  title: string;
  imageUrl?: string | null;
}

export type Product = {
  id: string;                  
  title: string;
  price: number;
  imageUrl: string[];
  description: string;
  ratings: number;
  clothesType: string;
  colors: string[];            
  sizes: string[];             
  in_stock: boolean;
  is_featured: boolean;
  slug: string;
  category: number | string;
};
export interface Brand {
  id: number | string;
  name: string;
}


export type DynamicPageProps<T extends Record<string, string>> = {
  params: T | Promise<T>; // Can be a resolved object or a Promise
  searchParams?: Record<string, string | string[] | undefined>;
};