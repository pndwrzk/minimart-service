import Joi from "joi";
import { DataValidator } from "../../src/utils/data-validator";

describe("DataValidator", () => {
  it("should format single validation error correctly", () => {
    const schema = Joi.object({ name: Joi.string().required() });
    const { error } = schema.validate({}, { abortEarly: false });

    const result = DataValidator(error!);
    expect(result).toEqual([{ field: undefined, message: '"name" is required' }]);
  });

  it("should format multiple validation errors correctly", () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().min(18).required(),
    });

    const { error } = schema.validate({ name: "", age: 10 }, { abortEarly: false });

    const result = DataValidator(error!);

    expect(result).toEqual([
      { field: undefined, message: '"name" is not allowed to be empty' },
      { field: undefined, message: '"age" must be greater than or equal to 18' },
    ]);
  });

  it("should handle empty error details gracefully", () => {
    const result = DataValidator({ details: [] } as unknown as Joi.ValidationError);
    expect(result).toEqual([]);
  });
});
