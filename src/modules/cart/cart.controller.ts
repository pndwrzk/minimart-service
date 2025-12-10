import { Request, Response, NextFunction } from "express";
import {
  addToCartService,
  getCartService,

  countCartItemsService,
} from "./cart.service";
import { AuthRequest } from "@/middlewares/auth.middleware";
import { CartCreationAttributes } from "./interface/cart-creation.interface";
import { UpdateCartItem } from "./dto/update-cart-item.dto";

export const addToCartController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer_id = req.user!.id;
    const body: CartCreationAttributes = { ...req.body, customer_id };
    const response = await addToCartService(body);

    res.status(200).json({
      status: 200,
      message: "Item added to cart",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getCartController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer_id = req.user!.id;
    const response = await getCartService(customer_id);

    res.status(200).json({
      status: 200,
      message: "Cart retrieved",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};



export const countCartItemsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer_id = req.user!.id;
    const response = await countCartItemsService(customer_id);

    res.status(200).json({
      status: 200,
      message: "Total cart items counted",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
