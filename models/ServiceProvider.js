const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({


  name: String,
  // email: { type: String, unique: true },
  phone: String,
  role:String,
  fatherName: String,
  password: String,
  location: String,
  skills: [String],
  aadhar: Number,
  village: String,
  experience: Number,
   dob: {
    type: Date,
  },
   tehsil: {
    type: String,
  },
  district: {
    type: String,
  },
  panchayat:{
    type: String
  },
  referredBy: {
    type: String,
  },

                                   

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