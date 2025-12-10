import { Product } from "./product.interface";

export interface ResponseGetProducts {
  data: Product[];
  meta: Meta;
}
