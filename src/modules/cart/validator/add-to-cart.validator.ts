import Joi, { ValidationResult } from "joi";
import { AddCartItem } from "../dto/add-cart-item.dto";

export const validateAddToCart = (data: AddCartItem): ValidationResult => {
  const schema = Joi.object({
    customer_id: Joi.number().integer().positive().required()
      .messages({
        "number.base": "customer_id must be a number",
        "number.integer": "customer_id must be an integer",
        "number.positive": "customer_id must be greater than 0",
        "any.required": "customer_id is required",
      }),
    product_id: Joi.number().integer().positive().required()
      .messages({
        "number.base": "product_id must be a number",
        "number.integer": "product_id must be an integer",
        "number.positive": "product_id must be greater than 0",
        "any.required": "product_id is required",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};
