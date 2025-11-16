const express = require('express');
const { body } = require('express-validator');
const emailController = require('../controllers/email.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

// Validation rules
const customEmailValidation = [
  body('to').isEmail().withMessage('Please provide a valid email address'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
];

const welcomeEmailValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
];

const passwordResetEmailValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('resetUrl').notEmpty().withMessage('Reset URL is required'),
];

// Protect all routes
router.use(authMiddleware.protect);

// Email routes
router.post(
  '/custom',
  customEmailValidation,
  validate,
  emailController.sendCustomEmail
);

router.post(
  '/welcome',
  welcomeEmailValidation,
  validate,
  emailController.sendWelcomeEmail
);

router.post(
  '/password-reset',
  passwordResetEmailValidation,
  validate,
  emailController.sendPasswordResetEmail
);

module.exports = router;
