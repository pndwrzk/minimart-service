import express from "express";
import { BaseError } from "./custom-error";

export const errorHandler = (
  err: Error | BaseError,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err) {
    const statusCode = err instanceof BaseError ? err.statusCode : 500;
    res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      data: err instanceof BaseError && err.data ? err.data : null,
    });
    return;
  }
  next();
};
