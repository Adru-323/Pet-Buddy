const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Booking Created', 'Booking Approved', 'Booking Rejected', 'Booking Completed'],
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  relatedBooking: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);