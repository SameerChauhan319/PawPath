const User = require('../models/User');
const Pet = require('../models/Pet');
const Package = require('../models/Package');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const { updatePackageAverageRating } = require('./reviewController');



const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBookings = await Booking.countDocuments();
    const totalPackages = await Package.countDocuments();
    const totalPets = await Pet.countDocuments(); 
    
    
    const bookings = await Booking.find().populate('packageId');
    const revenue = bookings.reduce((sum, booking) => {
      if (booking.packageId && (booking.bookingStatus === 'Approved' || booking.paymentStatus === 'Paid')) {
        return sum + booking.packageId.price;
      }
      return sum;
    }, 0);

    
    const popularPackagesAggregation = await Booking.aggregate([
      { $group: { _id: '$packageId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    
    let popularPackageName = 'N/A';
    if (popularPackagesAggregation.length > 0) {
      const popPkg = await Package.findById(popularPackagesAggregation[0]._id);
      if (popPkg) {
        popularPackageName = popPkg.destination;
      }
    }

    
    const recentBookings = await Booking.find({})
      .populate('userId', 'name email')
      .populate('petId')
      .populate('packageId')
      .sort({ bookingDate: -1 })
      .limit(5);

    
    const recentUsers = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    return res.json({
      success: true,
      message: 'Admin statistics fetched successfully',
      data: {
        totalUsers,
        totalBookings,
        totalPackages,
        totalPets,
        revenue,
        popularPackage: popularPackageName,
        recentBookings,
        recentUsers
      }
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return res.json({
      success: true,
      message: 'Users fetched successfully',
      data: users
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ success: false, message: 'User not found' }, 404);
    }

    if (user.role === 'admin') {
      return res.json({ success: false, message: 'Cannot delete admin users' }, 400);
    }

    
    await Pet.deleteMany({ userId: user._id });
    await Booking.deleteMany({ userId: user._id });
    await Review.deleteMany({ userId: user._id });
    
    await user.deleteOne();
    return res.json({
      success: true,
      message: 'User account and all related history records deleted successfully'
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const getAdminBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'name email')
      .populate('petId')
      .populate('packageId')
      .sort({ bookingDate: -1 });

    return res.json({
      success: true,
      message: 'All bookings fetched successfully',
      data: bookings
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const updateBookingStatus = async (req, res) => {
  const { bookingStatus, paymentStatus } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.json({ success: false, message: 'Booking not found' }, 404);
    }

    const oldStatus = booking.bookingStatus;
    
    
    if (bookingStatus && bookingStatus !== oldStatus) {
      
      if ((bookingStatus === 'Rejected' || bookingStatus === 'Cancelled') && 
          oldStatus !== 'Rejected' && oldStatus !== 'Cancelled') {
        const pkg = await Package.findById(booking.packageId);
        if (pkg) {
          pkg.availableSeats += 1;
          await pkg.save();
        }
      }
      
      else if ((oldStatus === 'Rejected' || oldStatus === 'Cancelled') && 
               (bookingStatus === 'Approved' || bookingStatus === 'Pending')) {
        const pkg = await Package.findById(booking.packageId);
        if (pkg) {
          if (pkg.availableSeats <= 0) {
            return res.json({ success: false, message: 'Cannot reinstate booking: No available seats in package.' }, 400);
          }
          pkg.availableSeats -= 1;
          await pkg.save();
        }
      }
      booking.bookingStatus = bookingStatus;
    }

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }

    const updatedBooking = await booking.save();
    
    
    const populated = await Booking.findById(updatedBooking._id)
      .populate('userId', 'name email')
      .populate('petId')
      .populate('packageId');

    return res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: populated
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const createPackage = async (req, res) => {
  const { destination, description, price, duration, transportType, petSizeAllowed, maximumPets, images, availableSeats } = req.body;

  if (!destination || !description || price === undefined || !duration || !transportType || !petSizeAllowed || maximumPets === undefined || availableSeats === undefined) {
    return res.json({ success: false, message: 'Please provide all package details' }, 400);
  }

  try {
    const pkg = new Package({
      destination,
      description,
      price: Number(price),
      duration,
      transportType,
      petSizeAllowed,
      maximumPets: Number(maximumPets),
      images: images || [],
      availableSeats: Number(availableSeats),
      rating: 0
    });

    const createdPkg = await pkg.save();
    return res.json({
      success: true,
      message: 'Travel Package created successfully',
      data: createdPkg
    }, 201);
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const updatePackage = async (req, res) => {
  const { destination, description, price, duration, transportType, petSizeAllowed, maximumPets, images, availableSeats } = req.body;

  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.json({ success: false, message: 'Package not found' }, 404);
    }

    pkg.destination = destination || pkg.destination;
    pkg.description = description || pkg.description;
    pkg.price = price !== undefined ? Number(price) : pkg.price;
    pkg.duration = duration || pkg.duration;
    pkg.transportType = transportType || pkg.transportType;
    pkg.petSizeAllowed = petSizeAllowed || pkg.petSizeAllowed;
    pkg.maximumPets = maximumPets !== undefined ? Number(maximumPets) : pkg.maximumPets;
    pkg.images = images || pkg.images;
    pkg.availableSeats = availableSeats !== undefined ? Number(availableSeats) : pkg.availableSeats;

    const updatedPkg = await pkg.save();
    return res.json({
      success: true,
      message: 'Travel Package updated successfully',
      data: updatedPkg
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.json({ success: false, message: 'Package not found' }, 404);
    }

    
    await Review.deleteMany({ packageId: pkg._id });
    await Booking.deleteMany({ packageId: pkg._id });

    await pkg.deleteOne();
    return res.json({
      success: true,
      message: 'Travel Package and related bookings/reviews deleted successfully'
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('userId', 'name email')
      .populate('packageId', 'destination')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: 'Reviews fetched successfully',
      data: reviews
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const deleteAdminReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.json({ success: false, message: 'Review not found' }, 404);
    }

    const packageId = review.packageId;
    await review.deleteOne();

    
    await updatePackageAverageRating(packageId);

    return res.json({
      success: true,
      message: 'Review moderated and removed successfully'
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};

module.exports = {
  getAdminStats,
  getUsers,
  deleteUser,
  getAdminBookings,
  updateBookingStatus,
  createPackage,
  updatePackage,
  deletePackage,
  getAdminReviews,
  deleteAdminReview
};
