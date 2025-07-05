const ActivityLog = require("../models/ActivityLog");


exports.createActivity = async (req, res) => {
  try {
    const { message, date } = req.body;
    const newActivity = new ActivityLog({ message, date });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
