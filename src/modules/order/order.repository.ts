import { Transaction, WhereOptions } from "sequelize";
import { DB } from "@/database";
import { Order } from "./interface/order.interface";
import { OrderItem } from "./interface/order-item.interface";

const repository = {
  createOrder: async (data: Order, transaction?: Transaction) => {
    return DB.Order.create(data, { transaction });
  },

  createOrderItems: async (
    itemsData: OrderItem[],
    transaction?: Transaction
  ) => {
    return DB.OrderItem.bulkCreate(itemsData, { transaction });
  },

    getOrdersByCustomer: async (customer_id: number, status?: string) => {
    const where: WhereOptions<Order> = { customer_id };

    if (status) {
      where.status = status.trim() as string; 
     
    }

    return DB.Order.findAll({
      where,
      include: [
        {
          model: DB.OrderItem,
          as: "order_items",
          include: [
            {
              model: DB.Product,
              as: "product",
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  },
};

export default repository;
