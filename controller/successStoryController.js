const SuccessStory = require('../models/SuccessStory');

exports.getAllSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.json({ success: true, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSuccessStoryById = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    res.json({ success: true, data: story });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Story not found' });
  }
};

exports.updateSuccessStory = async (req, res) => {
  try {
    const updated = await SuccessStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteSuccessStory = async (req, res) => {
  try {
    await SuccessStory.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.approveSuccessStory = async (req, res) => {
  try {
    await SuccessStory.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.rejectSuccessStory = async (req, res) => {
  try {
    await SuccessStory.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.featureSuccessStory = async (req, res) => {
  try {
    await SuccessStory.findByIdAndUpdate(req.params.id, { featured: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
