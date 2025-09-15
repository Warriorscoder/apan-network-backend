// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/connectdb");

// dotenv.config({ path: "./config/.env" });

// const app = express();
// const PORT = process.env.PORT || 8000; // ✅ Move this up

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT',"PATCH", 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());

// // Logging
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.originalUrl}`);
//   next();
// });

// // Routes
// app.use("/api/users", require("./routes/UserRoutes"));
// app.use("/api/providers", require("./routes/ProviderRoutes"));
// app.use("/api/services", require("./routes/ServiceRoutes"));
// app.use("/api/complaints", require("./routes/ComplaintRoutes"));
// app.use("/api/blogs", require("./routes/BlogRoutes"));
// app.use("/api/newsletter", require("./routes/NewsletterRoutes"));
// app.use("/api/success", require("./routes/SuccessStoryRoutes"));
// app.use("/api/categories", require("./routes/CategoryRoutes"));
// app.use("/api/dashboard", require("./routes/AdminRoutes"));
// app.use("/api/reviews", require("./routes/ReviewsRoutes"));
// app.use("/api/activity", require("./routes/ActivityRoutes"));
// app.use("/api/notifications", require("./routes/notificationRoutes"));
// app.use("/api/stats", require("./routes/StatsRoutes"));
// app.use("/api/admin", require("./routes/AdminRoutes")); 
// app.use("/api/service-requests", require("./routes/ServiceRequestRoutes"));

// app.use('/api/feedback',require('./routes/feedbackRoutes'))


// app.use("/api/notify", require("./routes/Notify"))


// app.get("/", (req, res) => {
//   res.send(`API is running on port ${PORT}`);
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: "API route not found" });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(` Server is running on port ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectdb");

dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 8000; // ✅ Move this up

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Logging
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
app.use("/api/dashboard", require("./routes/AdminRoutes"));
app.use("/api/reviews", require("./routes/ReviewsRoutes"));
app.use("/api/activity", require("./routes/ActivityRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/stats", require("./routes/StatsRoutes"));
app.use("/api/admin", require("./routes/AdminRoutes")); 
app.use("/api/service-requests", require("./routes/ServiceRequestRoutes"));
app.use("/api/notify", require("./routes/Notify"))
// Health check
app.get("/", (req, res) => {
  res.send(`API is running on port ${PORT}`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});