import { NextFunction, Response, Request } from "express";
import {
  createCategoryService,
  getCategoriesService,
  deleteCategoryService,
  updateCategoryService,
} from "./category.service";
import { RequestAddCategory } from "./dto/create-category.dto";
import { RequestUpdateCategory } from "./dto/update-category.dto";

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bodyRequest: RequestAddCategory = req.body;
    const response: ResponseID = await createCategoryService(bodyRequest);
    res.status(201).json({
      status: 201,
      message: "Successfully Create Categories.",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.page_size as string) || 100;
    const search = req.query.q as string | undefined;

    const response = await getCategoriesService(page, pageSize, search);

    res.status(200).json({
      message: "Successfully Get Categories.",
      data: response.data,
      meta: response.meta,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const bodyRequest: RequestUpdateCategory = req.body;
    const response = await updateCategoryService(id, bodyRequest);

    res.status(200).json({
      message: "Successfully Update Category.",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string);
    const response = await deleteCategoryService(id);

    res.status(200).json({
      message: "Successfully Delete Category.",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
