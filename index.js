const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});
const connectDB = require('./config/connectDB');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const providerRoutes = require('./routes/ProviderRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');
const authRoutes = require('./routes/authRoutes');


dotenv.config({path: './config/.env'}); // Load environment variables

connectDB();

app.use(express.json()); // Parses incoming JSON

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes); 
const otp= Math.floor(100000 + Math.random()* 900000);
console.log(`Your OTP is: ${otp}`); // This is just for demonstration; in production, you would send this via SMS or email

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 
});
