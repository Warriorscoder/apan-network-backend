const express = require('express');
const { adminLogin } = require('../controller/adminController');
const { verifyAdminOTP } = require('../controller/authController');
const { forgotPassword}= require('../controller/adminController');
const { resetPassword } = require('../controller/adminController');
// AdminRoutes.js
const router = express.Router();

router.post('/create',adminLogin);
router.post('/verifyOTP' , verifyAdminOTP);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);


module.exports = router;