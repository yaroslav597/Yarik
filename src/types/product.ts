export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  imageUrl: string;
  images?: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  isSale?: boolean;
  specifications?: {
    [key: string]: string | number;
  };
  relatedProducts?: number[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  subcategories?: { id: string; name: string }[];
}