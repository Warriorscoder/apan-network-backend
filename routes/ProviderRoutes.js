const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider');

const {
  completeSignup,
  createMessage,
  verifyOTP,
} = require('../controller/authController');

// Twilio Auth Routes
router.post('/create', createMessage);
router.post('/verifyOTP', verifyOTP);
router.post('/complete', completeSignup);

// CRUD Routes
router.post('/provider', async (req, res) => {
  try {
    const serviceProvider = new ServiceProvider(req.body);
    const savedProvider = await serviceProvider.save();
    res.status(201).json({ success: true, savedProvider });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/provider', async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.json({ success: true, providers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/provider/:id', async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, provider });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/provider/:id', async (req, res) => {
  try {
    const updated = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/provider/:id', async (req, res) => {
  try {
    const deleted = await ServiceProvider.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
