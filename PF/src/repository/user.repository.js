import UserDTO from "../dto/user.dto.js";

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async findById(uid) {
    let contact = await this.dao.findById(uid);
    if (contact) {
      contact = [new UserDTO(contact)];
    }
    return contact;
  }
}
