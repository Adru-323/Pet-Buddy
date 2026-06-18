

// const Booking = require('../models/Booking');
// const Pet = require('../models/Pet');
// // We no longer need this because the frontend calculates dynamic pricing!
// // const { calculatePrice } = require('../services/priceService'); 

// // @desc    Create a new booking
// // @route   POST /api/bookings
// const createBooking = async (req, res) => {
//   // 1. ADDED totalPrice to the extraction from req.body
//   const { petId, serviceType, bookingDate, bookingTime, address, notes, totalPrice } = req.body;

//   // Verify pet belongs to the customer
//   const pet = await Pet.findById(petId);
//   if (!pet || pet.owner.toString() !== req.user._id.toString()) {
//     return res.status(404).json({ message: 'Pet not found or unauthorized' });
//   }

//   // 2. REMOVED the old calculatePrice function which was returning 0 and crashing!
//   // Instead, we just ensure the frontend sent a valid total price.
//   if (!totalPrice || totalPrice === 0) {
//     return res.status(400).json({ message: 'Invalid service type or price' });
//   }

//   const booking = new Booking({
//     customer: req.user._id,
//     pet: petId,
//     serviceType,
//     bookingDate,
//     bookingTime,
//     address,
//     notes,
//     totalPrice
//   });

//   const createdBooking = await booking.save();
//   res.status(201).json(createdBooking);
// };

// // @desc    Get logged in user's bookings
// // @route   GET /api/bookings/my-bookings
// const getMyBookings = async (req, res) => {
//   // Populate pet details so we can show the pet name/image on the frontend
//   const bookings = await Booking.find({ customer: req.user._id })
//     .populate('pet', 'petName petType image')
//     .sort({ createdAt: -1 }); // Newest first
    
//   res.json(bookings);
// };

// // @desc    Get single booking by ID
// // @route   GET /api/bookings/:id
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

// // @desc    Cancel a booking
// // @route   PUT /api/bookings/:id/cancel
// const cancelBooking = async (req, res) => {
//   const booking = await Booking.findById(req.params.id);

//   if (booking && booking.customer.toString() === req.user._id.toString()) {
//     if (['completed', 'rejected', 'cancelled'].includes(booking.status)) {
//       return res.status(400).json({ message: `Cannot cancel a ${booking.status} booking` });
//     }

//     booking.status = 'cancelled';
//     const updatedBooking = await booking.save();
//     res.json(updatedBooking);
//   } else {
//     res.status(404).json({ message: 'Booking not found or unauthorized' });
//   }
// };

// module.exports = { createBooking, getMyBookings, getBookingById, cancelBooking };


//Claude

const Booking = require('../models/Booking');
const Pet = require('../models/Pet');

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
    totalPrice
  });

  const createdBooking = await booking.save();
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
  const booking = await Booking.findById(req.params.id);

  if (booking && booking.customer.toString() === req.user._id.toString()) {
    if (['completed', 'rejected', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ message: `Cannot cancel a ${booking.status} booking` });
    }

    booking.status = 'cancelled';
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404).json({ message: 'Booking not found or unauthorized' });
  }
};

module.exports = { createBooking, getMyBookings, getBookingById, cancelBooking };