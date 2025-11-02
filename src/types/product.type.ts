export interface Product {
  _id: string;
  title: string;
  description: string;
  badge?: string;
  basePrice: number;
  compareAtPrice?: number;
  attributes?: Record<string, string> | unknown;
  status?: "active" | "draft";
  isTaxable?: boolean;
  shippingRequired?: boolean;
  weight?: number;
  featureImage: string;
  tags?: string[];
  collections?: string[];
  images?: Array<{ url: string; alt?: string; _id?: string }>;
  dimensions?: {
    l?: number;
    w?: number;
    h?: number;
  };
  rating?: {
    average?: number;
    count?: number;
  };
  variants?: Array<{
    _id?: string;
    title?: string;
    price?: number;
    sku?: string;
    options?: { [key: string]: string };
    compareAtPrice?: number;
    barcode?: string;
    image?: string;
    stock?: number;
    isActive?: boolean;
    [key: string]: unknown;
  }>;
  createdAt?: string;
  updatedAt?: string;
  metafields: [];
  [key: string]: unknown;
}
