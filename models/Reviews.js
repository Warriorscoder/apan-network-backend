const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceTaker', required: true },
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
