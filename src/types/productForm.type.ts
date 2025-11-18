
type Metafield = { title: string; content: string };

export interface IProductForm {
  title: string;
  description: string;
  collections: string;
  images: File[];
  featureImage: File | null;
  tags: string[];
  badge: string;
  basePrice: number | "";
  compareAtPrice: number | "";
  attributes: { key: string; value: string }[];
  metafields: Metafield[];
  status: "draft" | "active";
  isTaxable: boolean;
  shippingRequired: boolean;
  weight: number | "";
  dimensions: { l: number | ""; w: number | ""; h: number | "" };
};