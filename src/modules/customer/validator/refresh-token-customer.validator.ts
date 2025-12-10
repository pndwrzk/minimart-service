import Joi, { ValidationResult } from "joi";
import { RequestRefreshCustomer } from "../dto/refres-token-customer";

export const validateRefreshTokenCustomer = (data: RequestRefreshCustomer): ValidationResult => {
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
};
