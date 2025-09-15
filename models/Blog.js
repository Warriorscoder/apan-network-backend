const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image_url: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String, default: 'Admin' },

 
  tags: { type: [String], default: [] },
  // status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);