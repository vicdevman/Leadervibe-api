/**
 * Email template generator
 * @module utils/emailTemplates
 */

/**
 * Generate a base email template with common styling
 * @param {Object} options - Template options
 * @param {string} options.title - Email title
 * @param {string} options.content - Email content (can be HTML)
 * @param {string} [options.buttonText] - Optional button text
 * @param {string} [options.buttonUrl] - Optional button URL
 * @param {string} [options.footer] - Optional footer text
 * @returns {string} - HTML email template
 */
const baseTemplate = (options) => {
  const { title, content, buttonText, buttonUrl, footer } = options;
  
  // Button HTML if buttonText and buttonUrl are provided
  const buttonHtml = buttonText && buttonUrl 
    ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${buttonUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
          ${buttonText}
        </a>
      </div>
    ` 
    : '';
  
  // Footer HTML if footer is provided
  const footerHtml = footer 
    ? `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        ${footer}
      </div>
    ` 
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f9f9f9; border-radius: 5px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; margin-bottom: 5px;">${title}</h1>
        </div>
        
        <div style="background-color: #fff; border-radius: 5px; padding: 20px; margin-bottom: 20px;">
          ${content}
        </div>
        
        ${buttonHtml}
        
        ${footerHtml}
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate a welcome email template
 * @param {Object} user - User object
 * @param {string} user.name - User name
 * @returns {string} - HTML email template
 */
const welcomeTemplate = (user) => {
  const content = `
    <p>Hello ${user.name},</p>
    <p>Welcome to our platform! We're excited to have you on board.</p>
    <p>Here are some things you can do to get started:</p>
    <ul>
      <li>Complete your profile</li>
      <li>Explore our features</li>
      <li>Connect with other users</li>
    </ul>
    <p>If you have any questions, feel free to contact our support team.</p>
    <p>Best regards,<br>The Team</p>
  `;
  
  return baseTemplate({
    title: 'Welcome to Our Platform!',
    content,
    buttonText: 'Get Started',
    buttonUrl: 'https://example.com/dashboard',
    footer: '© 2025 Your Company. All rights reserved.'
  });
};

/**
 * Generate a password reset email template
 * @param {Object} options - Options object
 * @param {string} options.name - User name
 * @param {string} options.resetUrl - Password reset URL
 * @returns {string} - HTML email template
 */
const passwordResetTemplate = (options) => {
  const { name, resetUrl } = options;
  
  const content = `
    <p>Hello ${name},</p>
    <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
    <p>To reset your password, click the button below:</p>
  `;
  
  return baseTemplate({
    title: 'Reset Your Password',
    content,
    buttonText: 'Reset Password',
    buttonUrl: resetUrl,
    footer: 'This link will expire in 1 hour. If you need assistance, please contact support.'
  });
};

/**
 * Generate a notification email template
 * @param {Object} options - Options object
 * @param {string} options.title - Notification title
 * @param {string} options.message - Notification message
 * @param {string} [options.buttonText] - Optional button text
 * @param {string} [options.buttonUrl] - Optional button URL
 * @returns {string} - HTML email template
 */
const notificationTemplate = (options) => {
  const { title, message, buttonText, buttonUrl } = options;
  
  const content = `
    <p>${message}</p>
  `;
  
  return baseTemplate({
    title,
    content,
    buttonText,
    buttonUrl,
    footer: '© 2025 Your Company. All rights reserved.'
  });
};

module.exports = {
  baseTemplate,
  welcomeTemplate,
  passwordResetTemplate,
  notificationTemplate
};
