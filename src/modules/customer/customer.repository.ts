import { DB } from "@/database";
import { Customer } from "./interface/customer.interface";

const repository = {
  createUser: async (data: Customer): Promise<Customer> => {
    return DB.Customer.create(data);
  },

  getCustomerByEmail: async (email: string): Promise<Customer | null> => {
    return DB.Customer.findOne({ where: { email } });
  },

  getCustomerById: async (id: number): Promise<Customer | null> => {
    return DB.Customer.findByPk(id);
  },
};

export default repository;
