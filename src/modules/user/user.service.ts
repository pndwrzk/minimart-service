import bcrypt from "bcrypt";
import repository from "./user.repository";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import { RequestRegisterUser } from "./dto/register-user.dto";
import { RequestLoginUser } from "./dto/login-user.dto";
import { ResponseLoginUser } from "./interface/response-login.interface";
import { BadRequestError, NotFoundError } from "@/utils/custom-error";
import { validateRegisterUser } from "./validator/register-user.validator";
import { DataValidator } from "@/utils/data-validator";
import { validateLoginUser } from "./validator/login-user.validator";
import { JWT_ACCESS_EXPIRED, JWT_REFRESH_EXPIRED } from "@/config";

export const registerUserService = async (
  body: RequestRegisterUser
): Promise<ResponseID> => {
  const { error } = validateRegisterUser(body);
  if (error) {
    throw new BadRequestError(DataValidator(error));
  }
  const existingUser = await repository.getUserByEmail(body.email);
  if (existingUser) throw new BadRequestError("Email already registered");

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await repository.createUser({
    name: body.name,
    email: body.email,
    password: hashedPassword,
  });

  return {
    id: user.id!,
  };
};

export const loginUserService = async (
  body: RequestLoginUser
): Promise<ResponseLoginUser> => {
  const { error } = validateLoginUser(body);
  if (error) {
    throw new BadRequestError(DataValidator(error));
  }
  const user = await repository.getUserByEmail(body.email);
  if (!user) throw new BadRequestError("Incorrect Email or password");

  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) throw new BadRequestError("Incorrect Email or password");

const accessToken = generateAccessToken(user.id!);
const refreshToken = generateRefreshToken(user.id!);



  return {
    access_token: accessToken.token,
    refresh_token: refreshToken.token,
    access_token_expires_at: accessToken.expiresAt,
    refresh_token_expires_at: refreshToken.expiresAt,
    user: { id: user.id!, name: user.name, email: user.email },
  };
};
