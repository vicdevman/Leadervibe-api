const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, 'Contact person name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    eventDates: {
      type: String,
      required: [true, 'Event dates are required'],
      trim: true,
    },
    eventLocation: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    audienceType: {
      type: String,
      required: [true, 'Audience type is required'],
      trim: true,
    },
    audienceSize: {
      type: String,
      required: [true, 'Audience size is required'],
      trim: true,
    },
    preferredSpeaker: {
      type: String,
      trim: true,
    },
    topicPreference: {
      type: String,
      trim: true,
    },
    sessionLength: {
      type: String,
      required: [true, 'Session length is required'],
      trim: true,
    },
    avSetup: {
      type: String,
      trim: true,
    },
    recordedOrStreamed: {
      type: String,
      trim: true,
    },
    honorariumBudget: {
      type: String,
      trim: true,
    },
    travelSupport: {
      type: String,
      trim: true,
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'declined'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
