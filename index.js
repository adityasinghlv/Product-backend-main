const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');  // Assuming db.js is set up correctly

// Import route modules
const adminRoutes = require('./routes/adminRoutes');  // Ensure this is correct
const categoryRoutes = require('./routes/categoryRoutes');  // Ensure this is correct
const productRoutes = require('./routes/productRoutes');  // Ensure this is correct

const app = express();
dotenv.config();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT,HOST, () => console.log(`Server running on port ${HOST}:${PORT}`));
