const mongoose = require('mongoose');


const User = new mongoose.Schema({
  name: String,
  
  phone: String,
  password: String,
  gender: String,
  adress: String,
  location: String,
  created_at: { type: Date, default: Date.now },
  last_login: Date,
});

module.exports = mongoose.model('User', User);
