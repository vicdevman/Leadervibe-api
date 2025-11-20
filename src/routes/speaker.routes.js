const express = require('express');
const { body } = require('express-validator');
const speakerController = require('../controllers/speaker.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

const updateValidation = [
    body().custom((value, { req }) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error('Update payload cannot be empty');
        }
        return true;
    }),
];

router.get('/', speakerController.getSpeakers);
router.get('/:speakerId', speakerController.getSpeakerById);

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

router.patch('/:speakerId', updateValidation, validate, speakerController.updateSpeaker);

module.exports = router;