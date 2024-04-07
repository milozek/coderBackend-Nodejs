import { Router } from "express";
import ProductController from "../../controllers/products.controller.js";
import { generatorUserError } from "../../errors/CauseMessageError.js";
import { CustomError } from "../../errors/CustomError.js";
import EnumsError from "../../errors/EnumsError.js";
import authMiddleware from "../../config/auth.validation.jwt.js";
const router = Router();

router.get(
  "/products",
  authMiddleware(["admin", "premium"]),
  async (req, res) => {
    try {
      const { limit, page, sort, search } = req.query;
      const products = await ProductController.getALL({
        limit,
        page,
        sort,
        search,
      });

      res.status(200).render("createProducts", products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/editUser",
  authMiddleware(["admin", "premium", "user"]),
  async (req, res) => {
    try {
      const user = req.user;

      res.status(200).render("editUser", user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/getProduct/:pid",
  authMiddleware(["admin", "premium", "user"]),
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await ProductController.getById(pid);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/product",
  authMiddleware(["admin", "premium"]),
  async (req, res, next) => {
    try {
      const { title, description, thumbnail, size, price, code, stock } =
        req.body;
      const userEmail = req.user.email;
      const role = req.user.role;

      const dataSend = {
        title,
        description,
        thumbnail,
        size,
        price,
        code,
        stock,
        userEmail,
        role,
      };

      if (
        !title ||
        !description ||
        !thumbnail ||
        !size ||
        isNaN(price) ||
        !code ||
        isNaN(code) ||
        !stock ||
        isNaN(stock)
      ) {
        const error = CustomError.create({
          name: "The data is unreachable",
          cause: generatorUserError(dataSend),
          message: "The data is unreachable",
          code: EnumsError.BAD_REQUEST_ERROR,
        });

        throw error;
      }

      const product = await ProductController.create(dataSend);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/deleteProduct/:pid/:uid",
  authMiddleware(["admin", "premium"]),
  async (req, res) => {
    try {
      const { pid } = req.params;
      const { uid } = req.params;

      const result = await ProductController.deleteOne(pid, uid);

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        // Product not found
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
