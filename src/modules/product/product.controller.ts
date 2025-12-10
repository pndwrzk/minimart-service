import { Request, Response, NextFunction } from "express";
import { createProductService, deleteProductService, getProductsService } from "./product.service";
import { ResponseGetProducts } from "./interface/response-get-products.interface";
import { RequestAddProduct } from "./dto/create-product.dto";

export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.page_size as string) || 100;
    const search = req.query.search as string | undefined;
    const categoryId = req.query.category_id
      ? parseInt(req.query.category_id as string)
      : undefined;
    const fromPrice = req.query.from_price
      ? parseFloat(req.query.from_price as string)
      : undefined;
    const toPrice = req.query.to_price
      ? parseFloat(req.query.to_price as string)
      : undefined;

    const orderBy = req.query.order_by as string | undefined;
    const sortBy = req.query.sort_by  as string | undefined;



    const response: ResponseGetProducts = await getProductsService(
      page,
      pageSize,
      search,
      categoryId,
      fromPrice,
      toPrice,
      orderBy,
      sortBy
    );

    res.status(200).json({
      message: "Successfully Get Products",
      data: response.data,
      meta: response.meta,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const response = await deleteProductService(id);

    res.status(200).json({
      message: "Successfully Delete Product",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const bodyRequest: RequestAddProduct = req.body; 
    const response = await createProductService(bodyRequest, req.file);

    res.status(201).json({
      message: "Successfully Create Product",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
