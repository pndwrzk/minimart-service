import { Product } from "@/modules/product/interface/product.interface";

export interface CartItem {

  id?: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
   product?: Product;
}