class UserDTO {
  id;
  phone_number;
  createdAt;
  activated;

  constructor(user) {
    this.activated = user.activated;
    this.id = user._id;
    this.phone_number = user.phone_number;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDTO;
