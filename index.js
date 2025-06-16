const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const app = express();
const userRoutes = require('./routes/UserRoutes');
const providerRoutes = require('./routes/ProviderRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');
const reviewRoutes = require('./routes/ReviewsRoutes');

dotenv.config();
connectDB();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});