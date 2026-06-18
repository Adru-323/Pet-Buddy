


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Route Imports
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const petRoutes = require('./src/routes/petRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const adminRoutes = require('./src/routes/adminRoutes'); // <-- Admin route imported here

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); 

// 1. Create the Express app FIRST
const app = express();

// 2. Add Middleware SECOND
app.use(cors()); 
app.use(express.json()); 

// 3. Mount all Routes THIRD (including Admin)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes); // <-- Admin route mounted HERE, after app is created!
const notificationRoutes = require('./src/routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);
const reviewRoutes = require('./src/routes/reviewRoutes');
// ... other routes
app.use('/api/reviews', reviewRoutes);
//pricing
const pricingRoutes = require('./src/routes/pricingRoutes');
app.use('/api/pricing', pricingRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//local upr wala uncoment kr badme 
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});