const twilio = require("twilio"); 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);

const User = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider");
const jwt = require("jsonwebtoken");
const JsonWebTokenError = require("jsonwebtoken");

exports.createMessage = async (req, res) => {
  console.log(accountSid, authToken);

  const { phone } = req.body;
  console.log("Phone number received:", phone);
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });

    console.log(`Sent verification: '${verification.sid}'`);
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: err.message,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp , role } = req.body;
  try {
    const check = await client.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });
        //  if(check.status ==="approved")


        //   res.status(200).json({
        //     success: true,  })



    if (check.status === "approved") {
         const model = role === "provider" ? ServiceProvider : User;
         console.log(model);

      const user = await model.findOne({phone});
      if (user){
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user,
        });
      }


      else{
      return res.status(200).json({
        success: true,
        newUser: true,
        message: "OTP verified. Please complete signup.",
        phone: `+91${phone}`,
      });
    }
    }




  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
};

exports.completeSignup = async (req, res) => {
  const { phone, name, role, email,location,skills,experience,availability} = req.body;
  console.log( { phone, name, role, email,location,skills,experience,availability} );

   const model = role === "provider" ? ServiceProvider : User;
  try {
    const existing = await model.findOne({ phone: `${phone}` });
    console.log("Existing user:", existing);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser= new model({phone, name, role, email,location,skills,experience,availability});
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to complete signup",
      error: err.message,
    });
  }
};