import Joi, { ValidationResult } from "joi";
import { RequestLoginCustomer } from "../dto/login-customer.dto";

export const validateLoginCustomer = (data: RequestLoginCustomer): ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
};
