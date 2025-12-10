export interface Order {
  id?: number;
  customer_id: number;
  total_price: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}
