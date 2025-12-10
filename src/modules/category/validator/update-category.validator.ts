import Joi, { ValidationResult } from "joi";
import { RequestUpdateCategory } from "../dto/update-category.dto";

export const validateUpdateCategory = (
  body: RequestUpdateCategory
): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.min": "The name must be at least 3 characters long.",
      "string.max": "The name must not exceed 100 characters.",
      "any.required": "The name is required.",
    }),
  })
    .required()
    .messages({
      "object.base": "The input must be an object.",
      "any.required": "The object is required.",
    });

  return schema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
};
