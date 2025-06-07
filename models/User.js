const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role:String,
  phone: String,
  password: String,
  location: String,
  created_at: { type: Date, default: Date.now },
  last_login: Date,
});

module.exports = mongoose.model('User', User);
