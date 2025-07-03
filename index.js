const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});
const connectDB = require('./config/connectDB');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const providerRoutes = require('./routes/ProviderRoutes');
const cors = require('cors');



app.use(cors({
    origin: '*', // Allow all origins, you can specify specific origins if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));





const adminRoutes = require('./routes/AdminRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');








connectDB();

app.use(express.json()); // Parses incoming JSON

app.get('/', (req, res) => {
    res.send('API is running...');
});


//all the routes
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);


app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);





  


 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 
});