import { DB } from "@/database";
import { User } from "./interface/user.interface";

const repository = {
  createUser: async (data: User): Promise<User> => {
    return DB.User.create(data);
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    return DB.User.findOne({ where: { email } });
  },

  getUserById: async (id: number): Promise<User | null> => {
    return DB.User.findByPk(id);
  },
};

export default repository;
