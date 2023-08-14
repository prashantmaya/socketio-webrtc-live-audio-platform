const UserModel = require("../models/user-model.js");

class UserService {
  async findUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }
  async createUser(filter) {
    const user = await UserModel.create(filter);
    return user;
  }
}

module.exports = new UserService();
