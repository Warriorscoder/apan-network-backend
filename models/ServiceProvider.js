const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  location: String,
  skills: [String],
  experience: Number,
  availability: {
    from: { type: String, required: true },  // e.g., "09:00"
    to: { type: String, required: true }     // e.g., "17:00"
  },

  created_at: { type: Date, default: Date.now },
  last_login: Date
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
