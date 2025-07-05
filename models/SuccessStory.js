const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String, 
    required: true,
  },
  provider: {
    type: String, 
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('SuccessStory', successStorySchema);
