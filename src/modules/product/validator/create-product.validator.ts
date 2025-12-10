import Joi, { ValidationResult } from "joi";
import { RequestAddProduct } from "../dto/create-product.dto";

export const validateCreateProduct = (data: RequestAddProduct): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().max(150).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.max": "Name must be at most 150 characters",
      "any.required": "Name is required",
    }),
    category_id: Joi.number().integer().required().messages({
      "number.base": "Category ID must be a number",
      "any.required": "Category ID is required",
    }),
    price: Joi.number().precision(2).required().messages({
      "number.base": "Price must be a number",
      "any.required": "Price is required",
    }),
    stock: Joi.number().integer().required().messages({
      "number.base": "Stock must be a number",
      "any.required": "Stock is required",
    }),
   description: Joi.string().allow(null, "").optional().messages({
  "string.base": "Description must be a string",
})
  });

  return schema.validate(data, { abortEarly: false });
};
