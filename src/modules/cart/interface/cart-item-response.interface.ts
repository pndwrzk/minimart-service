export interface CartItemResponse {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
   price: number;
   image_path?: string;
  total_price: number;
}
