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

      const otp = 7777;
      const ttl = 1000 * 60 * 10;
      const expires = Date.now() + ttl;
      const data = `${phone_number}.${otp}.${expires}`;
      const hashedOtp = HashService.hashOtp(data);

      // await OtpService.sendBySMS(phone_number, otp);

      return res.status(200).json({
        hash: `${hashedOtp}.${expires}`,
        phone_number,
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

    await TokenService.storeRefreshToken(refreshToken, user._id);
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

  async refresh(req, res) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // check if token is valid
    let userData;
    try {
      userData = await TokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // Check if token is in db
    try {
      const token = await TokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // check if valid user
    const user = await UserService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    // Generate new tokens
    const { refreshToken, accessToken } = TokenService.generateTokens({
      _id: userData._id,
    });

    // Update refresh token
    try {
      await TokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // response
    const userDto = new UserDTO(user);
    res.json({ user: userDto, auth: true });
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      await TokenService.removeToken(refreshToken); //remove token from DB.

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.json({ user: null, auth: false });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
}

module.exports = new AuthController(); //singleton pattern. [Each time when we will call this class, so we will get the same object.]
