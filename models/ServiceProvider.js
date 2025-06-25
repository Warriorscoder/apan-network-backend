const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },                       
  father_name: { type: String, required: true },                
  dob: { type: Date, required: true },                          
  gender: { type: String, enum: ['Male', 'Female', 'Others'], required: true }, 

  aadhar_no: { type: String, unique: true, required: true },     
  phone: { type: String, required: true },                       
  role:String,
  village: { type: String },                                     
  panchayat_ward: { type: String },                              
  tehsil: { type: String },                                     
  district: { type: String },                                 

  education: {                                                  
    type: String,
    enum: ['10th', '+2', 'ITI Diploma', 'Graduation', 'Other'],
    required: true
  },

  work_experience: { type: Number, default: 0 },                
  wants_updates: { type: Boolean, required: true },              
  referred_by: { type: String },                               

  password: { type: String },                                   
  availability: {
    from: { type: String },                                     
    to: { type: String }
  },

  created_at: { type: Date, default: Date.now },               
  last_login: { type: Date }                                   
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
