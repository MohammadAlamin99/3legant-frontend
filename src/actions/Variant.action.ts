type VariantOption = { key: string; value: string };
export type Variant = {
  sku: string;
  title: string;
  options: VariantOption[];
  price: number | "";
  compareAtPrice: number | "";
  barcode?: string;
  image: File | null;
  stock: number | "";
  isActive: boolean;
};
