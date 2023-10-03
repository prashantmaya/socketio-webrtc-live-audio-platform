class UserDTO {
  id;
  phone_number;
  createdAt;
  activated;
  name;
  avatar;
  constructor(user) {
    this.activated = user.activated;
    this.id = user._id;
    this.phone_number = user.phone_number;
    this.createdAt = user.createdAt;
    this.name = user.name;
    this.avatar = user.avatar;
  }
}

module.exports = UserDTO;
