import UserRepository from "./user.repository.js";
import userDaoMongoDB from "../dao/user.dao.js";

const ContactDao = userDaoMongoDB;

export const UserRepo = new UserRepository(ContactDao);
