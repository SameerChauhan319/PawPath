const mongoose = require('mongoose');
const crypto = require('crypto');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  travelDate: {
    type: Date,
    required: [true, 'Travel date is required']
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  bookingStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
    default: 'Pending'
  }
});

bookingSchema.pre('save', function () {
  if (!this.bookingId) {
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    this.bookingId = `BK-${randomHex}`;
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
