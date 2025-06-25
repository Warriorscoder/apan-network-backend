const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config/.env' });

const connectDB = require('./config/connectDB');
const app = express();

// Route imports
const userRoutes = require('./routes/UserRoutes'); 
const providerRoutes = require('./routes/ProviderRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');
const reviewRoutes = require('./routes/ReviewsRoutes');
const complaintRoutes = require('./routes/ComplaintRoutes');

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/complaints', complaintRoutes);

// OTP (for demonstration)
const otp = Math.floor(100000 + Math.random() * 900000);
console.log(`Your OTP is: ${otp}`); // In production, send via email/SMS

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
