import Joi from "joi";

export const DataValidator = (error: Joi.ValidationError) => {
  const formattedErrors = error.details.map((err) => ({
    field: err.path[1],
    message: err.message,
  }));
  return formattedErrors;
};
