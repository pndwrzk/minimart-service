import Joi, { ValidationResult } from "joi";
import { RequestRegisterCustomer } from "../dto/register-customer.dto";

export const validateRegisterCustomer = (
  data: RequestRegisterCustomer
): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string()
      .max(100)
      .required()
      .messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "string.max": "Name cannot exceed 100 characters",
        "any.required": "Name is required",
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.base": "Email must be a string",
        "string.empty": "Email cannot be empty",
        "string.email": "Email format is invalid",
        "any.required": "Email is required",
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required",
      }),
    phone: Joi.string()
      .max(20)
      .required()
      .messages({
        "string.base": "Phone must be a string",
        "string.empty": "Phone cannot be empty",
        "string.max": "Phone cannot exceed 20 characters",
        "any.required": "Phone is required",
      }),
    address: Joi.string()
      .max(255)
      .required()
      .messages({
        "string.base": "Address must be a string",
        "string.empty": "Address cannot be empty",
        "string.max": "Address cannot exceed 255 characters",
        "any.required": "Address is required",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};
