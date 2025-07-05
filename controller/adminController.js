
const Admin = require('../models/Admin');
const twilio = require('twilio');
const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const bcrypt = require('bcrypt');
const { createMessage } = require('./authcontroller');

exports.adminLogin = async (req, res) => {
  const { phone, password } = req.body;

  const admin = await Admin.findOne({ phone });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  req.body.phone = phone;
  return await createMessage(req, res);
};




exports.forgotPassword = async (req, res) => {
  const { phone } = req.body;

  const admin = await Admin.findOne({ phone });
  try {
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });



    }
    else {
      await createMessage(req, res);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });

  }



}

exports.resetPassword = async (req, res) => {
  const { phone, newPassword, otp } = req.body;

  try {
    const check = await client.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (check.status === "approved") {
      const admin = await Admin.findOne({ phone });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      await admin.save();


      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });




    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message,
    });

  }




}


