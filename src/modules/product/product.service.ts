import repository from "./product.repository";
import { ResponseGetProducts } from "./interface/response-get-products.interface";
import { getPagination, getMeta } from "@/utils/pagination";
import { DB } from "@/database";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError,
} from "@/utils/custom-error";
import { RequestAddProduct } from "./dto/create-product.dto";
import { Product } from "./interface/product.interface";
import { validateCreateProduct } from "./validator/create-product.validator";
import { DataValidator } from "@/utils/data-validator";
import { deleteFile, saveFile } from "@/utils/file-upload";
import categoryRepository from "@/modules/category/category.repository";
export const getProductsService = async (
  page: number,
  pageSize: number,
  search?: string,
  categoryId?: number,
  fromPrice?: number,
  toPrice?: number,
  orderBy?: string,
  sortBy?: string
): Promise<ResponseGetProducts> => {
  const { limit, offset } = getPagination(page, pageSize);
  const { rows, count } = await repository.getProducts(limit, offset, search, categoryId, fromPrice, toPrice, orderBy, sortBy);
  const meta = getMeta(count, page, pageSize);

  return {
    data: rows,
    meta,
  };
};

export const deleteProductService = async (id: number): Promise<ResponseID> => {
  const product = await repository.getProductById(id);
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  const deletedCount = await repository.deleteProduct(id);
  if (!deletedCount) {
    throw new InternalServerError("Failed to delete product");
  }

  return { id };
};

export const createProductService = async (
  body: RequestAddProduct,
  file?: Express.Multer.File
): Promise<ResponseID> => {
  const transaction = await DB.sequelize.transaction();
  let image_path: string | undefined;
  try {
    const { error } = validateCreateProduct(body);
    if (error) {
      throw new BadRequestError(DataValidator(error));
    }
    if (file && !["image/jpeg", "image/png"].includes(file.mimetype)) {
      throw new BadRequestError("Only JPEG/PNG files are allowed");
    }

    const category = await categoryRepository.getCategoryById(body.category_id);
    if (!category) {
      throw new UnprocessableEntityError(
        "Invalid category_id: Category does not exist"
      );
    }

    if (file) {
      image_path = saveFile(file, "uploads/products");
    }

    const data: Product = {
      ...body,
      category_id: Number(body.category_id),
      price: Number(body.price),
      image_path,
    };

    const product = await repository.createProduct(data, transaction);

    if (!product || !product.id) {
      throw new InternalServerError("Failed to create product");
    }

    await transaction.commit();

    return { id: product.id };
  } catch(error) {
    console.log(error);
    await transaction.rollback();
    deleteFile(image_path!);
    throw new InternalServerError("Failed to create product");
  }
};
