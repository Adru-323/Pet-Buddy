// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   customer: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   pet: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Pet', 
//     required: true 
//   },
//   serviceType: { 
//     type: String, 
//     required: true,
//     enum: ['Walking', 'Sitting', 'Boarding'], // Restored the original strict enum

//   },
//   bookingDate: { type: Date, required: true },
//   bookingTime: { type: String, required: true },
//   address: { type: String, required: true },
//   notes: { type: String },
//   totalPrice: { type: Number, required: true },
//   status: { 
//     type: String, 
//     enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
//     default: 'pending' 
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);


// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   customer: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   pet: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Pet', 
//     required: true 
//   },
//   serviceType: { 
//     type: String, 
//     required: true,
//     enum: ['Walking', 'Sitting', 'Boarding'], // Strict enum
//   },
//   packageName: { type: String }, // NEW: Saves exactly "Walking - 45 Minutes"
//   frequency: { type: String }, // NEW: Saves 'once' or 'twice'
//   bookingDate: { type: Date, required: true }, // Acts as the Start Date
//   endDate: { type: Date }, // NEW: Acts as the End Date
//   bookingTime: { type: String, required: true }, // Saves the AM/PM time natively
//   address: { type: String, required: true },
//   notes: { type: String },
//   totalPrice: { type: Number, required: true },
//   status: { 
//     type: String, 
//     enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
//     default: 'pending' 
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);


//Claude


const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Walking', 'Sitting', 'Boarding']
  },
  packageName: { type: String },
  frequency: { type: String },
  bookingDate: { type: Date, required: true },
  endDate: { type: Date },
  bookingTime: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);