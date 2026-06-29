const Router = require('../utils/router');
const { protect, adminOnly } = require('../middleware/auth');

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/authController');

const {
  getPets,
  createPet,
  updatePet,
  deletePet
} = require('../controllers/petController');

const {
  getPackages,
  getPackageById
} = require('../controllers/packageController');

const {
  getBookings,
  createBooking,
  cancelBooking
} = require('../controllers/bookingController');

const {
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

const {
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
} = require('../controllers/adminController');

const router = new Router();


router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.get('/api/auth/profile', protect, getUserProfile);
router.put('/api/auth/profile', protect, updateUserProfile);


router.get('/api/packages', getPackages);
router.get('/api/packages/:id', getPackageById);


router.get('/api/pets', protect, getPets);
router.post('/api/pets', protect, createPet);
router.put('/api/pets/:id', protect, updatePet);
router.delete('/api/pets/:id', protect, deletePet);


router.get('/api/bookings', protect, getBookings);
router.post('/api/bookings', protect, createBooking);
router.put('/api/bookings/:id/cancel', protect, cancelBooking);


router.post('/api/reviews', protect, createReview);
router.put('/api/reviews/:id', protect, updateReview);
router.delete('/api/reviews/:id', protect, deleteReview);


router.get('/api/admin/stats', protect, adminOnly, getAdminStats);
router.get('/api/admin/users', protect, adminOnly, getUsers);
router.delete('/api/admin/users/:id', protect, adminOnly, deleteUser);
router.get('/api/admin/bookings', protect, adminOnly, getAdminBookings);
router.put('/api/admin/bookings/:id/status', protect, adminOnly, updateBookingStatus);
router.post('/api/admin/packages', protect, adminOnly, createPackage);
router.put('/api/admin/packages/:id', protect, adminOnly, updatePackage);
router.delete('/api/admin/packages/:id', protect, adminOnly, deletePackage);
router.get('/api/admin/reviews', protect, adminOnly, getAdminReviews);
router.delete('/api/admin/reviews/:id', protect, adminOnly, deleteAdminReview);

module.exports = router;
