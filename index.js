// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/connectDB');
// const app = express();
// const userRoutes = require('./routes/UserRoutes');
// const providerRoutes = require('./routes/ProviderRoutes');
// const serviceRoutes = require('./routes/ServiceRoutes');
// const reviewRoutes = require('./routes/ReviewsRoutes');

// dotenv.config();

// connectDB();

// app.use(express.json()); // Parses incoming JSON

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });


// //all the routes
// app.use('/api/users', userRoutes);
// app.use('/api/providers', providerRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/reviews', reviewRoutes);
 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: './config/.env'});

dotenv.config({path: './config/.env'})
const cors = require('cors');

const connectDB = require('./config/connectDB');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const providerRoutes = require('./routes/ProviderRoutes');




const authRoutes = require('./routes/authRoutes');

const AdminRoutes = require('./routes/AdminRoutes');
const ServiceRoutes = require('./routes/ServiceRoutes');









const serviceRoutes = require('./routes/ServiceRoutes');
const reviewRoutes = require('./routes/ReviewsRoutes');
const complaintRoutes = require('./routes/ComplaintRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config({path: './config/.env'}); // Load environment variables
 

connectDB();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/services', ServiceRoutes);
app.use('/api/admin', AdminRoutes);





  


 

app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes); 
const otp= Math.floor(100000 + Math.random()* 900000);
console.log(`Your OTP is: ${otp}`); // This is just for demonstration; in production, you would send this via SMS or email

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 
});