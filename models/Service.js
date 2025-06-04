const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' },
  title: String,
  category: String,
  description: String,
  price: Number,
  location: String,
  availability: String,
  tags: [String],
  experience_level: String,
  contact: String,
  rating: { type: Number, default: 0 },

  reviews: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceTaker' },
      stars: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],

  images: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Service', serviceSchema);
