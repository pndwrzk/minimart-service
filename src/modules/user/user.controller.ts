import { Request, Response, NextFunction } from "express";
import { registerUserService, loginUserService } from "./user.service";
import { RequestRegisterUser } from "./dto/register-user.dto";
import { RequestLoginUser } from "./dto/login-user.dto";



export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: RequestRegisterUser = req.body;
    const response = await registerUserService(body);

    res.status(201).json({
      message: "Successfully register user",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};


export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: RequestLoginUser = req.body;
    const response = await loginUserService(body);

    res.status(200).json({
      message: "Successfully login",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
