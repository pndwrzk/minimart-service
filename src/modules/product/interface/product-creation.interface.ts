export interface ProductCreationAttributes {
  name: string;
  image_path?: string | null;
  category_id: number;
  price: number;
  stock: number;
  description?: string | null;
}
