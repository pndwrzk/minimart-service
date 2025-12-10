import express from "express";
import multer from "multer";
import { authenticate } from "@/middlewares/auth.middleware";

import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoriesController,
} from "@/modules/category/category.controller";

import {
  registerUserController,
  loginUserController,
} from "@/modules/user/user.controller";

import {
  registerCustomerController,
  loginCustomerController,
  refreshTokenCustomerController
} from "@/modules/customer/customer.controller";

import {
  getProductsController,
  deleteProductController,
  createProductController,
} from "@/modules/product/product.controller";

import {
  addToCartController,
  getCartController,
  countCartItemsController,
} from "@/modules/cart/cart.controller";

import { checkoutOrderController, getOrdersByStatusController } from "@/modules/order/order.controller";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/users/register", registerUserController);
router.post("/users/login", loginUserController);
router.post("/customers/register", registerCustomerController);
router.post("/customers/login", loginCustomerController);
router.post("/customers/refresh-token", refreshTokenCustomerController);

router.get("/categories", getCategoriesController);
router.get("/products", getProductsController);

router.use(authenticate);

router.post("/categories", createCategoryController);
router.patch("/categories/:id", updateCategoryController);
router.delete("/categories/:id", deleteCategoryController);

router.post("/products", upload.single("image"), createProductController);
router.delete("/products/:id", deleteProductController);

router.post("/cart", addToCartController);
router.get("/cart", getCartController);
router.get("/cart/count", countCartItemsController);

router.post("/orders", checkoutOrderController);
router.get("/orders", getOrdersByStatusController);

export default router;
