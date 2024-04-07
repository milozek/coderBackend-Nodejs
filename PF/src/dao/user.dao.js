import userRegisterModel from "./models/userRegister.model.js";
export default class userDaoMongoDB {
  static findById(userId) {
    return userRegisterModel.findById(userId);
  }

  static updatePassword(userId, newPassword) {
    return userRegisterModel.updateOne(
      { _id: userId },
      { $set: { password: newPassword } }
    );
  }

  static async updateRole(userId, newRole) {
    try {
      return await userRegisterModel.updateOne(
        { _id: userId },
        { $set: { role: newRole } }
      );
    } catch (error) {
      throw new Error(`Error updating role: ${error.message}`);
    }
  }

  static async updateDocument(userId, newOBJDocument) {
    try {
      return await userRegisterModel.updateOne(
        { _id: userId },
        { $set: { documents: newOBJDocument } }
      );
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }
}
