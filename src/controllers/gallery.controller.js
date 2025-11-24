const GalleryItem = require('../models/galleryItem.model');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const { uploadImage, deleteImage } = require('../services/cloudinary.service');

const bufferToDataUri = (file) => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

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

const toArray = (value) => {
    if (value === undefined || value === null || value === '') {
        return [];
    }

    if (Array.isArray(value)) {
        return value;
    }

    const parsed = safeParseJSON(value);
    if (Array.isArray(parsed)) {
        return parsed;
    }

    if (parsed && typeof parsed === 'object') {
        return [parsed];
    }

    if (typeof value === 'string') {
        return value
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean);
    }

    return [];
};

const normalizeId = (value) => {
    if (!value && value !== 0) return undefined;
    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed || undefined;
    }
    return undefined;
};

const normalizeColumn = (value) => (value === 'right' ? 'right' : 'left');

const getFileField = (files, field) => {
    if (!files || !files[field] || !Array.isArray(files[field]) || !files[field].length) {
        return undefined;
    }
    return files[field];
};

exports.getGallery = async(req, res, next) => {
    try {
        const items = await GalleryItem.find().sort({ createdAt: 1 });
        res.status(200).json({
            status: 'success',
            results: items.length,
            data: { gallery: items },
        });
    } catch (error) {
        next(error);
    }
};

exports.updateGallery = async(req, res, next) => {
    try {
        const itemsPayload = toArray(req.body.items);
        const deleteIdsRaw = toArray(req.body.deleteIds);
        const imageMetaRaw = toArray(req.body.imageMeta);
        const galleryIdsForFiles = toArray(req.body.galleryIds || req.body.replaceIds);

        if (!itemsPayload.length && !deleteIdsRaw.length && !getFileField(req.files, 'images')) {
            return next(new AppError('No gallery updates provided', 400));
        }

        // Handle deletions first
        const deleteIds = deleteIdsRaw
            .map((entry) => {
                if (entry && typeof entry === 'object') {
                    return normalizeId(entry.galleryId || entry.id || entry._id);
                }
                return normalizeId(entry);
            })
            .filter(Boolean);

        if (deleteIds.length) {
            const itemsToDelete = await GalleryItem.find({ galleryId: { $in: deleteIds } });
            await GalleryItem.deleteMany({ galleryId: { $in: deleteIds } });
            await Promise.all(
                itemsToDelete
                .filter((item) => item.publicId)
                .map((item) => deleteImage(item.publicId).catch(() => null))
            );
        }

        // Upsert metadata-only updates
        for (const item of itemsPayload) {
            if (!item || typeof item !== 'object') {
                continue;
            }

            const galleryId = item.id || item.galleryId;
            if (!galleryId) continue;

            const updateData = {
                alt: item.alt,
                column: item.column ? normalizeColumn(item.column) : undefined,
            };

            if (item.src) {
                updateData.src = item.src;
            }

            // Remove undefined keys
            Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

            if (Object.keys(updateData).length === 0) {
                continue;
            }

            const existing = await GalleryItem.findOne({ galleryId });
            if (existing) {
                Object.assign(existing, updateData);
                await existing.save();
            } else if (updateData.src) {
                await GalleryItem.create({
                    galleryId,
                    src: updateData.src,
                    alt: updateData.alt || 'Gallery Image',
                    column: updateData.column || 'left',
                });
            }
        }

        // Handle new uploads / replacements
        const imageUploads = getFileField(req.files, 'images') || [];
        if (imageUploads.length) {
            for (let index = 0; index < imageUploads.length; index += 1) {
                const file = imageUploads[index];
                const rawMeta = imageMetaRaw[index];
                const meta = !rawMeta || typeof rawMeta === 'string' ?
                    { id: rawMeta } :
                    rawMeta;

                let galleryId =
                    normalizeId(meta.id) ||
                    normalizeId(meta.galleryId) ||
                    normalizeId(galleryIdsForFiles[index]);
                let existing = null;

                if (!galleryId && meta._id) {
                    existing = await GalleryItem.findById(meta._id);
                    galleryId = existing ? existing.galleryId : null;
                }

                if (!galleryId) {
                    galleryId = `gallery-${Date.now()}-${index}`;
                }

                if (!existing && galleryId) {
                    existing = await GalleryItem.findOne({ galleryId });
                }

                const column = normalizeColumn(meta.column || (existing ? existing.column : undefined));

                const uploadResult = await uploadImage({
                    dataUri: bufferToDataUri(file),
                    folder: 'site-gallery',
                    publicId: galleryId,
                });

                if (existing && existing.publicId && existing.publicId !== uploadResult.public_id) {
                    deleteImage(existing.publicId).catch(() => null);
                }

                const payload = {
                    galleryId,
                    src: uploadResult.secure_url,
                    alt: meta.alt || (existing ? existing.alt : file.originalname),
                    column,
                    publicId: uploadResult.public_id,
                };

                if (existing) {
                    Object.assign(existing, payload);
                    await existing.save();
                } else {
                    await GalleryItem.create(payload);
                }
            }
        }

        const gallery = await GalleryItem.find().sort({ createdAt: 1 });
        logger.info('Gallery updated');

        res.status(200).json({
            status: 'success',
            message: 'Gallery updated successfully',
            data: { gallery },
        });
    } catch (error) {
        next(error);
    }
};