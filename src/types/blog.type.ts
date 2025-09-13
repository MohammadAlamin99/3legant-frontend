export interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string;
  category?: string;
  tags?: string[];
  image: string[];
  status: "draft" | "published" | "archived";
  views?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
