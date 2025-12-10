import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/token";
import {  UnauthorizedError } from "@/utils/custom-error";

export interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      throw new UnauthorizedError("Authorization header missing");

    const token = authHeader.split(" ")[1];
    if (!token) throw new UnauthorizedError("Token not found");

    const decoded = verifyAccessToken(token) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
