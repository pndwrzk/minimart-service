import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "@/utils/custom-error";
import repository from "./category.repository";
import { validateCreateCategory } from "@/modules/category/validator/create-category.validator";
import { RequestAddCategory } from "./dto/create-category.dto";
import { RequestUpdateCategory } from "./dto/update-category.dto";

import { validateUpdateCategory } from "./validator/update-category.validator";
import { Category } from "./interface/category.interface";
import { ResponseGetCategories } from "./interface/response-get-categories.interface";
import { DataValidator } from "@/utils/data-validator";
import { getMeta, getPagination } from "@/utils/pagination";

export const createCategoryService = async (
  body: RequestAddCategory
): Promise<ResponseID> => {
  const { error } = validateCreateCategory(body);
  if (error) {
    throw new BadRequestError(DataValidator(error));
  }

  const data: Category = {
    name: body.name,
  };

  const response = await repository.createCategory(data);
  if (!response || !response.id) {
    throw new InternalServerError("Failed to create category");
  }

  return { id: response.id };
};

export const getCategoriesService = async (
  page: number,
  pageSize: number,
  search?: string
): Promise<ResponseGetCategories> => {
  const { limit, offset } = getPagination(page, pageSize);
  const { rows, count } = await repository.getCategories(limit, offset, search);
  const meta = getMeta(count, page, pageSize);

  return {
    data: rows,
    meta,
  };
};

export const updateCategoryService = async (
  id: number,
  body: RequestUpdateCategory
): Promise<ResponseID> => {
  const { error } = validateUpdateCategory(body);
  if (error) {
    throw new BadRequestError(DataValidator(error));
  }

  const category = await repository.getCategoryById(id);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  const data: Category = {
    name: body.name,
  };

  const isUpdated = await repository.updateCategory(id, data);
  if (!isUpdated) {
    throw new InternalServerError("Failed to update category");
  }

  return { id };
};

export const deleteCategoryService = async (
  id: number
): Promise<ResponseID> => {
  const data = await repository.getCategoryById(id);

  if (!data) {
    throw new NotFoundError("Category not found");
  }

  await repository.deleteCategory(id);
  return { id };
};
