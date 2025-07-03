const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({

  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  location: String,
  skills: [String],
  experience: Number,
  aadhar_no: { type: String, unique: true, required: true },     
  phone: { type: String, required: true },                       
  role:String,
  village: { type: String },                                     
  panchayat_ward: { type: String },                              
  tehsil: { type: String },                                     
  district: { type: String },                                 

  availability: {
    from: { type: String },                                     
    to: { type: String }
  },

  created_at: { type: Date, default: Date.now },               
  last_login: { type: Date }                                   
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
