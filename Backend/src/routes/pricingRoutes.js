const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');

// GET: Fetch prices (Public)
router.get('/', async (req, res) => {
  try {
    let pricing = await Pricing.findOne();
    // If no pricing exists in DB yet, create the default one
    if (!pricing) {
      pricing = await Pricing.create({}); 
    }
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT: Update prices (Admin Only - make sure to add your protect/admin middleware later!)
router.put('/', async (req, res) => {
  try {
    let pricing = await Pricing.findOne();
    if (pricing) {
      pricing.walk30 = req.body.walk30;
      pricing.walk45 = req.body.walk45;
      pricing.sitHour = req.body.sitHour;
      pricing.sitDay = req.body.sitDay;
      pricing.boardNight = req.body.boardNight;
      pricing.boardWeek = req.body.boardWeek;
      await pricing.save();
      res.json(pricing);
    } else {
      res.status(404).json({ message: "Pricing not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;