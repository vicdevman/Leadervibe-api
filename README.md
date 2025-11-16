# Leadervibe API

A Node.js backend API with MongoDB integration and reusable nodemailer service for sending formatted emails.

## Features

- **Express.js Framework**: Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB Integration**: Using Mongoose ODM for elegant MongoDB object modeling
- **Reusable Email Service**: Nodemailer implementation with customizable templates
- **Authentication**: JWT-based authentication system
- **Input Validation**: Request validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **Logging**: Advanced logging with Winston
- **Security**: Implementation of security best practices with Helmet

## Project Structure

```
leadervibe-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── booking.controller.js
│   │   ├── email.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── models/
│   │   ├── booking.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── booking.routes.js
│   │   ├── email.routes.js
│   │   └── user.routes.js
│   ├── scripts/
│   │   └── create-admin.js
│   ├── services/
│   │   └── email.service.js
│   ├── utils/
│   │   ├── appError.js
│   │   ├── bookingEmailTemplates.js
│   │   ├── emailTemplates.js
│   │   └── logger.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/leadervibe-api.git
   cd leadervibe-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

4. Create admin user:
   ```
   npm run create-admin
   ```
   This will create an admin user with the following credentials:
   - Email: mike@mikebrownjr.com
   - Password: mike_admin@123

5. Start the server:
   ```
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

> **Note:** This API is configured for admin-only access. Public signups are disabled.

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/forgotPassword` - Request password reset
- `PATCH /api/v1/auth/resetPassword/:token` - Reset password

### Users

- `GET /api/v1/users/me` - Get current user profile
- `PATCH /api/v1/users/updateMe` - Update current user profile
- `DELETE /api/v1/users/deleteMe` - Delete current user (set inactive)

### Admin Only

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Email Service

- `POST /api/v1/emails/custom` - Send a custom email
- `POST /api/v1/emails/welcome` - Send a welcome email
- `POST /api/v1/emails/password-reset` - Send a password reset email

### Booking System

- `POST /api/v1/booking` - Submit a booking request (public)
- `GET /api/v1/booking` - Get all bookings (admin only)
- `GET /api/v1/booking/:id` - Get booking by ID (admin only)
- `PATCH /api/v1/booking/:id/status` - Update booking status (admin only)
- `DELETE /api/v1/booking/:id` - Delete booking (admin only)

### Contact / Get in touch

- `POST /api/v1/contact` - Submit a contact message (public)
- `GET /api/v1/contact` - Get all contact messages (admin only)
- `GET /api/v1/contact/:id` - Get single contact message (admin only)
- `DELETE /api/v1/contact/:id` - Delete contact message (admin only)

## Service Usage Examples

### Email Service

The email service is designed to be reusable across the application. Here's how to use it:

```javascript
const emailService = require('../services/email.service');
const emailTemplates = require('../utils/emailTemplates');

// Basic email
await emailService.sendMail({
  to: 'recipient@example.com',
  subject: 'Hello',
  text: 'Plain text version',
  html: '<p>HTML version</p>'
});

// Welcome email
await emailService.sendWelcomeEmail({
  name: 'John Doe',
  email: 'john@example.com'
});

// Using templates
const html = emailTemplates.notificationTemplate({
  title: 'Important Notification',
  message: 'This is an important message',
  buttonText: 'Take Action',
  buttonUrl: 'https://example.com/action'
});

await emailService.sendMail({
  to: 'recipient@example.com',
  subject: 'Important Notification',
  text: 'This is an important message',
  html
});
```

### Booking System

The booking system allows users to submit booking requests which are then emailed to the admin:

```javascript
// Example booking request payload
const bookingData = {
  organizationName: 'Acme Corporation',
  contactPerson: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  eventName: 'Annual Leadership Conference',
  eventDates: 'June 15-17, 2026',
  eventLocation: 'New York Hilton Midtown',
  audienceType: 'Corporate Executives',
  audienceSize: '250-300',
  preferredSpeaker: 'Mike Brown',
  topicPreference: 'Leadership in Digital Transformation',
  sessionLength: '90 minutes',
  avSetup: 'Full AV with wireless microphone and projector',
  recordedOrStreamed: 'Yes, recorded for internal use',
  honorariumBudget: '$5,000-$7,500',
  travelSupport: 'Full travel and accommodation provided',
  additionalNotes: 'We would like to include a Q&A session at the end.'
};

// Submit booking request (from client-side)
const response = await fetch('/api/v1/booking', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bookingData)
});

const result = await response.json();
```

## Environment Variables

```
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/leadervibe

# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@example.com
ADMIN_EMAIL=mike@mikebrownjr.com

# Website Configuration
WEBSITE_URL=https://example.com
ADMIN_DASHBOARD_URL=https://admin.example.com

# JWT Secret (for authentication)
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=90d
```

## License

MIT
