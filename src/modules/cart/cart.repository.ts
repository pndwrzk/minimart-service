import { DB } from "@/database";
import { CartItem } from "./interface/cart.interface";
import { CartCreationAttributes } from "./interface/cart-creation.interface";
import { Transaction } from "sequelize";

const repository = {
  createCartItem: async (
    data: CartCreationAttributes
  ): Promise<CartItem | null> => {
    const cartItem = await DB.Cart.create(data);
    return cartItem;
  },

  getCartItemsByCustomer: async (customer_id: number): Promise<CartItem[]> => {
    return DB.Cart.findAll({
      where: { customer_id },
      include: [
        { model: DB.Product, as: "product" },
        { model: DB.Customer, as: "customer" },
      ],
      order: [["id", "DESC"]],
    });
  },

  getCartItemByCustomerIdAndProductId: async (
    customerId: number,
    productId: number
  ): Promise<CartItem | null> => {
    return DB.Cart.findOne({
      where: { customer_id: customerId, product_id: productId },
    });
  },

  updateCartItem: async (
    id: number,
    data: Partial<CartCreationAttributes>
  ): Promise<number> => {
    const [affectedCount] = await DB.Cart.update(data, { where: { id } });
    return affectedCount;
  },

  countCartItemsByCustomer: async (customer_id: number): Promise<number> => {
    return DB.Cart.count({ where: { customer_id } });
  },

  getByIds: async (
    ids: number[],
    transaction?: Transaction
  ): Promise<CartItem[]> => {
    return DB.Cart.findAll({
      where: { id: ids },
      include: [{ model: DB.Product, as: "product" }],
      transaction,
    });
  },

  deleteByIds: async (
    ids: number[],
    transaction?: Transaction
  ): Promise<number> => {
    return DB.Cart.destroy({ where: { id: ids }, transaction });
  },
};

export default repository;
