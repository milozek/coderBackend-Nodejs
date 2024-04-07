import ProductService from "../services/products.service.js";
import UserService from "../services/user.service.js";
export default class ProductController {
  static getALL() {
    const criteria = {};
    const options = { limit: 10, page: 1, sort: "desc" };
    return ProductService.getAll(criteria, options);
  }

  static async getById(id) {
    const product = await ProductService.getById(id);
    if (!product) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return product;
  }

  static async create(data) {
    const {
      title,
      description,
      thumbnail,
      size,
      price,
      code,
      stock,
      userEmail,
      role,
    } = data;

    const newProduct = {
      title,
      description,
      thumbnail,
      size,
      price,
      code,
      stock,
      owner: {
        email: userEmail,
        role: role,
      },
    };
    return await ProductService.create(newProduct);
  }

  static async deleteOne(pid, uid) {
    const user = await UserService.findById(uid);

    if (!user) {
      throw new NotFoundException(`User ${uid} not found`);
    }

    const product = await ProductService.getById(pid);

    if (!product) {
      throw new NotFoundException(`Product ${pid} not found`);
    }

    if (user.role === "premium" && product.owner.email !== user.email) {
      throw new ForbiddenException(
        "You don't have the credentials to delete this product"
      );
    }

    if (user.role === "admin") {
      const deletedProduct = await ProductService.deleteOne({ _id: pid });

      if (!deletedProduct) {
        throw new NotFoundException(`Product ${pid} not found`);
      }

      return deletedProduct;
    }

    // Si el usuario es el propietario del producto o es premium y le pertenece, se permite borrar
    if (
      user.email === product.owner.email ||
      (user.role === "premium" && user.email === product.owner.email)
    ) {
      const deletedProduct = await ProductService.deleteOne({ _id: pid });

      if (!deletedProduct) {
        throw new NotFoundException(`Product ${pid} not  found`);
      }

      return deletedProduct;
    } else {
      throw new ForbiddenException(
        "You don't have the credentials to delete this product"
      );
    }
  }
}
