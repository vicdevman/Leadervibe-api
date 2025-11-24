const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
        trim: true,
    },
    alt: {
        type: String,
        trim: true,
    },
    className: {
        type: String,
        trim: true,
    },
    publicId: {
        type: String,
        trim: true,
    },
}, { _id: false });

const galleryItemSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
        trim: true,
    },
    alt: {
        type: String,
        trim: true,
    },
    className: {
        type: String,
        trim: true,
    },
    publicId: {
        type: String,
        trim: true,
    },
}, { _id: false });

const aboutProfileSchema = new mongoose.Schema({
    profileId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    bookingText: {
        type: String,
        trim: true,
    },
    bookingUrl: {
        type: String,
        trim: true,
    },
    photo: {
        type: photoSchema,
        required: true,
    },
    gallery: {
        type: [galleryItemSchema],
        default: [],
    },
    awards: {
        type: [String],
        default: [],
    },
    certifications: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

aboutProfileSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret.profileId;
        delete ret._id;
        delete ret.profileId;
        return ret;
    },
});

aboutProfileSchema.index({ profileId: 1 });

module.exports = mongoose.model('AboutProfile', aboutProfileSchema);