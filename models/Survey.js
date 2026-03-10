const mongoose = require('mongoose');

// Schema for one survey response.
// This keeps the database structure clean and predictable.
const surveySchema = new mongoose.Schema(
  {
    ageGroup: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    preferredDevice: {
      type: String,
      required: true,
      trim: true
    },
    satisfaction: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Survey', surveySchema);
