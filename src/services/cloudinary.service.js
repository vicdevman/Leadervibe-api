const AppError = require('../utils/appError');
const { configureCloudinary } = require('../config/cloudinary');

const DEFAULT_FOLDER = process.env.CLOUDINARY_FOLDER || 'leadervibe';

/**
 * Upload an image to Cloudinary
 * @param {Object} options
 * @param {string} [options.dataUri] - data URI string (e.g. from multer memory storage)
 * @param {string} [options.filePath] - path/URL accessible by Cloudinary
 * @param {string} [options.folder] - destination folder
 * @param {string} [options.publicId] - specific public_id to use
 * @param {Object} [options.transformation] - Cloudinary transformation options
 * @param {boolean} [options.overwrite=true]
 * @returns {Promise<Object>} Cloudinary upload response
 */
const uploadImage = async({
    dataUri,
    filePath,
    folder = DEFAULT_FOLDER,
    publicId,
    transformation,
    overwrite = true,
    resourceType = 'image',
    tags,
} = {}) => {
    const client = configureCloudinary();
    const file = dataUri || filePath;

    if (!file) {
        throw new AppError('No file provided for upload', 400);
    }

    return client.uploader.upload(file, {
        folder,
        public_id: publicId,
        overwrite,
        resource_type: resourceType,
        transformation,
        tags,
    });
};

/**
 * Delete an asset from Cloudinary
 * @param {string} publicId - Cloudinary public_id
 * @param {Object} [options]
 * @returns {Promise<Object>} Cloudinary destroy response
 */
const deleteImage = async(publicId, { resourceType = 'image' } = {}) => {
    if (!publicId) {
        throw new AppError('publicId is required to delete an image', 400);
    }

    const client = configureCloudinary();
    return client.uploader.destroy(publicId, { resource_type: resourceType });
};

module.exports = {
    uploadImage,
    deleteImage,
};