import cartsModel from "./models/carts.models.js";
export default class cartsDaoMongoDB {
  static async getByIdCartDao(userID) {
    return await cartsModel
      .findOne({ user: userID })
      .populate("products.product");
  }

  static async createOne(user) {
    return await cartsModel.create({ user: user, products: [] });
  }

  static async updateOne(user, product) {
    return await cartsModel.updateOne({ user: user, products: product });
  }
}
