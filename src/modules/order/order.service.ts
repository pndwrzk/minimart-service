import cartRepository from "@/modules/cart/cart.repository";
import repository from "./order.repository";
import { InternalServerError, NotFoundError } from "@/utils/custom-error";
import { DB } from "@/database";

import {
  GetOrdersResponse,
  OrderResponse,
} from "./interface/order-response.interface";
import { ORDER_STATUS } from "@/utils/constants";

export const checkoutOrderService = async (
  customer_id: number,
  cart_ids: number[]
): Promise<ResponseID> => {
  const transaction = await DB.sequelize.transaction();

  try {
    const cartItems = await cartRepository.getByIds(cart_ids, transaction);

    if (cartItems.length === 0) {
      throw new NotFoundError("No cart items found for the provided IDs.");
    }

    const total_price = cartItems.reduce((total, item) => {
      return total + Number(item.product!.price) * item.quantity;
    }, 0);

    const order = await repository.createOrder(
      { customer_id, total_price, status: ORDER_STATUS.PENDING },
      transaction
    );

    const orderItemsData = cartItems.map((item) => ({
      order_id: order.id!,
      product_id: item.product_id,
      quantity: item.quantity,
      price: Number(item.product!.price),
      total_price: Number(item.product!.price) * item.quantity,
    }));

    await repository.createOrderItems(orderItemsData, transaction);

    await cartRepository.deleteByIds(cart_ids, transaction);

    await transaction.commit();

    return { id: order.id! };
  } catch (err) {
    await transaction.rollback();
    throw new InternalServerError("Failed to checkout order.");
  }
};

export const getOrdersByStatusService = async (
  customer_id: number,
  status?: string
): Promise<GetOrdersResponse> => {
  const orders = await repository.getOrdersByCustomer(customer_id, status);
  const data: OrderResponse[] = orders.map((order) => ({
    id: order.id!,
    customer_id: order.customer_id,
    total_price: Number(order.total_price),
    status: order.status!,
    created_at: order.created_at!,
    updated_at: order.updated_at!,
    items:
      order.order_items?.map((item) => ({
        product_id: item.product_id,
        product_name: item.product!.name,
        quantity: item.quantity,
        price: Number(item.price),
        subtotal: Number(item.total_price),
      })) || [],
  }));

  return { data };
};
