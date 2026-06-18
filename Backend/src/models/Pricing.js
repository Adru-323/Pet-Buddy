const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  walk30: { type: Number, default: 160 },
  walk45: { type: Number, default: 200 },
  sitHour: { type: Number, default: 100 },
  sitDay: { type: Number, default: 1200 },
  boardNight: { type: Number, default: 800 },
  boardWeek: { type: Number, default: 5000 },
});

module.exports = mongoose.model('Pricing', pricingSchema);