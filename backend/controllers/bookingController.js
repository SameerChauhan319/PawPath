const Booking = require('../models/Booking');
const Package = require('../models/Package');
const Pet = require('../models/Pet');



const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('petId')
      .populate('packageId')
      .sort({ bookingDate: -1 });

    return res.json({
      success: true,
      message: 'Bookings fetched successfully',
      data: bookings
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const createBooking = async (req, res) => {
  const { petId, packageId, travelDate } = req.body;

  if (!petId || !packageId || !travelDate) {
    return res.json({ success: false, message: 'Pet ID, Package ID, and Travel Date are required' }, 400);
  }

  const travelDateParsed = new Date(travelDate);
  if (isNaN(travelDateParsed.getTime())) {
    return res.json({ success: false, message: 'Invalid travel date format' }, 400);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (travelDateParsed < today) {
    return res.json({ success: false, message: 'Booking failed because the selected date has already passed.' }, 400);
  }

  try {
    
    const pet = await Pet.findById(petId);
    if (!pet || pet.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Selected pet not found or does not belong to you' }, 404);
    }

    
    const travelPackage = await Package.findById(packageId);
    if (!travelPackage) {
      return res.json({ success: false, message: 'Selected travel package not found' }, 404);
    }

    
    if (travelPackage.availableSeats <= 0) {
      return res.json({ success: false, message: 'Booking failed because the selected package is fully booked.' }, 400);
    }

    
    if (travelPackage.petSizeAllowed !== 'All') {
      
      let petSize = 'Small';
      if (pet.weight > 10 && pet.weight <= 25) petSize = 'Medium';
      if (pet.weight > 25) petSize = 'Large';

      if (travelPackage.petSizeAllowed !== petSize) {
        const sizeOrder = { 'Small': 1, 'Medium': 2, 'Large': 3 };
        const packageSizeVal = sizeOrder[travelPackage.petSizeAllowed];
        const petSizeVal = sizeOrder[petSize];

        if (petSizeVal > packageSizeVal) {
          return res.json({ 
            success: false, 
            message: `Your pet size (${petSize}) exceeds the maximum allowed size (${travelPackage.petSizeAllowed}) for this package.` 
          }, 400);
        }
      }
    }

    
    travelPackage.availableSeats -= 1;
    await travelPackage.save();

    
    const booking = new Booking({
      userId: req.user._id,
      petId,
      packageId,
      travelDate: travelDateParsed,
      paymentStatus: 'Pending',
      bookingStatus: 'Pending'
    });

    const createdBooking = await booking.save();
    return res.json({
      success: true,
      message: 'Booking request submitted successfully! Awaiting administrator approval.',
      data: createdBooking
    }, 201);
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.json({ success: false, message: 'Booking not found' }, 404);
    }

    
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Not authorized to cancel this booking' }, 403);
    }

    if (booking.bookingStatus === 'Cancelled') {
      return res.json({ success: false, message: 'Booking is already cancelled' }, 400);
    }

    
    const travelPackage = await Package.findById(booking.packageId);
    if (travelPackage && booking.bookingStatus !== 'Rejected') {
      travelPackage.availableSeats += 1;
      await travelPackage.save();
    }

    booking.bookingStatus = 'Cancelled';
    const updatedBooking = await booking.save();

    return res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: updatedBooking
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};

module.exports = {
  getBookings,
  createBooking,
  cancelBooking
};
