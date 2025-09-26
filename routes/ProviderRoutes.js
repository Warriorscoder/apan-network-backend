
const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider');

// CREATE a new ServiceProvider
// router.post('/create', async (req, res) => {
//   try {
//     const serviceProvider = new ServiceProvider(req.body);
//     const savedProvider = await serviceProvider.save();
//     res.status(201).json({success:true, savedProvider});
//   } catch (err) {
//     res.status(400).json({ success:false, message: err.message });
//   }
// });

// READ all ServiceProviders
router.get('/', async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.json({success:true, providers});
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

// READ single ServiceProvider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: 'ServiceProvider not found' });
    res.json({success:true, provider});
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

//Checks if a service provider's email is unique
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const provider = await ServiceProvider.findOne({ email: email });

    if (provider) {
      // If a provider is found, the email is not unique
      res.json({ success: true, isUnique: false, message: 'Email is already in use.' });
    } else {
      // If no provider is found, the email is unique
      res.json({ success: true, isUnique: true, message: 'Email is available.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE a ServiceProvider by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedProvider = await ServiceProvider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProvider) return res.status(404).json({success:false, message: 'ServiceProvider not found' });
    res.json({ success:true, updatedProvider});
  } catch (err) {
    res.status(400).json({success:false, message: err.message });
  }
});

// DELETE a ServiceProvider by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedProvider = await ServiceProvider.findByIdAndDelete(req.params.id);
    if (!deletedProvider) return res.status(404).json({ success:false, message: 'ServiceProvider not found' });
    res.json({ success:true, message: 'ServiceProvider deleted successfully' });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  } 
});

router.post('/multi-by-id', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of provider IDs' });
    }

    const providers = await ServiceProvider.find({ _id: { $in: ids } });

    res.json({ success: true, providers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



const { completeProviderSignup, aboutProvider }= require('../controller/authController');
const { createMessage } = require('../controller/authController');
const { verifyProviderOTP } = require('../controller/authController');
const {verifyProviderToken }= require('../middleware/authMiddleware');



router.post('/create',  createMessage);
router.post('/verifyOTP' , verifyProviderOTP);
router.post('/complete' , completeProviderSignup);
router.get('/me',verifyProviderToken , aboutProvider);

module.exports = router;
