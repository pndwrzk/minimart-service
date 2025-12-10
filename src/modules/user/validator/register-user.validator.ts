import Joi, { ValidationResult } from "joi";
import { RequestRegisterUser } from "../dto/register-user.dto";

export const validateRegisterUser = (data: RequestRegisterUser): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data, { abortEarly: false });
};
