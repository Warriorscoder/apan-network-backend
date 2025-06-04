const express = require('express');
const router = express.Router();
const Service = require('../models/Service');


//test route
router.post('/create', async (req, res) => {
  try {
    const newService = new Service(req.body);
    const saved = await newService.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
