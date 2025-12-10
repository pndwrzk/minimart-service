import { DataTypes, Model, Sequelize } from "sequelize";
import { Product } from "./interface/product.interface";
import { ProductCreationAttributes } from "./interface/product-creation.interface";

export class ProductModel
  extends Model<Product, ProductCreationAttributes>
  implements Product
{
  public id?: number;
  public name!: string;
  public image_path?: string | null;
  public category_id!: number;
  public price!: number;
  public stock!: number;
  public description?: string | null;
  public created_at?: Date;
  public updated_at?: Date;
}


export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      image_path: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: "products",
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      timestamps: true,
    }
  );

  return ProductModel;
}
