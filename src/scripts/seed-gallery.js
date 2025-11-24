const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const connectDB = require('../config/database');
const GalleryItem = require('../models/galleryItem.model');
const logger = require('../utils/logger');

const FALLBACK_GALLERY = [
    { id: 'gallery-1', src: 'images/Replacement A.jpg', alt: 'Gallery Image 1', column: 'left' },
    { id: 'gallery-2', src: 'images/Replacement B.jpg', alt: 'Gallery Image 2', column: 'left' },
    { id: 'gallery-3', src: 'images/haydenspeech.jpeg', alt: 'Gallery Image 3', column: 'left' },
    { id: 'gallery-4', src: 'images/7E7A3867.JPG', alt: 'Gallery Image 4', column: 'right' },
    { id: 'gallery-5', src: 'images/IMG_8028.jpg', alt: 'Gallery Image 5', column: 'right' },
    { id: 'gallery-6', src: 'images/gympic.jpeg', alt: 'Gallery Image 6', column: 'right' },
];

const seedGallery = async() => {
    try {
        await connectDB();

        const operations = FALLBACK_GALLERY.map((item, index) => ({
            updateOne: {
                filter: { galleryId: item.id },
                update: {
                    $set: {
                        galleryId: item.id,
                        src: item.src,
                        alt: item.alt,
                        column: item.column,
                    },
                    $setOnInsert: {
                        order: index,
                    },
                },
                upsert: true,
            },
        }));

        await GalleryItem.bulkWrite(operations);

        logger.info('Gallery seeded successfully');
        process.exit(0);
    } catch (error) {
        logger.error(`Error seeding gallery: ${error.message}`);
        process.exit(1);
    }
};

seedGallery();