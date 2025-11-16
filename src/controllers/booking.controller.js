const Booking = require('../models/booking.model');
const emailService = require('../services/email.service');
const bookingEmailTemplates = require('../utils/bookingEmailTemplates');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');

/**
 * Create a new booking and send notification emails
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.createBooking = async (req, res, next) => {
  try {
    // Create new booking
    const newBooking = await Booking.create(req.body);

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'mike@mikebrownjr.com';
    const adminEmailContent = bookingEmailTemplates.adminBookingNotification(newBooking);
    
    try {
      await emailService.sendMail({
        to: adminEmail,
        subject: adminEmailContent.subject,
        text: adminEmailContent.text,
        html: adminEmailContent.html
      });
      logger.info(`Admin notification email sent for booking: ${newBooking._id}`);
    } catch (error) {
      logger.error(`Error sending admin notification email: ${error.message}`);
      // Don't stop the process if admin email fails
    }

    // Send confirmation email to client
    const clientEmailContent = bookingEmailTemplates.clientBookingConfirmation(newBooking);
    
    try {
      await emailService.sendMail({
        to: newBooking.email,
        subject: clientEmailContent.subject,
        text: clientEmailContent.text,
        html: clientEmailContent.html
      });
      logger.info(`Client confirmation email sent for booking: ${newBooking._id}`);
    } catch (error) {
      logger.error(`Error sending client confirmation email: ${error.message}`);
      // Don't stop the process if client email fails
    }

    // Send response
    res.status(201).json({
      status: 'success',
      message: 'Booking request submitted successfully',
      data: {
        booking: newBooking
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all bookings (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get booking by ID (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError('No booking found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update booking status (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !['pending', 'confirmed', 'declined'].includes(status)) {
      return next(new AppError('Please provide a valid status (pending, confirmed, or declined)', 400));
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!booking) {
      return next(new AppError('No booking found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete booking (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return next(new AppError('No booking found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
