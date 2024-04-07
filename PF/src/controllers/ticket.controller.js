import TicketService from "../services/ticket.service.js";
import CartService from "../services/cart.service.js";
import UserController from "./user.controller.js";
import ProductService from "../services/products.service.js";

export default class TicketController {
  static async generateTicket(cartId) {
    try {
      const cart = await CartService.getByIdCart(cartId);
      const getUser = await UserController.findById(cart.user.toString());
      const userEmail = getUser[0].email;

      // Buscar los productos que superan el stock y separarlos
      let outStock = [];
      let cartWithStock = cart.products.filter((item) => {
        const stockQuantity = item.product.stock;
        const purchaseQuantity = item.quantity;

        if (stockQuantity < purchaseQuantity) {
          console.log(
            "Product without stock",
            item.product.code,
            stockQuantity,
            purchaseQuantity
          );
          outStock.push(item.product.code);
          return false;
        }

        return true;
      });

      // Actualizar la base de datos
      const updateDataBasePromises = cartWithStock.map(async (item) => {
        const idProducto = item.product.id;
        const quantity = -item.quantity;
        await ProductService.updateById(idProducto, quantity);
      });

      // Esperar a que todas las actualizaciones se completen
      await Promise.all(updateDataBasePromises);

      // Obtener el monto total
      const total = cartWithStock.reduce(
        (total, productEntry) =>
          total + productEntry.product.price * productEntry.quantity,
        0
      );

      console.log("Products with no stock:", outStock);

      // Crear el nuevo ticket
      const newTicket = {
        amount: total,
        purchaser: userEmail,
      };

      // Generar el ticket
      const generatedTicket = await TicketService.generateTicket(newTicket);

      return {
        outStock: outStock,
        generatedTicket: generatedTicket,
      };
    } catch (error) {
      console.error("Error while creating ticket:", error);
      throw error;
    }
  }
}
