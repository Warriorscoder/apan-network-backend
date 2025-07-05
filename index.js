const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectdb");

dotenv.config({ path: "./config/.env" }); // Load env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/providers", require("./routes/ProviderRoutes"));
app.use("/api/services", require("./routes/ServiceRoutes"));
app.use("/api/complaints", require("./routes/ComplaintRoutes"));
app.use("/api/blogs", require("./routes/BlogRoutes"));
app.use("/api/newsletter", require("./routes/NewsletterRoutes"));
app.use("/api/success", require("./routes/SuccessStoryRoutes"));
app.use("/api/categories", require("./routes/CategoryRoutes"));
app.use("/api/dashboard", require("./routes/DashboardRoutes"));
app.use("/api/reviews", require("./routes/ReviewsRoutes"));
app.use("/api/activity", require("./routes/ActivityRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/stats", require("./routes/StatsRoutes"));

app.get("/", (req, res) => {
  res.send("api is running on port 8000");
});


// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
