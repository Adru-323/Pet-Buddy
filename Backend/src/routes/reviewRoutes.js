const express = require('express');
const router = express.Router();
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware'); // Your existing auth middleware

// Public route to get reviews for the homepage
router.get('/', getReviews);

// Protected routes (User must be logged in)
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;