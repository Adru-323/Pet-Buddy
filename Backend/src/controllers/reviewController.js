const Review = require('../models/Review');
const Booking = require('../models/Booking');

// @desc    Create a new review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // 1. Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // 2. Security Check: Does this booking belong to the logged-in user?
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to review this booking' });
    }

    // 3. Business Logic Check: Is the booking completed?
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'You can only review completed bookings.' });
    }

    // 4. Duplicate Check: Did they already review this?
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this booking.' });
    }

    // 5. Create the review
    const review = await Review.create({
      customer: req.user._id,
      booking: bookingId,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating review' });
  }
};

// @desc    Get all reviews (For the Homepage Testimonials)
// @route   GET /api/reviews
const getReviews = async (req, res) => {
  try {
    // Populate the customer's name so we can display it on the homepage
    const reviews = await Review.find({})
      .populate('customer', 'name')
      .sort({ createdAt: -1 }); // Newest first
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only the person who wrote it OR an admin can delete it
    if (review.customer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting review' });
  }
};

module.exports = { createReview, getReviews, deleteReview };