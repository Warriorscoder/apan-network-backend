const exprss= require('express');
const router = exprss.Router();
const protect = require('../middleware/authMiddleware');
const { verifyOTP, createMessage, completeSignup } = require('../controller/authcontroller');


router.post("/sendOTP",createMessage)
router.post("/verifyOTP", verifyOTP);
router.post('/complete',completeSignup)




router.get('/dashboard', protect, (req, res) => {
  res.json({ success: true, message: `Welcome, user ${req.user.id} with role ${req.user.role}` });
});

module.exports = router; 