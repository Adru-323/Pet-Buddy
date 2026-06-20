// const Booking = require('../models/Booking');
// const Pet = require('../models/Pet');
// const User = require('../models/User');
// const { sendMail } = require('../services/emailService');
// const {
//   bookingConfirmationUser,
//   newBookingAdmin,
//   bookingStatusUpdate,
//   bookingCancelledByUser,
//   bookingCancelledAdmin,
// } = require('../services/emailTemplates');

// const createBooking = async (req, res) => {
//   const { petId, serviceType, packageName, bookingDate, endDate, bookingTime, frequency, address, notes, totalPrice } = req.body;

//   const pet = await Pet.findById(petId);
//   if (!pet || pet.owner.toString() !== req.user._id.toString()) {
//     return res.status(404).json({ message: 'Pet not found or unauthorized' });
//   }

//   if (!totalPrice || totalPrice === 0) {
//     return res.status(400).json({ message: 'Invalid service type or price' });
//   }

//   const booking = new Booking({
//     customer: req.user._id,
//     pet: petId,
//     serviceType,
//     packageName,
//     bookingDate,
//     endDate,
//     bookingTime,
//     frequency,
//     address,
//     notes,
//     totalPrice,
//   });

//   const createdBooking = await booking.save();

//   const populatedBooking = await Booking.findById(createdBooking._id).populate('pet', 'petName petType');
//   const user = await User.findById(req.user._id);

//   await sendMail({
//     to: user.email,
//     subject: '🐾 Booking Received — Pet Buddy',
//     html: bookingConfirmationUser(populatedBooking, user.name),
//   });

//   await sendMail({
//     to: process.env.ADMIN_EMAIL,
//     subject: `🔔 New Booking from ${user.name} — Pet Buddy`,
//     html: newBookingAdmin(populatedBooking, user.name, user.email, user.phone),
//   });

//   res.status(201).json(createdBooking);
// };

// const getMyBookings = async (req, res) => {
//   const bookings = await Booking.find({ customer: req.user._id })
//     .populate('pet', 'petName petType image')
//     .sort({ createdAt: -1 });

//   res.json(bookings);
// };

// const getBookingById = async (req, res) => {
//   const booking = await Booking.findById(req.params.id)
//     .populate('pet', 'petName petType breed image')
//     .populate('customer', 'name email phone');

//   if (booking && booking.customer._id.toString() === req.user._id.toString()) {
//     res.json(booking);
//   } else {
//     res.status(404).json({ message: 'Booking not found or unauthorized' });
//   }
// };

// const cancelBooking = async (req, res) => {
//   const booking = await Booking.findById(req.params.id).populate('pet', 'petName petType');

//   if (booking && booking.customer.toString() === req.user._id.toString()) {
//     if (['completed', 'rejected', 'cancelled'].includes(booking.status)) {
//       return res.status(400).json({ message: `Cannot cancel a ${booking.status} booking` });
//     }

//     booking.status = 'cancelled';
//     const updatedBooking = await booking.save();

//     const user = await User.findById(req.user._id);

//     await sendMail({
//       to: user.email,
//       subject: '⚠️ Booking Cancelled — Pet Buddy',
//       html: bookingCancelledByUser(updatedBooking, user.name),
//     });

//     await sendMail({
//       to: process.env.ADMIN_EMAIL,
//       subject: `🚫 Booking Cancelled by ${user.name} — Pet Buddy`,
//       html: bookingCancelledAdmin(updatedBooking, user.name, user.email),
//     });

//     res.json(updatedBooking);
//   } else {
//     res.status(404).json({ message: 'Booking not found or unauthorized' });
//   }
// };

// module.exports = { createBooking, getMyBookings, getBookingById, cancelBooking };


const Booking = require('../models/Booking');
const Pet = require('../models/Pet');
const User = require('../models/User');
const { sendMail } = require('../services/emailService');
const {
  bookingConfirmationUser,
  newBookingAdmin,
  bookingStatusUpdate,
  bookingCancelledByUser,
  bookingCancelledAdmin,
} = require('../services/emailTemplates');

const createBooking = async (req, res) => {
  const { petId, serviceType, packageName, bookingDate, endDate, bookingTime, frequency, address, notes, totalPrice } = req.body;

  const pet = await Pet.findById(petId);
  if (!pet || pet.owner.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Pet not found or unauthorized' });
  }

  if (!totalPrice || totalPrice === 0) {
    return res.status(400).json({ message: 'Invalid service type or price' });
  }

  const booking = new Booking({
    customer: req.user._id,
    pet: petId,
    serviceType,
    packageName,
    bookingDate,
    endDate,
    bookingTime,
    frequency,
    address,
    notes,
    totalPrice,
  });

  const createdBooking = await booking.save();

  try {
    const populatedBooking = await Booking.findById(createdBooking._id).populate('pet', 'petName petType');
    const user = await User.findById(req.user._id);

    console.log('📧 Sending booking confirmation to:', user.email);
    console.log('📧 Sending admin alert to:', process.env.ADMIN_EMAIL);
    console.log('📧 Zoho sender:', process.env.ZOHO_EMAIL);

    await sendMail({
      to: user.email,
      subject: '🐾 Booking Received — Pet Buddy',
      html: bookingConfirmationUser(populatedBooking, user.name),
    });

    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 New Booking from ${user.name} — Pet Buddy`,
      html: newBookingAdmin(populatedBooking, user.name, user.email, user.phone),
    });

    console.log('✅ Emails sent successfully');
  } catch (emailError) {
    console.error('❌ Email failed (booking still saved):', emailError.message);
  }

  res.status(201).json(createdBooking);
};

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user._id })
    .populate('pet', 'petName petType image')
    .sort({ createdAt: -1 });

  res.json(bookings);
};

const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('pet', 'petName petType breed image')
    .populate('customer', 'name email phone');

  if (booking && booking.customer._id.toString() === req.user._id.toString()) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found or unauthorized' });
  }
};

const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('pet', 'petName petType');

  if (booking && booking.customer.toString() === req.user._id.toString()) {
    if (['completed', 'rejected', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ message: `Cannot cancel a ${booking.status} booking` });
    }

    booking.status = 'cancelled';
    const updatedBooking = await booking.save();

    try {
      const user = await User.findById(req.user._id);

      await sendMail({
        to: user.email,
        subject: '⚠️ Booking Cancelled — Pet Buddy',
        html: bookingCancelledByUser(updatedBooking, user.name),
      });

      await sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: `🚫 Booking Cancelled by ${user.name} — Pet Buddy`,
        html: bookingCancelledAdmin(updatedBooking, user.name, user.email),
      });

      console.log('✅ Cancellation emails sent');
    } catch (emailError) {
      console.error('❌ Email failed (cancellation still saved):', emailError.message);
    }

    res.json(updatedBooking);
  } else {
    res.status(404).json({ message: 'Booking not found or unauthorized' });
  }
};

module.exports = { createBooking, getMyBookings, getBookingById, cancelBooking };