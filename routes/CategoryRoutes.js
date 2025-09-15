const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Adjust the path as needed

router.post('/bulk', async (req, res) => {
  try {
    const categories = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    const result = await Category.insertMany(categories, { ordered: false }); // ignore duplicates if any

    res.status(201).json({
      success: true,
      message: `${result.length} categories inserted successfully`,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Bulk insert failed",
      error: err.message,
    });
  }
});


// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET a category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET a category by key
router.get('/key/:key', async (req, res) => {
  try {
    const category = await Category.findOne({ key: req.params.key });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// UPDATE a category
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE a category
router.delete('/:key', async (req, res) => {
  try {
    
    const deleted = await Category.findOneAndDelete({ key: req.params.key });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
