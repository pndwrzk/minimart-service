import { Request, Response, NextFunction } from "express";
import {
  registerCustomerService,
  loginCustomerService,
  refreshTokenService,
} from "./customer.service";
import { RequestRegisterCustomer } from "./dto/register-customer.dto";
import { RequestLoginCustomer } from "./dto/login-customer.dto";
import { RequestRefreshCustomer } from "./dto/refres-token-customer";

export const registerCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: RequestRegisterCustomer = req.body;
    const response = await registerCustomerService(body);

    res.status(201).json({
      message: "Successfully register customer",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const loginCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: RequestLoginCustomer = req.body;
    const response = await loginCustomerService(body);

    res.status(200).json({
      message: "Successfully login",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: RequestRefreshCustomer = req.body;
    const response = await refreshTokenService(body);

    res.status(200).json({
      message: "Successfully refreshed token",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
