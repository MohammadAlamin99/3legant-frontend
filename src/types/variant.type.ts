export interface IProductVariant {
  _id: string;
  barcode: string;
  compareAtPrice?: number;
  image?: string;
  isActive: boolean;
  options: {
    color: string;
    size: string;
  };
  price?: number;
  sku?: string;
  stock: number;
  title: string;
}