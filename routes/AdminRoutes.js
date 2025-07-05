const express = require('express');
const { adminLogin, forgotPassword, resetPassword } = require('../controller/adminController');
const { verifyOTP } = require('../controller/authcontroller'); 

const router = express.Router();

router.post('/create', adminLogin);
router.post('/verifyOTP', verifyOTP); 
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

module.exports = router;
