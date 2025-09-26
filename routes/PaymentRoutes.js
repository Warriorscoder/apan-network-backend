const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // <-- ADD THIS IMPORT
const ServiceProvider = require('../models/ServiceProvider'); // <-- ADD THIS IMPORT (adjust path as needed)
const router = express.Router();

// Initialize Razorpay instance from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


/**
 * =============================================================
 * ROUTE 1: Create a Razorpay Order
 * =============================================================
 * @route   POST /api/payment/create-order
 */
router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: 9900, // Amount in paise (e.g., ₹100.00)
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error in /create-order:', error);
    res.status(500).send('Server Error');
  }
});


/**
 * =============================================================
 * ROUTE 2: Verify Payment & Save Provider Data
 * =============================================================
 * @route   POST /api/payment/verify-payment
 */
router.post('/verify-payment', async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    providerData, // This object contains all the form data
  } = req.body;

  // 1. VERIFY THE PAYMENT SIGNATURE
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Payment verification failed' });
  }

  // --- PAYMENT IS VERIFIED, NOW EXECUTE YOUR SIGNUP LOGIC ---
  
  // 2. Destructure data from the 'providerData' object
  const { phone, name, role, aadhar, fatherName, village, email, dob, location, availability } = providerData;

  try {
    // 3. Check if user already exists
    const existing = await ServiceProvider.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (existing) {
      // This is an important edge case. The payment was successful, but the user
      // already exists. Respond with a clear message.
      console.log(`Payment successful for an existing user: ${email}/${phone}`);
      return res.status(409).json({ // 409 Conflict is a good status code here
        success: false,
        message: "Payment successful, but an account with this phone or email already exists. Please contact support."
      });
    }

    // 4. Create and save the new provider
    const newUser = new ServiceProvider({ phone, name, role, dob, aadhar, fatherName, village, email, location, availability });
    await newUser.save();
    console.log("New provider saved to DB:", newUser._id);

    // 5. Generate JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id, role: "provider", name: newUser.name, phone: phone, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Send the final success response
    res.status(201).json({
      success: true,
      message: "Signup successful!",
      token,
      user: newUser,
    });
  } catch (err) {
    console.error('Error saving provider after payment:', err);
    res.status(500).json({
      success: false,
      message: 'Payment successful, but registration failed. Please contact support.',
      error: err.message,
    });
  }
});

module.exports = router;