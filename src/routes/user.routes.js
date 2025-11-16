const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

// Validation rules
const updateUserValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
];

// Protect all routes after this middleware
router.use(authMiddleware.protect);

// Current user routes
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', updateUserValidation, validate, userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Admin only routes
router.use(authMiddleware.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(updateUserValidation, validate, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
