const express = require('express');
const router = express.Router();
const {
  addSuccessStory,
  getAllSuccessStories,
  getSuccessStoryById,
  updateSuccessStory,
  deleteSuccessStory,
  approveSuccessStory,
  rejectSuccessStory,
  featureSuccessStory
} = require('../controller/successStoryController');

// Public (filtered via ?status=approved) or admin (all)
router.get('/', getAllSuccessStories);

// Create (pending)
router.post('/add', addSuccessStory);

router.get('/:id', getSuccessStoryById);
router.put('/update/:id', updateSuccessStory);
router.delete('/delete/:id', deleteSuccessStory);
router.patch('/approve/:id', approveSuccessStory);
router.patch('/reject/:id', rejectSuccessStory);
router.patch('/feature/:id', featureSuccessStory);

module.exports = router;
