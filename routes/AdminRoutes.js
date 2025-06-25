const express = require('express');
const { adminLogin, forgotPassword, resetPassword } = require('../controller/adminController');
const { verifyOTP } = require('../controller/authController'); // Use this unless you have a custom verifyAdminOTP

const router = express.Router();

router.post('/create', adminLogin);
router.post('/verifyOTP', verifyOTP); // or verifyAdminOTP if defined
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

module.exports = router;
