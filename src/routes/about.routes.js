const express = require('express');
const { body } = require('express-validator');
const aboutProfileController = require('../controllers/aboutProfile.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.get('/', aboutProfileController.getProfiles);
router.get('/:profileId', aboutProfileController.getProfileById);

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

const updateValidation = [
    body().custom((value, { req }) => {
        const hasBody = req.body && Object.keys(req.body).length > 0;
        const hasFiles = req.files && (req.files.photo || req.files.gallery);
        if (!hasBody && !hasFiles) {
            throw new Error('Update payload cannot be empty');
        }
        return true;
    }),
];

router.patch(
    '/:profileId',
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]),
    updateValidation,
    validate,
    aboutProfileController.updateProfile
);

module.exports = router;