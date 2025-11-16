const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

/**
 * Email Service for sending emails using nodemailer
 */
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Send an email
   * @param {Object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.text - Plain text version of the message
   * @param {string} options.html - HTML version of the message
   * @param {string} [options.from] - Sender email (defaults to EMAIL_FROM env variable)
   * @param {Array<Object>} [options.attachments] - Array of attachment objects
   * @returns {Promise<Object>} - Nodemailer info object
   */
  async sendMail(options) {
    try {
      const mailOptions = {
        from: options.from || process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      // Add attachments if provided
      if (options.attachments && Array.isArray(options.attachments)) {
        mailOptions.attachments = options.attachments;
      }

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error(`Error sending email: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send a welcome email to a new user
   * @param {Object} user - User object
   * @param {string} user.email - User email
   * @param {string} user.name - User name
   * @returns {Promise<Object>} - Nodemailer info object
   */
  async sendWelcomeEmail(user) {
    return this.sendMail({
      to: user.email,
      subject: 'Welcome to Our Platform!',
      text: `Hello ${user.name},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Our Platform!</h2>
          <p>Hello ${user.name},</p>
          <p>We're excited to have you on board. Thank you for joining our community!</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    });
  }

  /**
   * Send a password reset email
   * @param {Object} options - Options object
   * @param {string} options.email - User email
   * @param {string} options.name - User name
   * @param {string} options.resetToken - Password reset token
   * @param {string} options.resetUrl - Password reset URL
   * @returns {Promise<Object>} - Nodemailer info object
   */
  async sendPasswordResetEmail(options) {
    return this.sendMail({
      to: options.email,
      subject: 'Password Reset Request',
      text: `Hello ${options.name},\n\nYou requested a password reset. Please use the following link to reset your password: ${options.resetUrl}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hello ${options.name},</p>
          <p>You requested a password reset. Please click the button below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${options.resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
              Reset Password
            </a>
          </p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    });
  }

  /**
   * Send a notification email
   * @param {Object} options - Options object
   * @param {string} options.email - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.message - Email message
   * @returns {Promise<Object>} - Nodemailer info object
   */
  async sendNotification(options) {
    return this.sendMail({
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${options.subject}</h2>
          <p>${options.message}</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    });
  }
}

module.exports = new EmailService();
