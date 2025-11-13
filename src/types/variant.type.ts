export interface IProductVariant {
  _id: string;
  sku?: string;
  barcode?: string;
  title?: string;
  parentTitle?: string;
  image?: string;
  parentImage?: string;
  options?: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
  price: number;
  compareAtPrice?: number;
  stock: number;
  isActive?: boolean;
}

export type Variant = {
  _id: string;
  title?: string;
  parentTitle?: string;
  image?: string;
  parentImage?: string;
  options?: {
    color?: string;
    size?: string;
    [key: string]: string | undefined;
  };
  price: number;
};

export interface Product {
  _id: string;
  title: string;
  featureImage: string;
  variants: Variant[];
}
