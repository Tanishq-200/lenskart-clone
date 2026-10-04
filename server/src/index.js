require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { connectDB } = require('./config/db');

const partnerRoutes = require('./routes/partnerRoutes');
const landlordRoutes = require('./routes/landlordRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database (with automatic fallback to persistent JSON store)
connectDB();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static assets if needed
app.use('/public', express.static(path.join(__dirname, '../../client/public')));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/leads/partner', partnerRoutes);
app.use('/api/leads/landlord', landlordRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Lenskart Franchise & Landlord Portal API',
    endpoints: {
      health: '/api/health',
      partnerLeads: '/api/leads/partner',
      landlordLeads: '/api/leads/landlord',
    },
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[ServerError]', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Lenskart Portal Server running on http://localhost:${PORT}`);
  console.log(` API Health: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

module.exports = { app, server };
