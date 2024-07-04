export interface Product {
  id: number;
  title: string;
  category: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
}
