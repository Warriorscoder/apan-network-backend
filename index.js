const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});
const connectDB = require('./config/connectDB');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const providerRoutes = require('./routes/ProviderRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');

const authRoutes = require('./routes/authRoutes');






connectDB();

app.use(express.json()); // Parses incoming JSON

app.get('/', (req, res) => {
    res.send('API is running...');
});


//all the routes
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);

app.use('/api/auth', authRoutes); 



  


 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 
});