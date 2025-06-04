const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const providerRoutes = require('./routes/ProviderRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');


dotenv.config();

connectDB();

app.use(express.json()); // Parses incoming JSON

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
