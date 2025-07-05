const express = require('express');
const router = express.Router();
const {
  getAllSuccessStories,
  getSuccessStoryById,
  updateSuccessStory,
  deleteSuccessStory,
  approveSuccessStory,
  rejectSuccessStory,
  featureSuccessStory
} = require('../controller/successStoryController');

router.get('/', getAllSuccessStories);

router.get('/:id', getSuccessStoryById);
router.put('/update/:id', updateSuccessStory);
router.delete('/delete/:id', deleteSuccessStory);

router.patch('/approve/:id', approveSuccessStory);
router.patch('/reject/:id', rejectSuccessStory);
router.patch('/feature/:id', featureSuccessStory);

module.exports = router;
