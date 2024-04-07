import cartsDaoMongoDB from "../dao/cart.dao.js";
export default class CartService {
  static getByIdCart(uid) {
    return cartsDaoMongoDB.getByIdCartDao(uid);
  }
  static createOne(user) {
    return cartsDaoMongoDB.createOne(user);
  }
  static async updateOne(user, product) {
    return await cartsDaoMongoDB.updateOne(user, product);
  }
}
