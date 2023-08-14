const crypto = require("crypto");

class HashService {
  hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data.toString())
      .digest("hex");
  }
}

module.exports = new HashService();
