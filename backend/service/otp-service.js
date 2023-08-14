const crypto = require("crypto");
const hashService = require("./hash-service");
const smsSid = process.env.TWILIO_SID;
const smsAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }
  async sendBySMS(phone_number, otp) {
    await twilio.messages.create({
      to: phone_number,
      from: process.env.SMS_PHONE_NUMBER,
      body: `Your Codershouse OTP is: ${otp}`,
    });
  }
  verifyOtp(hashedOtp, data) {
    const computedOtp = hashService.hashOtp(data);
    return hashedOtp === computedOtp;
  }
}
module.exports = new OtpService();
