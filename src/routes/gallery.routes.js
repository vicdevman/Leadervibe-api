const express = require('express');
const { body } = require('express-validator');
const galleryController = require('../controllers/gallery.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.get('/', galleryController.getGallery);

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

const updateValidation = [
    body().custom((value, { req }) => {
        const hasBody = req.body && Object.keys(req.body).length > 0;
        const hasFiles = req.files && req.files.images;
        if (!hasBody && !hasFiles) {
            throw new Error('Update payload cannot be empty');
        }
        return true;
    }),
];

router.patch(
    '/',
    upload.fields([{ name: 'images', maxCount: 12 }]),
    updateValidation,
    validate,
    galleryController.updateGallery
);

module.exports = router;