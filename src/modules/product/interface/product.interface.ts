export interface Product {
  id?: number;
  name: string;
  image_path?: string | null;
  category_id: number;
  price: number;
  stock: number;
  description?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
