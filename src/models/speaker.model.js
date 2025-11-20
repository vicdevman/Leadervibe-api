const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
        trim: true,
    },
    alt: {
        type: String,
        required: true,
        trim: true,
    },
    className: {
        type: String,
        trim: true,
    },
}, { _id: false });

const speakerSchema = new mongoose.Schema({
    speakerId: {
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
    subtitle: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    fees: {
        type: [String],
        default: [],
    },
    note: {
        type: String,
        trim: true,
    },
    riderHeader: {
        type: String,
        trim: true,
    },
    topics: {
        type: [String],
        default: [],
    },
    photo: {
        type: photoSchema,
        required: true,
    },
}, { timestamps: true });

speakerSchema.index({ speakerId: 1 });

module.exports = mongoose.model('Speaker', speakerSchema);