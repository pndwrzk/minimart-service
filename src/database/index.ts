import { Sequelize, Dialect } from "sequelize";
import categoryModel from "../modules/category/category.model";
import productModel from "../modules/product/product.model";
import userModel from "../modules/user/user.model";
import customerModel from "../modules/customer/customer.model";
import cartModel from "../modules/cart/cart.model";
import orderModel from "../modules/order/order.model";
import orderItemModel from "../modules/order/order-item.model";

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
}  from "../config";

const commonConfig = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
    freezeTableName: true,
  },
  pool: { min: 0, max: 5 },
  logQueryParameters: true,
  logging: (query: string, time?: number) =>
    console.info(`${time ?? 0}ms ${query}`),
  benchmark: true,
};

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT ?? "5432", 10),
  dialect: "mysql",
  ...commonConfig,
});

sequelize.authenticate().then(
  () => console.info(`Database  connected successfully.`),
  (err) => console.error("Database connection failed:", err)
);




export const DB = {
  Category: categoryModel(sequelize),
  Product: productModel(sequelize),
  User: userModel(sequelize),
  Customer: customerModel(sequelize),
  Cart: cartModel(sequelize),
  Order: orderModel(sequelize),
  OrderItem: orderItemModel(sequelize),
  sequelize,
  Sequelize,
};

DB.Order.hasMany(DB.OrderItem, { foreignKey: "order_id", as: "order_items" });
DB.OrderItem.belongsTo(DB.Order, { foreignKey: "order_id", as: "order" });

DB.Cart.belongsTo(DB.Product, { foreignKey: "product_id", as: "product" });
DB.Cart.belongsTo(DB.Customer, { foreignKey: "customer_id", as: "customer" });

DB.Product.belongsTo(DB.Category, { foreignKey: "category_id", as: "category" });



DB.OrderItem.belongsTo(DB.Product, {
  foreignKey: "product_id", 
  as: "product" 
});
