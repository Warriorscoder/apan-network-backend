const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// CREATE a new service
router.post('/create', async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(201).json({ success: true, data: savedService });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// CREATE multiple services
router.post('/create-multiple', async (req, res) => {
  try {
    const servicesData = req.body;

    if (!Array.isArray(servicesData) || servicesData.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body must be a non-empty array of service objects.',
      });
    }

    const savedServices = await Service.insertMany(servicesData);
    res.status(201).json({ success: true, data: savedServices });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// READ all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ single service by ID
router.get('/by_service_id/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ all services by provider_id
router.get('/by_provider_id/:provider_id', async (req, res) => {
  try {
    const services = await Service.find({ provider_id: req.params.provider_id });
    if (services.length === 0) {
      return res.status(404).json({ success: false, message: 'No services found for this provider' });
    }
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// UPDATE service by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedService) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: updatedService });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE service by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
