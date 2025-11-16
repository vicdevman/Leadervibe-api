const express = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

// Validation rules for booking creation
const bookingValidation = [
  body('organizationName').notEmpty().withMessage('Organization name is required'),
  body('contactPerson').notEmpty().withMessage('Contact person name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('eventName').notEmpty().withMessage('Event name is required'),
  body('eventDates').notEmpty().withMessage('Event dates are required'),
  body('eventLocation').notEmpty().withMessage('Event location is required'),
  body('audienceType').notEmpty().withMessage('Audience type is required'),
  body('audienceSize').notEmpty().withMessage('Audience size is required'),
  body('sessionLength').notEmpty().withMessage('Session length is required'),
];

// Public route for creating a booking
router.post('/', bookingValidation, validate, bookingController.createBooking);

// Admin only routes - protected
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBooking);
router.patch('/:id/status', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
