const Speaker = require('../models/speaker.model');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');

/**
 * Get all speakers
 */
exports.getSpeakers = async(req, res, next) => {
    try {
        const speakers = await Speaker.find().sort({ name: 1 });

        res.status(200).json({
            status: 'success',
            results: speakers.length,
            data: { speakers },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get a speaker by speakerId
 */
exports.getSpeakerById = async(req, res, next) => {
    try {
        const { speakerId } = req.params;
        const speaker = await Speaker.findOne({ speakerId });

        if (!speaker) {
            return next(new AppError('Speaker not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { speaker },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update speaker details by speakerId
 */
exports.updateSpeaker = async(req, res, next) => {
    try {
        const { speakerId } = req.params;
        const updates = req.body;

        const speaker = await Speaker.findOneAndUpdate({ speakerId },
            updates, { new: true, runValidators: true }
        );

        if (!speaker) {
            return next(new AppError('Speaker not found', 404));
        }

        logger.info(`Speaker updated: ${speakerId}`);

        res.status(200).json({
            status: 'success',
            message: 'Speaker updated successfully',
            data: { speaker },
        });
    } catch (error) {
        next(error);
    }
};