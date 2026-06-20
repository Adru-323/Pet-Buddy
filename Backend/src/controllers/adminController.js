const User = require('../models/User');
const Pet = require('../models/Pet');
const Booking = require('../models/Booking');
const { createNotification } = require('./notificationController');
const { sendMail } = require('../services/emailService');
const { bookingStatusUpdate } = require('../services/emailTemplates');

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalPets = await Pet.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    res.json({ totalUsers, totalPets, totalBookings, pendingBookings, completedBookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin stats' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Cannot delete admin user' });
      }
      await Pet.deleteMany({ owner: user._id });
      await Booking.deleteMany({ customer: user._id });
      await user.deleteOne();
      res.json({ message: 'User and associated data removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('customer', 'name email')
      .populate('pet', 'petName')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id).populate('pet', 'petName petType');

    if (booking) {
      booking.status = status;
      const updatedBooking = await booking.save();

      let message = `Your booking for ${booking.serviceType} has been updated to ${status}.`;
      let type = 'Booking Completed';
      if (status === 'approved') type = 'Booking Approved';
      if (status === 'rejected') type = 'Booking Rejected';

      await createNotification(booking.customer, type, message, booking._id);

      try {
        const user = await User.findById(booking.customer);
        await sendMail({
          to: user.email,
          subject: `📋 Booking ${status.charAt(0).toUpperCase() + status.slice(1)} — Pet Buddy`,
          html: bookingStatusUpdate(updatedBooking, user.name, status),
        });
        console.log(`✅ Status update email sent to ${user.email}`);
      } catch (emailError) {
        console.error('❌ Email failed (status still updated):', emailError.message);
      }

      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      await booking.deleteOne();
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
};