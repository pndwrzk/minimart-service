jest.mock("../../src/config/index", () => ({
  JWT_ACCESS_SECRET: "access-secret",
  JWT_REFRESH_SECRET: "refresh-secret",
  JWT_ACCESS_EXPIRED: "3600",
  JWT_REFRESH_EXPIRED: "7200",
}));

import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../src/utils/token";

describe("JWT Token Utils", () => {
  const userId = 123;

  it("should generate access token with correct payload and expiry", () => {
    const { token, expiresAt } = generateAccessToken(userId);
    const decoded = jwt.verify(token, "access-secret") as any;

    expect(decoded.id).toBe(userId);
    expect(expiresAt).toBeGreaterThan(Date.now());
  });

  it("should generate refresh token with correct payload and expiry", () => {
    const { token, expiresAt } = generateRefreshToken(userId);
    const decoded = jwt.verify(token, "refresh-secret") as any;

    expect(decoded.id).toBe(userId);
    expect(expiresAt).toBeGreaterThan(Date.now());
  });

  it("should verify access token correctly", () => {
    const { token } = generateAccessToken(userId);
    const payload = verifyAccessToken(token) as any;

    expect(payload.id).toBe(userId);
  });

  it("should verify refresh token correctly", () => {
    const { token } = generateRefreshToken(userId);
    const payload = verifyRefreshToken(token) as any;

    expect(payload.id).toBe(userId);
  });

  it("should throw error for invalid token", () => {
    expect(() => verifyAccessToken("invalid.token")).toThrow();
    expect(() => verifyRefreshToken("invalid.token")).toThrow();
  });
});
