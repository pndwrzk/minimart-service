import {
  JWT_ACCESS_EXPIRED,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRED,
  JWT_REFRESH_SECRET,
} from "@/config";
import jwt, { SignOptions } from "jsonwebtoken";

export const generateAccessToken = (
  id: number
): { token: string; expiresAt: number } => {
  const now = Date.now();
  const options: SignOptions = { expiresIn: parseInt(JWT_ACCESS_EXPIRED!) };
  const accessExpiresAt = new Date(
    now + parseInt(JWT_ACCESS_EXPIRED!) * 1000
  ).getTime();
  return {
    token: jwt.sign({ id }, JWT_ACCESS_SECRET!, options),
    expiresAt: accessExpiresAt,
  };
};

export const generateRefreshToken = (
  id: number
): { token: string; expiresAt: number } => {
  const now = Date.now();
  const options: SignOptions = { expiresIn: parseInt(JWT_REFRESH_EXPIRED!) };
  const refreshExpiresAt = new Date(
    now + parseInt(JWT_REFRESH_EXPIRED!) * 1000
  ).getTime();
  return {
    token: jwt.sign({ id }, JWT_REFRESH_SECRET!, options),
    expiresAt: refreshExpiresAt,
  };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET!);
};
