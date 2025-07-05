const Newsletter = require('../models/Newsletter');

exports.createNewsletter = async (req, res) => {
  try {
    const newsletter = new Newsletter(req.body);
    const savedNewsletter = await newsletter.save();
    res.status(201).json({ success: true, data: savedNewsletter });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ date: -1 });
    res.json({ success: true, data: newsletters });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter)
      return res.status(404).json({ success: false, message: 'Newsletter not found' });
    res.json({ success: true, data: newsletter });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateNewsletter = async (req, res) => {
  try {
    const updated = await Newsletter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ success: false, message: 'Newsletter not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteNewsletter = async (req, res) => {
  try {
    const deleted = await Newsletter.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: 'Newsletter not found' });
    res.json({ success: true, message: 'Newsletter deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
