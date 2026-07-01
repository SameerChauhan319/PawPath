const Review = require('../models/Review');
const Package = require('../models/Package');
const Booking = require('../models/Booking');


const updatePackageAverageRating = async (packageId) => {
  const reviews = await Review.find({ packageId });
  if (reviews.length === 0) {
    await Package.findByIdAndUpdate(packageId, { rating: 0 });
    return;
  }
  const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const average = sum / reviews.length;
  
  await Package.findByIdAndUpdate(packageId, { rating: Math.round(average * 10) / 10 });
};



const createReview = async (req, res) => {
  const { packageId, rating, comment } = req.body;

  if (!packageId || !rating || !comment) {
    return res.json({ success: false, message: 'Package ID, rating, and comment are required' }, 400);
  }

  try {
    
    const travelPackage = await Package.findById(packageId);
    if (!travelPackage) {
      return res.json({ success: false, message: 'Package not found' }, 404);
    }

    
    const hasBooked = await Booking.findOne({ userId: req.user._id, packageId });
    if (!hasBooked) {
      return res.json({ success: false, message: 'You must have a booking history with this package to leave a review.' }, 403);
    }

    
    const alreadyReviewed = await Review.findOne({ userId: req.user._id, packageId });
    if (alreadyReviewed) {
      return res.json({ success: false, message: 'You have already reviewed this package. Please edit your existing review instead.' }, 400);
    }

    const review = new Review({
      userId: req.user._id,
      packageId,
      rating: Number(rating),
      comment
    });

    const createdReview = await review.save();
    
    
    await updatePackageAverageRating(packageId);

    return res.json({
      success: true,
      message: 'Review submitted successfully',
      data: createdReview
    }, 201);
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.json({ success: false, message: 'Review not found' }, 404);
    }

    
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Not authorized to edit this review' }, 403);
    }

    review.rating = rating !== undefined ? Number(rating) : review.rating;
    review.comment = comment || review.comment;
    review.updatedAt = Date.now();

    const updatedReview = await review.save();

    
    await updatePackageAverageRating(review.packageId);

    return res.json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.json({ success: false, message: 'Review not found' }, 404);
    }

    
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Not authorized to delete this review' }, 403);
    }

    const packageId = review.packageId;
    await review.deleteOne();

    
    await updatePackageAverageRating(packageId);

    return res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  updatePackageAverageRating 
};
