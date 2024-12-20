const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 
const http = require('http');
const { Server } = require('socket.io');
const Product = require('./models/Product'); 
const { fetchAndProcessProducts } = require('./utils/productUtils');

// Import route modules
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
dotenv.config();

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);

// Configure CORS for Express and Socket.IO
const corsOptions = {
  origin: '*',  // Replace with your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));  // Enable CORS for HTTP requests

// Initialize Socket.IO with CORS options
const io = new Server(server, {
  cors: {
    origin: '*',  // Replace with your frontend's URL
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Socket.IO: Handle position updates every second
io.on('connection', (socket) => {
    const updateInterval = setInterval(async () => {
      try {
        const products = await fetchAndProcessProducts();
        const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
        io.emit('updateProducts', shuffledProducts);
      } catch (err) {
        console.error('Error emitting products:', err.message);
      }
    }, 2000); // Emit updates every 2 seconds
  
    socket.on('disconnect', () => {
      clearInterval(updateInterval);
    });
  });

// Start the server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
server.listen(PORT, HOST, () => console.log(`Server running on port ${HOST}:${PORT}`));
