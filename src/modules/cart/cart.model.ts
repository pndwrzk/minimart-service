import { Sequelize, DataTypes, Model } from "sequelize";
import { CartItem } from "./interface/cart.interface";
import { CartCreationAttributes } from "./interface/cart-creation.interface";
export class CartModel extends Model<CartItem, CartCreationAttributes> implements CartItem {
  public id?: number;
  public customer_id!: number;
  public product_id!: number;
  public quantity!: number;
  public created_at?: Date;
  public updated_at?: Date;
}

export default function (sequelize: Sequelize): typeof CartModel {
  CartModel.init(
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
        references: { model: "customers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      tableName: "carts",
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["customer_id", "product_id"], 
        },
      ],
    }
  );

  return CartModel;
}
