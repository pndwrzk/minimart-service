import repository from "./cart.repository";
import { AddCartItem } from "./dto/add-cart-item.dto";
import { CartItemResponse } from "./interface/cart-item-response.interface";
import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} from "@/utils/custom-error";

import productRepository from "@modules/product/product.repository";
import { validateAddToCart } from "./validator/add-to-cart.validator";
import { DataValidator } from "@/utils/data-validator";

export const addToCartService = async (
  data: AddCartItem
): Promise<{ id: number }> => {

  const {error} = validateAddToCart(data);
  if(error){
     throw new BadRequestError(DataValidator(error));
  }
  const product = await productRepository.getProductById(data.product_id);
  if (!product) throw new NotFoundError("Product not found");
  const cartItem = await repository.getCartItemByCustomerIdAndProductId(
    data.customer_id,
    data.product_id
  );

  if (cartItem) {
    const newQuantity = cartItem.quantity + 1;
    if (newQuantity > product.stock)
      throw new BadRequestError(
        null,
        `Cannot add item to cart. Only ${product.stock} items in stock.`
      );

    const updated = await repository.updateCartItem(cartItem?.id!, {
      quantity: newQuantity,
    });

    if (!updated)
      throw new InternalServerError("Failed to update cart item quantity");
    return { id: cartItem?.id! };
  }

  if (!product.stock)
    throw new BadRequestError(
      null,
      `Cannot add item to cart. Only ${product.stock} items in stock.`
    );

  const newCartItem = await repository.createCartItem({
    ...data,
    quantity: 1,
  });
  if (!newCartItem || !newCartItem.id)
    throw new InternalServerError("Failed to add item to cart");

  return { id: newCartItem.id };
};

export const getCartService = async (
  customer_id: number
): Promise<{ items: CartItemResponse[]; sub_total: number }> => {
  const cartItems = await repository.getCartItemsByCustomer(customer_id);

  const items: CartItemResponse[] = cartItems.map((item) => ({
    id: item.id!,
    product_id: item.product_id,
    product_name: item.product?.name || "",
    quantity: item.quantity,
    price: Number(item.product?.price || 0),
    image_path: item.product?.image_path || undefined,
    total_price: Number(item.quantity) * Number(item.product?.price || 0),
  }));

  const sub_total = items.reduce((acc, item) => acc + item.total_price, 0);

  return { items, sub_total };
};



export const countCartItemsService = async (
  customer_id: number
): Promise<{ total_items: number }> => {
  const count = await repository.countCartItemsByCustomer(customer_id);
  return { total_items: count };
};
