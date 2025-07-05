const express = require("express");
const router = express.Router();
const { createActivity, getAllActivities } = require("../controller/activityController");

router.get("/", getAllActivities);
router.post("/", createActivity);

module.exports = router;
