const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/count', async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ count });
  } catch (err) {
    console.error('Error fetching notification count:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
