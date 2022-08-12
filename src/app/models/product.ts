export interface Product {
  createdAt?: string;
  name: string;
  code: string;
  category: string;
  brand?: string;
  type?: string;
  price?: number;
  description?: string;
  readonly id: string | number;
}
