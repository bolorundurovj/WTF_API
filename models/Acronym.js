const mongoose = require('mongoose');

const AcronymSchema = new mongoose.Schema(
  {
    acronym: {
      type: String,
      required: [true, 'please add an acronym'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define Indexes
AcronymSchema.index({
  acronym: 'text',
  description: 'text'
});

module.exports = mongoose.model('Acronym', AcronymSchema);
