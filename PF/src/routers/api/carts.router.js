import { Router } from "express";
import CartsController from "../../controllers/cart.controller.js";
import TicketController from "../../controllers/ticket.controller.js";
import { CustomError } from "../../errors/CustomError.js";
import { generatorID } from "../../errors/CauseMessageError.js";
import EnumsError from "../../errors/EnumsError.js";
import { logger } from "../../config/logger.js";
import authMiddleware from "../../config/auth.validation.jwt.js";
const router = Router();

/* mostrar el carrito */
router.get(
  "/cartsview/:uid",
  authMiddleware(["admin", "premium", "user"]),
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log("holahola", req);
      const { uid } = req.params;
      const cart = await CartsController.getById(uid);

      if (!cart) {
        const customError = CustomError.create({
          name: "NoDataError",
          message: "You have to log in or create a product",
          cause: generatorID(),
          code: EnumsError.NOT_USER_REGISTER,
        });

        throw customError;
      }

      const acceptsJSON = req.accepts("json");

      if (acceptsJSON) {
        res.json({
          status: "success",

          payload: cart.toJSON(),
        });
      } else {
        res.render("cart", {
          cart: cart.toJSON(),
          user: uid,
          title: "carrito",
        });
      }
    } catch (error) {
      console.error("Message:", error.message);
      next(error);
    }
  }
);

router.post(
  "/add-to-cart/:productId",
  /* authMiddleware(["admin", "premium", "user"]), */ async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user._id;

      logger.info(`Adding product ${productId} to the cart for user ${userId}`);

      const result = await CartsController.addToCart(userId, productId);

      if (result.success) {
        console.log(`Product added successfully: ${result.message}`);
        return res.json({ message: result.message });
      } else {
        console.error(`Error adding product to cart: ${result.error}`);
        return res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error(`An unexpected error occurred: ${error}`);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);

router.get(
  "/purcherase/:cid",
  authMiddleware(["admin", "premium", "user"]),
  async (req, res) => {
    const { cid } = req.params;

    const ticket = await TicketController.generateTicket(cid);

    res.status(200).json({ ticket });
  }
);

export default router;
