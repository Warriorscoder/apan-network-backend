const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider');

//test route
router.post('/create', async (req, res) => {
  try {
    const newProvider = new ServiceProvider(req.body);
    const saved = await newProvider.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
