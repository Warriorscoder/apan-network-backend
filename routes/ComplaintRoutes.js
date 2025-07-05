const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.post('/create', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find()
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) {
      return res.status(404).json({ success: false, error: 'Complaint not found' });
    }
    res.json({ success: true, data: complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/userid/:userId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ user_id: req.params.userId });
    if (!complaints.length) {
      return res.status(404).json({ success: false, error: 'No complaints found for this user' });
    }
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/providerid/:providerId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ provider_id: req.params.providerId });
    if (!complaints.length) {
      return res.status(404).json({ success: false, error: 'No complaints found for this provider' });
    }
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/serviceid/:serviceId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ service_id: req.params.serviceId });
    if (!complaints.length) {
      return res.status(404).json({ success: false, error: 'No complaints found for this service' });
    }
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('update/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!complaint) {
      return res.status(404).json({ success: false, error: 'Complaint not found' });
    }
    res.json({ success: true, data: complaint });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.delete('delete/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, error: 'Complaint not found' });
    }
    res.json({ success: true, message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
