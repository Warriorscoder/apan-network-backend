const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmploymentService',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  location: {
    type: String,
    required: false, 
    trim: true
  },
  contact_info: {
    type: String,
    required: false, 
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  admin_response: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  resolved_at: {
    type: Date
  },
  attachments: [
    {
      url: String, 
      uploaded_at: {
        type: Date,
        default: Date.now
      }
    }
  ],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
