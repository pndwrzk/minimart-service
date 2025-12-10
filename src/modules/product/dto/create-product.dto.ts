export type RequestAddProduct = {
  name: string;
  category_id: number;
  price: number;
  stock: number;
  description?: string;
}
