import { DB } from "@/database";

import { Op } from "sequelize";
import { Category } from "./interface/category.interface";


const repository = {
  createCategory: async (data: Category): Promise<Category | null> => {
    const category = await DB.Category.create(data);
    return category;
  },

  getCategories: async (
    limit: number,
    offset: number,
    search?: string
  ): Promise<{ rows: Category[]; count: number }> => {
    return DB.Category.findAndCountAll({
      where: search
        ? {
            name: {
              [Op.like]: `%${search}%`,
            },
          }
        : undefined,
      order: [["id", "DESC"]],
      limit,
      offset,
    });
  },

  getCategoryById: async (id: number): Promise<Category | null> => {
    return await DB.Category.findByPk(id);
  },

  deleteCategory: async (id: number): Promise<number> => {
    return await DB.Category.destroy({ where: { id } });
  },

  updateCategory: async (id: number, data: Category): Promise<number> => {
    const [affectedCount] = await DB.Category.update(data, {
      where: { id },
    });
    return affectedCount;
  },
};

export default repository;
