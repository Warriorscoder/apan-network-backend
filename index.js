const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: './config/.env'});
const connectDB = require('./config/connectDB');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const providerRoutes = require('./routes/ProviderRoutes');

const cors = require('cors');



const connectDB = require('./config/connectDB');
const app = express();


app.use(cors({
    origin: '*', // Allow all origins, you can specify specific origins if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));














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

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);



 



=======
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
