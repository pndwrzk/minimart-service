import { errorHandler } from "../../src/utils/error-handler";
import {  BadRequestError } from "../../src/utils/custom-error";

describe("errorHandler middleware", () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should handle BaseError correctly", () => {
    const err = new BadRequestError({ field: "name" }, "Invalid input");

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid input",
      data: { field: "name" },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle generic Error as 500", () => {
    const err = new Error("Something went wrong");

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong",
      data: null,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if no error", () => {
    errorHandler(null as any, req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
