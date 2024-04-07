import productsModel from "./models/products.model.js";

export default class productsDaoMongoDB {
  static getAll(criteria = {}, options = {}) {
    return productsModel.paginate(criteria, options);
  }

  static create(data) {
    return productsModel.create(data);
  }

  static updateById(tid, data) {
    return productsModel.updateOne({ _id: tid }, { $inc: { stock: data } });
  }

  static deleteOne(tid) {
    return productsModel.deleteOne({ _id: tid });
  }

  static getById(id) {
    return productsModel.findById(id);
  }

  static insertMany(usersData) {
  
    return productsModel.insertMany(usersData);
  }


}
