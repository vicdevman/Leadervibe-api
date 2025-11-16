const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/user.model');
const connectDB = require('../config/database');
const logger = require('../utils/logger');

/**
 * Script to create an admin user
 */
const createAdmin = async () => {
    try {
        // Connect to database
        await connectDB();
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'mike@mikebrownjr.com' });
        
        if (existingAdmin) {
            logger.info('Admin user already exists');
            process.exit(0);
        }
        
        // Create admin user
        const admin = await User.create({
            name: 'Mike Brown',
            email: 'mike@mikebrownjr.com',
            password: 'mike_admin@123',
            role: 'admin'
        });
        
        logger.info(`Admin user created successfully: ${admin.email}`);
        process.exit(0);
    } catch (error) {
        logger.error(`Error creating admin user: ${error.message}`);
        process.exit(1);
    }
};

// Run the function
createAdmin();
