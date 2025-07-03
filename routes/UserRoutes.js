const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createMessage, verifyOTP, completeSignup } = require('../controller/Authcontroller');


// CREATE a new user
// router.post('/create', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const savedUser = await user.save();
//     res.status(201).json({ success: true, data: savedUser });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });
 
// READ all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ single user by ID
router.get('/:id', async (req, res) => { 
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE user by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE user by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Post route to find the user by phone number
router.post('/find-user-by-phone', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// //test route
// // router.post('/create', async (req, res) => {
// //   try {
// //     const newUser = new User(req.body);
// //     const saved = await newUser.save();
// //     res.status(201).json(saved);
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// });


router.post('/create',  createMessage);
router.post('/verifyOTP' , verifyOTP);
router.post('/complete' ,   completeSignup);



module.exports = router;
  