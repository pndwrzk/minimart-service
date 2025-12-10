import { Category } from "../interface/category.interface";

export interface ResponseGetCategories {
  data: Category[];
  meta: Meta;
}
