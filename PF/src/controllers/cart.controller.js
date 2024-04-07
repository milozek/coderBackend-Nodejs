import CartService from "../services/cart.service.js";
import UserService from "../services/user.service.js";
import ProductService from "../services/products.service.js";

export default class CartsController {
  static async getById(cartId) {
    const cart = await CartService.getByIdCart(cartId);

    return cart;
  }

  static async addToCart(uid, pid) {
    try {
      const user = await UserService.findById(uid);

      let cart = await CartService.getByIdCart(user._id);

      const product = await ProductService.getById(pid);

      if (!cart) {
        cart = await CartService.createOne(user._id);
      }

      const existingProductIndex = cart.products.findIndex((item) =>
        item.product.equals(product._id)
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }

      await cart.save();

      return {
        success: true,
        message: "Product added to the cart",
      };
    } catch (error) {
      console.error("Error while adding product to the cart:", error);
      return { success: false, error: "Server internal error." };
    }
  }

  static async deleteOne(uid, productId) {
    const getCart = await CartService.getByIdCart(uid);

    const deleteProduct = getCart.products.findIndex(
      (producto) => producto.id === productId
    );

    if (deleteProduct !== -1) {
      getCart.products.splice(deleteProduct, 1);
      console.log(`Product ${productId} deleted.`);
    } else {
      console.log(`The product ${productId} doesn't exist.`);
    }

    const updateCart = await CartService.updateOne(uid, getCart.products);

    return updateCart;
  }
}
