const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');
const Service = require('../models/Service');
const Complaint = require('../models/Complaint');
const Review = require('../models/Reviews');
const SuccessStory = require('../models/SuccessStory');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await ServiceProvider.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalComplaints = await Complaint.countDocuments();
    const complaintsByStatus = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const totalReviews = await Review.countDocuments();
    const totalSuccessStories = await SuccessStory.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProviders,
        totalServices,
        totalComplaints,
        complaintsByStatus,
        totalReviews,
        totalSuccessStories,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
