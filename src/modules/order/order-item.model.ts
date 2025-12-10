import { Model, Sequelize, DataTypes } from "sequelize";
import { OrderItem } from "./interface/order-item.interface";
import { OrderItemCreationAttributes } from "./interface/order-item-creation.interface";
import { Product } from "../product/interface/product.interface";


export class OrderItemModel extends Model<OrderItem, OrderItemCreationAttributes> implements OrderItem {
  public id?: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
  public total_price!: number;
  public created_at?: Date;
  public updated_at?: Date;
public product?: Product; 

  
}



export default function (sequelize: Sequelize): typeof OrderItemModel {
  OrderItemModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
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
      tableName: "order_items",
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return OrderItemModel;
}
