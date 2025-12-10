import { Model, Sequelize, DataTypes } from "sequelize";
import { Order } from "./interface/order.interface";
import { OrderItemModel } from "./order-item.model";

export class OrderModel extends Model<Order> implements Order {
  public id?: number;
  public customer_id!: number;
  public total_price!: number;
  public status!: string;
  public created_at?: Date;
  public updated_at?: Date;

  public readonly order_items?: OrderItemModel[];
}

export default function (sequelize: Sequelize): typeof OrderModel {
  OrderModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "orders",
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return OrderModel;
}
