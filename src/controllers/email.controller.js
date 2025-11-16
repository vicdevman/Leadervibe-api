const emailService = require('../services/email.service');
const emailTemplates = require('../utils/emailTemplates');
const AppError = require('../utils/appError');

/**
 * Send a custom email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.sendCustomEmail = async (req, res, next) => {
  try {
    const { to, subject, message, buttonText, buttonUrl } = req.body;

    if (!to || !subject || !message) {
      return next(new AppError('Please provide to, subject, and message', 400));
    }

    // Use the notification template
    const html = emailTemplates.notificationTemplate({
      title: subject,
      message,
      buttonText,
      buttonUrl,
    });

    await emailService.sendMail({
      to,
      subject,
      text: message,
      html,
    });

    res.status(200).json({
      status: 'success',
      message: 'Email sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send a welcome email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.sendWelcomeEmail = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(new AppError('Please provide name and email', 400));
    }

    // Use the welcome template
    const html = emailTemplates.welcomeTemplate({ name });

    await emailService.sendMail({
      to: email,
      subject: 'Welcome to Our Platform!',
      text: `Hello ${name},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`,
      html,
    });

    res.status(200).json({
      status: 'success',
      message: 'Welcome email sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send a password reset email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.sendPasswordResetEmail = async (req, res, next) => {
  try {
    const { name, email, resetUrl } = req.body;

    if (!name || !email || !resetUrl) {
      return next(new AppError('Please provide name, email, and resetUrl', 400));
    }

    // Use the password reset template
    const html = emailTemplates.passwordResetTemplate({ name, resetUrl });

    await emailService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: `Hello ${name},\n\nYou requested a password reset. Please use the following link to reset your password: ${resetUrl}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe Team`,
      html,
    });

    res.status(200).json({
      status: 'success',
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    next(error);
  }
};
