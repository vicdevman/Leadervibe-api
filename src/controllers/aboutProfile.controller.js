const AboutProfile = require('../models/aboutProfile.model');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const { uploadImage, deleteImage } = require('../services/cloudinary.service');

const bufferToDataUri = (file) => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

const toPlainObject = (value) => {
    if (!value) return {};
    if (typeof value.toObject === 'function') {
        return value.toObject();
    }
    return value;
};

const toPlainArray = (items) => {
    if (!Array.isArray(items)) {
        return [];
    }
    return items.map((item) => toPlainObject(item));
};

const getFileField = (files, field) => {
    if (!files || !files[field] || !Array.isArray(files[field]) || !files[field].length) {
        return undefined;
    }
    return files[field];
};

const safeParseJSON = (value) => {
    if (value === undefined || value === null || value === '') {
        return undefined;
    }

    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    return value;
};

const parseArrayField = (value) => {
    const parsed = safeParseJSON(value);

    if (parsed === null) {
        return [];
    }

    if (Array.isArray(parsed)) {
        return parsed;
    }

    return undefined;
};

const parseObjectField = (value) => {
    const parsed = safeParseJSON(value);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
    }
    return undefined;
};

exports.getProfiles = async(req, res, next) => {
    try {
        const profiles = await AboutProfile.find().sort({ name: 1 });
        res.status(200).json({
            status: 'success',
            results: profiles.length,
            data: { profiles },
        });
    } catch (error) {
        next(error);
    }
};

exports.getProfileById = async(req, res, next) => {
    try {
        const { profileId } = req.params;
        const profile = await AboutProfile.findOne({ profileId });

        if (!profile) {
            return next(new AppError('Profile not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { profile },
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async(req, res, next) => {
    try {
        const { profileId } = req.params;
        const profile = await AboutProfile.findOne({ profileId });

        if (!profile) {
            return next(new AppError('Profile not found', 404));
        }

        const updates = {};
        const scalarFields = ['name', 'title', 'email', 'bio', 'bookingText', 'bookingUrl'];
        scalarFields.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                updates[field] = req.body[field];
            }
        });

        const arrayFields = ['awards', 'certifications'];
        arrayFields.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                const parsed = parseArrayField(req.body[field]);
                if (parsed !== undefined) {
                    updates[field] = parsed;
                }
            }
        });

        const parsedGallery = parseArrayField(req.body.gallery);

        const parsedPhoto = parseObjectField(req.body.photo);
        if (parsedPhoto) {
            updates.photo = {
                ...toPlainObject(profile.photo),
                ...parsedPhoto,
            };
        }

        const galleryAction = req.body.galleryAction === 'replace' ? 'replace' : 'append';
        let workingGallery = galleryAction === 'replace' && parsedGallery !== undefined ?
            parsedGallery :
            toPlainArray(profile.gallery);

        if (galleryAction === 'replace' && parsedGallery !== undefined) {
            updates.gallery = parsedGallery;
        }

        const photoUploads = getFileField(req.files, 'photo');
        const photoFile = photoUploads ? photoUploads[0] : undefined;
        if (photoFile) {
            if (profile.photo && profile.photo.publicId) {
                deleteImage(profile.photo.publicId).catch((error) => {
                    logger.warn(`Failed to delete old photo for ${profileId}: ${error.message}`);
                });
            }

            const uploadResult = await uploadImage({
                dataUri: bufferToDataUri(photoFile),
                folder: `about/${profileId}`,
                publicId: `${profileId}-photo`,
            });

            updates.photo = {
                ...(updates.photo || toPlainObject(profile.photo)),
                src: uploadResult.secure_url,
                publicId: uploadResult.public_id,
            };
        }

        const galleryMeta = parseArrayField(req.body.galleryMeta);
        let newGalleryItems = [];

        const galleryUploads = getFileField(req.files, 'gallery');
        if (galleryUploads) {
            newGalleryItems = await Promise.all(
                galleryUploads.map(async(file, index) => {
                    const uploadResult = await uploadImage({
                        dataUri: bufferToDataUri(file),
                        folder: `about/${profileId}/gallery`,
                        publicId: `${profileId}-gallery-${Date.now()}-${index}`,
                    });

                    const meta = Array.isArray(galleryMeta) ? galleryMeta[index] || {} : {};

                    return {
                        src: uploadResult.secure_url,
                        alt: meta.alt || file.originalname,
                        className: meta.className,
                        publicId: uploadResult.public_id,
                    };
                })
            );
        }

        if (newGalleryItems.length) {
            if (galleryAction === 'replace') {
                const deletions = (profile.gallery || [])
                    .filter((item) => item.publicId)
                    .map((item) => deleteImage(item.publicId).catch(() => null));
                if (deletions.length) {
                    await Promise.all(deletions);
                }

                const replacementBase = parsedGallery !== undefined ? parsedGallery : [];
                updates.gallery = replacementBase.concat(newGalleryItems);
            } else {
                updates.gallery = workingGallery.concat(newGalleryItems);
            }
        }

        Object.entries(updates).forEach(([key, value]) => {
            profile[key] = value;
        });

        await profile.save();

        logger.info(`About profile updated: ${profileId}`);

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: { profile },
        });
    } catch (error) {
        next(error);
    }
};