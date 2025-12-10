import Joi, { ValidationResult } from "joi";
import { RequestLoginUser } from "../dto/login-user.dto";

export const validateLoginUser = (data: RequestLoginUser): ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
};
