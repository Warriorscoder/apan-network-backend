const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Provider = require('../models/ServiceProvider');
const Service = require('../models/Service');
const Complaint = require('../models/Complaint');
const Review = require('../models/Reviews');
const SuccessStory = require('../models/SuccessStory');
const Blog = require('../models/Blog');
const Newsletter = require('../models/Newsletter');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/',verifyAdminToken, async (req, res) => {
  try {
    const [
      totalUsers,
      totalProviders,
      totalServices,
      pendingServices,
      totalComplaints,
      resolvedComplaints,
      totalTestimonials,
      approvedStories,
      pendingStories,
      totalBlogs,
      totalNewsletters
    ] = await Promise.all([
      User.countDocuments(),
      Provider.countDocuments(),
      Service.countDocuments(),
      Service.countDocuments({ status: 'Pending' }),
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: 'Resolved' }),
      Review.countDocuments(),
      SuccessStory.countDocuments({ status: 'approved' }),
      SuccessStory.countDocuments({ status: 'pending' }),
      Blog.countDocuments(),
      Newsletter.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProviders,
        totalServices,
        pendingServices,
        totalComplaints,
        resolvedComplaints,
        totalTestimonials,
        approvedStories,
        pendingStories,
        totalBlogs,
        totalNewsletters
      }
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
