const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);
const admin = require("../models/Admin");



const User = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const otp = "123456"


exports.createMessage = async (req, res) => {
  // console.log(accountSid, authToken);

  const { phone } = req.body;
  console.log("Phone number received:", phone);

  console.log("Generated OTP:", otp);


  try {
    // const verification = await client.verify.v2
    //   .services(process.env.TWILIO_VERIFY_SERVICE_SID)
    //   .verifications.create({
    //     to: `+91${phone}`,
    //     channel: "sms",
    //   });

    // console.log(`Sent verification: '${verification.sid}'`);
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


exports.verifyProviderOTP = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    // const check = await client.verify.v2
    //   .services(VERIFY_SERVICE_SID)
    //   .verificationChecks.create({
    //     to: `+91${phone}`,
    //     code: otp,
    //   });
    //  if(check.status ==="approved")


    //   res.status(200).json({
    //     success: true,  })



    if (otp === "123456") {



      const provider = await ServiceProvider.findOne({ phone });
      if (provider) {
        const token = jwt.sign(
          { id: provider._id, role: "provider", name: provider.name, phone: phone, email: provider.email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );




        return res.status(200).json({
          success: true,
          message: "Login successful",
          existing: true,
          token,
          provider,
        });
      }



      return res.status(200).json({
        success: true,
        newUser: true,
        message: "OTP verified. Please complete signup.",
        phone: `${phone}`,
      });
    }
    else {
      return res.status(404).json({
        success: false,
        message: "Invalid OTP",
        error: error.message,
      });
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

exports.verifyUserOTP = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    // const check = await client.verify.v2
    //   .services(VERIFY_SERVICE_SID)
    //   .verificationChecks.create({
    //     to: `+91${phone}`,
    //     code: otp,
    // });
    //  if(check.status ==="approved")



    //   res.status(200).json({
    //     success: true,  })



    if (otp === "123456") {


      const user = await User.findOne({ phone });
      if (user) {
        const token = jwt.sign(
          { id: user._id, role: "user", name: user.name, phone: phone, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        //   res.status(200).json({
        //     success: true,  })





        // console.log("token from otp verify ", token)
        return res.status(200).json({
          success: true,
          message: "Login successful",
          existing: true,
          token,
          user,
        });
      }


      else {
        return res.status(200).json({
          success: true,
          newUser: true,
          message: "OTP verified. Please complete signup.",
          phone: `+91${phone}`,
        });
      }
    }

    else {
      return res.status(404).json({
        success: false,
        message: "Invalid OTP",
        error: error.message,
      });
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

exports.aboutProvider = async (req, res) => {


  try {
    const provider = await ServiceProvider.findById(req.user.id).select('-password');

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Provider details retrieved successfully',
      provider
    });
  } catch (error) {
    console.error('Error in /providers/me:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }

}

exports.verifyAdminOTP = async (req, res) => {
  const { phone, password, otp } = req.body;
  const Admin = await admin.findOne({ phone });
  // const isMatch =  bcrypt.compare(password, Admin.password);


  try {
    // const check = await client.verify.v2
    //   .services(VERIFY_SERVICE_SID)
    //   .verificationChecks.create({
    //     to: `+91${phone}`,
    //     code: otp,
    //   });
    //  if(check.status ==="approved")


    //   res.status(200).json({
    //     success: true,  })



    if (otp === "123456") {


      const user = await admin.findOne({ phone });
      if (user) {
        const token = jwt.sign(

          { id: user._id, role: "admin", name: user.name, date: user.createdAt, phone: user.phone },



          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        console.log('created at date:', user.createdAt);

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          admin: {

            _id: user._id,
            name: user.name,
            phone: user.phone,
            date: user.createdAt
          }

        });

      }


      else {
        return res.status(200).json({
          success: true,
          newUser: true,
          message: "OTP verified",
          phone: `+91${phone}`,
        });
      }





    }
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
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









exports.completeProviderSignup = async (req, res) => {
  const { phone, name, role, aadhar, fatherName, village, email, dob, location, availability } = req.body;


  try {
    const existing = await ServiceProvider.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    console.log("Existing user:", existing);
    if (existing) {
      return res.status(400).json({ message: "User already exists with phone or email " });
    }

    const newUser = new ServiceProvider({ phone, name, role, dob, aadhar, fatherName, village, email, location, availability });
    await newUser.save();


    // Generate JWT token for the new user


    const token = jwt.sign(

      { id: newUser._id, role: "provider", name: newUser.name, phone: phone, email: email },

      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      success: true,
      message: "Signup successfull",
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

exports.completeUserSignup = async (req, res) => {
  const { phone, name, role, gender, address, location, email } = req.body;
  console.log({ phone, name, role, gender, address, location, email });

  try {
    const existing = await User.findOne({ phone: `${phone}`, email: `${email}` });
    console.log("Existing user:", existing);
    if (existing) {
      return res.status(400).json({ message: "User already exists with phone or email " });
    }

    const newUser = new User({
      phone,
      name,
      gender,
      address,
      location,
      email
    });
    await newUser.save();

    const token = jwt.sign(

      { id: newUser._id, role: "user", name: newUser.name, phone: phone, email: email },

      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      success: true,
      message: "Signup successfull",
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