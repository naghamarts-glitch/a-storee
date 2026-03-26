require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/users.routes.cjs') || require('./routes/users.routes');
const booksRoutes = require('./routes/books.routes.cjs') || require('./routes/books.routes');
const productsRoutes = require('./routes/products.routes.cjs') || require('./routes/products.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// COMPLETE CORS - fixes preflight
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Explicit preflight handler
// app.options('*', cors()); // Removed invalid wildcard

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path} from ${req.get('Origin')} - User-Agent: ${req.get('User-Agent')}`);
  next();
});

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), cors: true });
});

// Routes
app.use('/api', userRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/products', productsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('ERROR:', err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend on http://localhost:${PORT}`);
  console.log(`✅ CORS enabled for localhost:8080`);
  console.log('📊 Health: http://localhost:' + PORT + '/health');
});

