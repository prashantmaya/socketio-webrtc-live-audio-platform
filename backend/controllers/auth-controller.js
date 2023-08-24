const OtpService = require("../service/otp-service.js");
const HashService = require("../service/hash-service.js");
const UserService = require("../service/user-service.js");
const TokenService = require("../service/token-service.js");
const UserDTO = require("../dtos/user-dto.js");

class AuthController {
  async sendOtp(req, res) {
    try {
      const { phone_number } = req.body;

      if (!phone_number) {
        return res.status(400).json({ message: "Phone number is required." });
      }

      const otp = await OtpService.generateOtp();
      const ttl = 1000 * 60 * 10;
      const expires = Date.now() + ttl;
      const data = `${phone_number}.${otp}.${expires}`;
      const hashedOtp = HashService.hashOtp(data);

      // await OtpService.sendBySMS(phone_number, otp);

      return res.status(200).json({
        hash: `${hashedOtp}.${expires}`,
        phone_number,
        otp: otp,
      });
    } catch (error) {
      console.error("OTP sending failed:", error);
      return res
        .status(500)
        .json({ message: "OTP sending failed.", error: error });
    }
  }

  async verifyOtp(req, res) {
    const { phone_number, otp, hash } = req.body;

    if (!phone_number || !otp || !hash) {
      return res.status(400).json({
        message: "Invalid Parameters.",
      });
    }

    const [hashedOtp, expires] = hash.split(".");

    //verify otp.
    if (Date.now() > +expires) {
      return res.status(500).json({
        message: "OTP expired",
      });
    }

    const data = `${phone_number}.${+otp}.${expires}`;
    const isValid = OtpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(500).json({
        message: "Invalid OTP.",
      });
    }

    let user;
    let accessToken;
    let refreshToken;

    // get or create user.

    try {
      user = await UserService.findUser({ phone_number });
      if (!user) {
        user = await UserService.createUser({ phone_number });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(400).json({ message: "Error while creating user." });
    }

    //generate tokens.
    ({ accessToken, refreshToken } = TokenService.generateTokens({
      _id: user._id,
      activated: false,
    }));

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    //Serializing data.

    const userDTO = new UserDTO(user);

    res.json({ accessToken, user: userDTO });
  }
}

module.exports = new AuthController(); //singleton pattern. [Each time when we will call this class, so we will get the same object.]
