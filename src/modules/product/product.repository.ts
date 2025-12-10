import { DB } from "@/database";
import { col, Op, or, Order, Transaction } from "sequelize";
import { Product } from "./interface/product.interface";

const repository = {
  getProducts: async (
    limit: number,
    offset: number,
    search?: string,
    categoryId?: number,
    fromPrice?: number,
    toPrice?: number,
    orderBy?: string,
    sortBy?: string
  ): Promise<{ rows: Product[]; count: number }> => {
    const where: any = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    if (categoryId) {
      where.category_id = categoryId;
    }

    if (fromPrice !== undefined && toPrice !== undefined) {
      where.price = { [Op.between]: [fromPrice, toPrice] };
    } else if (fromPrice !== undefined) {
      where.price = { [Op.gte]: fromPrice };
    } else if (toPrice !== undefined) {
      where.price = { [Op.lte]: toPrice };
    }

    const validFields = ["price", "created_at"];
    const order: any[] = [];

    const sortDirection = sortBy?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    if (orderBy && validFields.includes(orderBy)) {
      order.push([col(orderBy), sortDirection]);
    } else {
      order.push([col("created_at"), "DESC"]);
    }

    const result = await DB.Product.findAndCountAll({
      where,
      include: [{ model: DB.Category, as: "category" }],
      limit,
      offset,
      order,
    });

    return result;
  },

  getProductById: async (id: number): Promise<Product | null> => {
    return DB.Product.findByPk(id);
  },
  deleteProduct: async (id: number): Promise<number> => {
    return DB.Product.destroy({ where: { id } });
  },

  createProduct: async (data: Product, transaction?: Transaction) => {
    return DB.Product.create(data, { transaction });
  },
};

export default repository;
