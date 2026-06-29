const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  transportType: {
    type: String,
    required: [true, 'Transport type is required'],
    enum: ['Flight', 'Train', 'Ground'],
    default: 'Flight'
  },
  petSizeAllowed: {
    type: String,
    required: [true, 'Pet size allowed is required'],
    enum: ['Small', 'Medium', 'Large', 'All'],
    default: 'All'
  },
  maximumPets: {
    type: Number,
    required: [true, 'Maximum pets capacity is required'],
    min: [1, 'Must allow at least 1 pet']
  },
  images: {
    type: [String],
    default: []
  },
  availableSeats: {
    type: Number,
    required: [true, 'Available seats is required'],
    min: [0, 'Seats cannot be negative']
  },
  rating: {
    type: Number,
    default: 0.0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', packageSchema);
