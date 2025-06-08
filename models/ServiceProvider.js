const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({

  name: String,
  email: { type: String, unique: true },
  phone: String,
  role:String,
  password: String,
  location: String,
  skills: [String],
  experience: Number,

                                   

  availability: {
    from: { type: String },                                     
    to: { type: String }
  },

  created_at: { type: Date, default: Date.now },               
  last_login: { type: Date }                                   
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
