const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true
  },
  species: {
    type: String,
    required: [true, 'Species is required'],
    enum: ['Dog', 'Cat', 'Exotic'],
    default: 'Dog'
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [0, 'Weight cannot be negative']
  },
  vaccinationStatus: {
    type: String,
    required: [true, 'Vaccination status is required'],
    enum: ['Vaccinated', 'Not Vaccinated', 'Partially Vaccinated'],
    default: 'Not Vaccinated'
  },
  medicalNotes: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pet', petSchema);
