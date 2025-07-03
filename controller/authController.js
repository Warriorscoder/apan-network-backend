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


exports.createMessage = async (req, res) => {
  console.log(accountSid, authToken);

  const { phone } = req.body;
  console.log("Phone number received:", phone);
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log("Generated OTP:", otp);
  

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


exports.verifyProviderOTP = async (req, res) => {
  const { phone, otp  } = req.body;
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
         
         
      const provider = await ServiceProvider.findOne({phone});
      if (provider){
        const token = jwt.sign(
          { id: provider._id, role: provider.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          provider,
        });
      }

      
      
      return res.status(200).json({
        success: true,
        newUser: true,
        message: "OTP verified. Please complete signup.",
        phone: `+91${phone}`,
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
  const { phone, otp  } = req.body;
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
        
         
      const user = await User.findOne({phone});
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

exports.aboutProvider = async (req,res)=>{


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



 


exports.verifyAdminOTP = async (req,res) => {
  const { phone, password ,otp   } = req.body;
  const Admin = await admin.findOne({ phone });
  // const isMatch =  bcrypt.compare(password, Admin.password);

 
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
        
         
      const user = await admin.findOne({phone});
      if (user){
        const token = jwt.sign(
          { id: user._id },
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

      
      else {
      return res.status(200).json({
        success: true,
        newUser: true,
        message: "OTP verified",
        phone: `+91${phone}`,
      });
    } 
    

    

    
  }
  else{
    return res.status(400).json({
      success: false,
      message: "OTP verification failed",
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
  const { phone, name, role,adhaar, fatherName, village, email,dob,location,skills,experience,availability} = req.body;
 
  
  try {
    const existing = await ServiceProvider.findOne({ phone: `${phone}` });
    console.log("Existing user:", existing);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser= new  ServiceProvider({phone, name, role,dob, adhaar, fatherName,village,email,location,skills,experience,availability});
    await newUser.save();


    // Generate JWT token for the new user
     

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

exports.completeUserSignup = async (req, res) => {
  const { phone, name, role,gender,adress,location} = req.body;
  console.log( { phone, name, role,location} );
  
   
  try {
    const existing = await User.findOne({ phone: `${phone}` });
    console.log("Existing user:", existing);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser= new User({phone, name, role, gender,adress,location});
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

