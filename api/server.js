import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';

import userRoutes from './routes/users.routes.js' assert { type: 'commonjs' };
import booksRoutes from './routes/books.routes.js' assert { type: 'commonjs' };
import productsRoutes from './routes/products.routes.js' assert { type: 'commonjs' };

const app = express();
const PORT = process.env.PORT || 5000;

// COMPLETE CORS CONFIGURATION
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path} from ${req.get('Origin')}`);
  next();
});

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(), 
    cors: true,
    message: 'Login API ready - CORS enabled for localhost:8080'
  });
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
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`✅ CORS configured for http://localhost:8080`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log('🎯 Login endpoint ready: POST /api/login');
});

