const express = require('express');

const { adminLogin } = require('../controller/adminController');
const { verifyAdminOTP } = require('../controller/authController');
const { forgotPassword}= require('../controller/adminController');
const { resetPassword } = require('../controller/adminController');
const {verifyResetOTP } = require('../controller/adminController');
// AdminRoutes.js

const router = express.Router();

router.post('/create', adminLogin);
router.post('/verifyOTP', verifyOTP); // or verifyAdminOTP if defined
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetOTP', verifyResetOTP);

router.post('/resetPassword', resetPassword);

module.exports = router;
