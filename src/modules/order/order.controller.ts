import { Response, NextFunction } from "express";
import {
  checkoutOrderService,
  getOrdersByStatusService,
} from "./order.service";
import { AuthRequest } from "@/middlewares/auth.middleware";
import { RequestCreateOrder } from "./dto/create-order.dto";

export const checkoutOrderController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer_id = req.user!.id;
    const body: RequestCreateOrder = req.body;
    const cart_ids = body.cart_ids;

    const response = await checkoutOrderService(customer_id, cart_ids);

    res.status(201).json({
      message: "Order successfully created",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStatusController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer_id = req.user!.id;
    const { status } = req.query;

    const response = await getOrdersByStatusService(
      customer_id,
      status as string | undefined
    );

    res.status(200).json({
      message: "Orders fetched successfully",
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};
