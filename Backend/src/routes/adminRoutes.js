const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/adminController');

// Apply middleware to ALL routes in this file
router.use(protect, admin);

router.get('/stats', getAdminStats);
router.route('/users').get(getAllUsers);
router.route('/users/:id').delete(deleteUser);
router.route('/bookings').get(getAllBookings);
router.route('/bookings/:id').delete(deleteBooking);
router.route('/bookings/:id/status').put(updateBookingStatus);

module.exports = router;