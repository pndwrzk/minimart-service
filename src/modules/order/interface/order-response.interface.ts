

export interface OrderItemResponse {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  customer_id: number;
  total_price: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  items: OrderItemResponse[];
}

export interface GetOrdersResponse {
  data: OrderResponse[];
}
