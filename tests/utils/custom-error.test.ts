import {
  BaseError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError,
  ServiceUnavailableError,
} from "../../src/utils/custom-error"; 

describe("Custom Error Classes", () => {
  it("should create BaseError correctly", () => {
    const err = new BaseError("Test", 999, { foo: "bar" });
    expect(err.message).toBe("Test");
    expect(err.statusCode).toBe(999);
    expect(err.data).toEqual({ foo: "bar" });
    expect(err).toBeInstanceOf(BaseError);
    expect(err.stack).toBeDefined();
  });

  it("should create BadRequestError with default message", () => {
    const err = new BadRequestError({ field: "name" });
    expect(err.message).toBe("Bad Request");
    expect(err.statusCode).toBe(400);
    expect(err.data).toEqual({ field: "name" });
    expect(err).toBeInstanceOf(BadRequestError);
    expect(err).toBeInstanceOf(BaseError);
  });

  it("should create UnauthorizedError with default message", () => {
    const err = new UnauthorizedError();
    expect(err.message).toBe("Unauthorized");
    expect(err.statusCode).toBe(401);
    expect(err.data).toBeUndefined();
    expect(err).toBeInstanceOf(UnauthorizedError);
    expect(err).toBeInstanceOf(BaseError);
  });

  it("should create ForbiddenError", () => {
    const err = new ForbiddenError();
    expect(err.message).toBe("Forbidden");
    expect(err.statusCode).toBe(403);
    expect(err).toBeInstanceOf(ForbiddenError);
  });

  it("should create NotFoundError", () => {
    const err = new NotFoundError();
    expect(err.message).toBe("Not Found");
    expect(err.statusCode).toBe(404);
    expect(err).toBeInstanceOf(NotFoundError);
  });

  it("should create ConflictError", () => {
    const err = new ConflictError();
    expect(err.message).toBe("Conflict");
    expect(err.statusCode).toBe(409);
    expect(err).toBeInstanceOf(ConflictError);
  });

  it("should create UnprocessableEntityError with data", () => {
    const err = new UnprocessableEntityError("Custom Message", { field: "age" });
    expect(err.message).toBe("Custom Message");
    expect(err.statusCode).toBe(422);
    expect(err.data).toEqual({ field: "age" });
    expect(err).toBeInstanceOf(UnprocessableEntityError);
  });

  it("should create InternalServerError", () => {
    const err = new InternalServerError();
    expect(err.message).toBe("Internal Server Error");
    expect(err.statusCode).toBe(500);
    expect(err).toBeInstanceOf(InternalServerError);
  });

  it("should create ServiceUnavailableError", () => {
    const err = new ServiceUnavailableError();
    expect(err.message).toBe("Service Unavailable");
    expect(err.statusCode).toBe(503);
    expect(err).toBeInstanceOf(ServiceUnavailableError);
  });
});
