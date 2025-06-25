const express = require('express');
const router = express.Router();
const Reviews = require('../models/Reviews');

// CREATE a new review
router.post('/create', async (req, res) => {
  try {
    const review = new Reviews(req.body);
    const savedReview = await review.save();
    res.status(201).json({ success: true, data: savedReview });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// READ all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ all reviews by provider_id
router.get('/by_provider_id/:provider_id', async (req, res) => {
  try {
    const reviews = await Reviews.find({ provider_id: req.params.provider_id });
    if (reviews.length === 0) {
      return res.status(404).json({ success: false, message: 'No reviews found for this provider' });
    }
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ all reviews by user_id
router.get('/by_user_id/:user_id', async (req, res) => {
  try {
    const reviews = await Reviews.find({ user_id: req.params.user_id });
    if (reviews.length === 0) {
      return res.status(404).json({ success: false, message: 'No reviews found for this user' });
    }
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ single review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE review by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedReview = await Reviews.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReview) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, data: updatedReview });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE review by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedReview = await Reviews.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
