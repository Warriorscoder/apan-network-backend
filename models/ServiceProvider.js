const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: String,
  password: String,
  location: String,
  skills: [String],
  experience: Number,

  aadhar_no: { type: String, unique: true, required: true },
  phone: { type: String, required: true },

  role: String,
  fatherName: String,

  village: { type: String },
  panchayat: { type: String },
  panchayat_ward: { type: String },
  tehsil: { type: String },
  district: { type: String },

  dob: {
    type: Date,
  },

  referredBy: {
    type: String,
  },

  availability: {
    from: { type: String },
    to: { type: String }
  },

  created_at: { type: Date, default: Date.now },
  last_login: { type: Date }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
