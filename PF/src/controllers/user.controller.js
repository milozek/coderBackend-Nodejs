import { UserRepo } from "../repository/index.js";
import userDaoMongoDB from "../dao/user.dao.js";
export default class UserController {
  static async findById(userID) {
    const userDTOArray = await UserRepo.findById(userID);
    return userDTOArray;
  }

  static updateRole(userId, newRole) {
    return userDaoMongoDB(userId, newRole);
  }
}
