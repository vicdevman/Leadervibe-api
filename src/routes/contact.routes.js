const express = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contact.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

// Public: create contact message
const contactValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('message').notEmpty().withMessage('Message is required'),
];

router.post('/', contactValidation, validate, contactController.createContact);

// Admin-only: manage contact messages
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;