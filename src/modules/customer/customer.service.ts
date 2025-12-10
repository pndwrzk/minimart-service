import bcrypt from "bcrypt";
import customerRepository from "./customer.repository";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/utils/token";
import { RequestRegisterCustomer } from "./dto/register-customer.dto";
import { RequestLoginCustomer } from "./dto/login-customer.dto";
import { ResponseLoginCustomer } from "./interface/response-login.interface";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/custom-error";
import { validateRegisterCustomer } from "./validator/register-customer.validator";
import { validateLoginCustomer } from "./validator/login-customer.validator";
import { DataValidator } from "@/utils/data-validator";
import { RequestLoginUser } from "../user/dto/login-user.dto";
import { RequestRefreshCustomer } from "./dto/refres-token-customer";
import { JwtPayload } from "@/middlewares/auth.middleware";
import { ResponseRefreshTokenCustomer } from "./interface/response-refresh-token.interface";
import { validateRefreshTokenCustomer } from "./validator/refresh-token-customer.validator";

export const registerCustomerService = async (
  body: RequestRegisterCustomer
): Promise<ResponseID> => {
  const { error } = validateRegisterCustomer(body);
  if (error) throw new BadRequestError(DataValidator(error));

  const existing = await customerRepository.getCustomerByEmail(body.email);
  if (existing) throw new BadRequestError(null, "Email already registered");

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const customer = await customerRepository.createUser({
    name: body.name,
    email: body.email,
    password: hashedPassword,
    address: body.address,
    phone: body.phone,
  });

  return { id: customer.id! };
};

export const loginCustomerService = async (
  body: RequestLoginCustomer
): Promise<ResponseLoginCustomer> => {
  const { error } = validateLoginCustomer(body);
  if (error) throw new BadRequestError(DataValidator(error), "Reques invalid");

  const customer = await customerRepository.getCustomerByEmail(body.email);
  if (!customer) throw new BadRequestError(null, "Incorrect Email or password");

  const isMatch = await bcrypt.compare(body.password, customer.password);
  if (!isMatch) throw new BadRequestError(null, "Incorrect Email or password");

  const accessToken = generateAccessToken(customer.id!);
  const refreshToken = generateRefreshToken(customer.id!);

  return {
    access_token: accessToken.token,
    refresh_token: refreshToken.token,
    access_token_expires_at: accessToken.expiresAt,
    refresh_token_expires_at: refreshToken.expiresAt,
    user: {
      id: customer.id!,
      name: customer.name,
      email: customer.email,
    },
  };
};

export const refreshTokenService = async (
  body: RequestRefreshCustomer
): Promise<ResponseRefreshTokenCustomer> => {
  const { error } = validateRefreshTokenCustomer(body);
  if (error) throw new BadRequestError(DataValidator(error));

  const { refresh_token } = body;

  const decoded = verifyRefreshToken(refresh_token) as JwtPayload;

  const customer = await customerRepository.getCustomerById(decoded.id);
  if (!customer) {
    throw new NotFoundError("customer not found");
  }

  const newAccessToken = generateAccessToken(decoded.id!);
  const newRefreshToken = generateRefreshToken(decoded.id!);

  return {
    access_token: newAccessToken.token,
    refresh_token: newRefreshToken.token,
    access_token_expires_at: newAccessToken.expiresAt,
    refresh_token_expires_at: newRefreshToken.expiresAt,
  };
};
