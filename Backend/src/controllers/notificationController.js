const Notification = require('../models/Notification');

// --- HELPER FUNCTION (Used internally by your other backend files) ---
const createNotification = async (recipientId, type, message, bookingId) => {
  try {
    await Notification.create({
      recipient: recipientId,
      type,
      message,
      relatedBooking: bookingId
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};

// @desc    Get logged-in user's notifications
// @route   GET /api/notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 }) // Newest first
      .limit(20); // Only grab the last 20 to keep it fast
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching notifications' });
  }
};

// @desc    Mark a single notification as read
// @route   PUT /api/notifications/:id/read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (notification && notification.recipient.toString() === req.user._id.toString()) {
      notification.isRead = true;
      await notification.save();
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating notification' });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating notifications' });
  }
};

module.exports = { createNotification, getNotifications, markAsRead, markAllAsRead };