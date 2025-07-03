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
  // router.get('/:id', async (req, res) => {
  //   try {
  //     const provider = await ServiceProvider.findById(req.params.id);
  //     if (!provider) return res.status(404).json({ message: 'ServiceProvider not found' });
  //     res.json({success:true, provider});
  //   } catch (err) {
  //     res.status(500).json({ success:false, message: err.message });
  //   }
  // });

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





const { completeProviderSignup, aboutProvider }= require('../controller/authController');
const { createMessage } = require('../controller/authController');
const { verifyProviderOTP } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

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


router.post('/create',  createMessage);
router.post('/verifyOTP' , verifyProviderOTP);
router.post('/complete' , completeProviderSignup);
router.get('/me',authMiddleware, aboutProvider)

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
