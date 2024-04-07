import productsDaoMongoDB from "../dao/products.dao.js";

export default class ProductService {
  static getAll(criteria = {}, options = {}) {
    return productsDaoMongoDB.getAll(criteria, options);
  }

  static create(data) {
    return productsDaoMongoDB.create({ ...data });
  }

  static updateById(tid, data) {
    return productsDaoMongoDB.updateById(tid, data);
  }

  static deleteOne(tid) {
    return productsDaoMongoDB.deleteOne(tid);
  }

  static getById(id) {
    return productsDaoMongoDB.getById(id);
  }

  static insertMany(usersData) {

    return productsDaoMongoDB.insertMany(usersData);
  }


}
