const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const emailRoutes = require('./routes/email.routes');
const bookingRoutes = require('./routes/booking.routes');
const contactRoutes = require('./routes/contact.routes');
const speakerRoutes = require('./routes/speaker.routes');
const aboutRoutes = require('./routes/about.routes');
const galleryRoutes = require('./routes/gallery.routes');

// Import middleware
const errorMiddleware = require('./middleware/error.middleware');
const AppError = require('./utils/appError');
const logger = require('./utils/logger');

// Import database connection
const connectDB = require('./config/database');

// Connect to database
connectDB();

// Create Express app
const app = express();

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Enable CORS
app.use(cors());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/emails', emailRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/events/speakers', speakerRoutes);
app.use('/api/v1/about/profiles', aboutRoutes);
app.use('/api/v1/gallery', galleryRoutes);

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running!',
    });
});

// Global error handler
app.use(errorMiddleware);

// If running on Vercel/serverless, export the app and let the platform handle the server
// Vercel sets process.env.VERCEL in its environment
if (process.env.VERCEL) {
    module.exports = app;
} else {
    // Local / non-serverless startup
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
        logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
        logger.error(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
        logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
        logger.error(err.name, err.message);
        process.exit(1);
    });
}