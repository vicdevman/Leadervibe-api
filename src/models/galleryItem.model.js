const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
    galleryId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    src: {
        type: String,
        required: true,
        trim: true,
    },
    alt: {
        type: String,
        trim: true,
    },
    column: {
        type: String,
        enum: ['left', 'right'],
        required: true,
        trim: true,
    },
    publicId: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

galleryItemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret.galleryId;
        delete ret._id;
        delete ret.galleryId;
        return ret;
    },
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);