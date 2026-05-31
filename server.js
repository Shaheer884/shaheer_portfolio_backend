require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = async () => {
  // Try dynamic db import/run
  const db = require('./config/db');
  await db();
};

const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Shaheer Portfolio API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in production mode on port ${PORT}`);
});
