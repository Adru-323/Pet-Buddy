const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendMail } = require('../services/emailService');
const { bookingStatusUpdate } = require('../services/emailTemplates');

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('customer', 'name email phone')
    .populate('pet', 'petName petType')
    .sort({ createdAt: -1 });

  res.json(bookings);
};

const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id).populate('pet', 'petName petType');

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  booking.status = status;
  const updatedBooking = await booking.save();

  const user = await User.findById(booking.customer);

  await sendMail({
    to: user.email,
    subject: `📋 Booking ${status.charAt(0).toUpperCase() + status.slice(1)} — Pet Buddy`,
    html: bookingStatusUpdate(updatedBooking, user.name, status),
  });

  res.json(updatedBooking);
};

const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  await booking.deleteOne();
  res.json({ message: 'Booking deleted successfully' });
};

module.exports = { getAllBookings, updateBookingStatus, deleteBooking };
