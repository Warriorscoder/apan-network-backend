const exprss= require('express');
const router = exprss.Router();
const {createMessage, completeSignup} = require('../controller/authController');
const {verifyOTP} = require('../controller/authController');

const protect = require('../middleware/authMiddleware');


router.post("/sendOTP",createMessage)
router.post("/verifyOTP", verifyOTP);
router.post('/complete',completeSignup)




router.get('/dashboard', protect, (req, res) => {
  res.json({ success: true, message: `Welcome, user ${req.user.id} with role ${req.user.role}` });
});

module.exports = router;