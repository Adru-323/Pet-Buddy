const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (timeStr) => {
  if (!timeStr) return 'N/A';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
};

const baseLayout = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f8; color: #333; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px 40px; text-align: center; }
    .header img { width: 48px; margin-bottom: 12px; }
    .header h1 { color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { color: #c7d2fe; font-size: 14px; margin-top: 4px; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 18px; font-weight: 600; color: #1e1b4b; margin-bottom: 8px; }
    .subtext { font-size: 14px; color: #6b7280; margin-bottom: 28px; line-height: 1.6; }
    .card { background: #f8f7ff; border: 1px solid #e0e7ff; border-radius: 10px; padding: 24px; margin-bottom: 24px; }
    .card-title { font-size: 13px; font-weight: 700; color: #6d28d9; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
    .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #ede9fe; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-size: 13px; color: #6b7280; }
    .detail-value { font-size: 14px; font-weight: 600; color: #1f2937; text-align: right; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .badge-pending { background: #fef9c3; color: #854d0e; }
    .badge-approved { background: #dcfce7; color: #166534; }
    .badge-rejected { background: #fee2e2; color: #991b1b; }
    .badge-completed { background: #dbeafe; color: #1e40af; }
    .badge-cancelled { background: #f3f4f6; color: #374151; }
    .cta { text-align: center; margin: 28px 0; }
    .cta a { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; display: inline-block; }
    .alert-box { border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; }
    .alert-success { background: #f0fdf4; border-left: 4px solid #22c55e; color: #166534; }
    .alert-warning { background: #fffbeb; border-left: 4px solid #f59e0b; color: #92400e; }
    .alert-danger { background: #fef2f2; border-left: 4px solid #ef4444; color: #991b1b; }
    .footer { background: #f8f7ff; padding: 24px 40px; text-align: center; border-top: 1px solid #ede9fe; }
    .footer p { font-size: 12px; color: #9ca3af; line-height: 1.8; }
    .footer a { color: #6d28d9; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🐾 Pet Buddy</h1>
      <p>Your trusted pet care partner</p>
    </div>
    ${content}
    <div class="footer">
      <p>© ${new Date().getFullYear()} Pet Buddy. All rights reserved.<br/>
      Questions? <a href="mailto:support@pet-buddy.live">support@pet-buddy.live</a><br/>
      <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
    </div>
  </div>
</body>
</html>
`;

const bookingDetailsCard = (booking) => `
  <div class="card">
    <div class="card-title">Booking Details</div>
    <div class="detail-row">
      <span class="detail-label">Service</span>
      <span class="detail-value">${booking.serviceType}${booking.packageName ? ` — ${booking.packageName}` : ''}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Pet</span>
      <span class="detail-value">${booking.pet?.petName || 'N/A'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Start Date</span>
      <span class="detail-value">${formatDate(booking.bookingDate)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">End Date</span>
      <span class="detail-value">${formatDate(booking.endDate)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Time</span>
      <span class="detail-value">${formatTime(booking.bookingTime)}</span>
    </div>
    ${booking.frequency ? `
    <div class="detail-row">
      <span class="detail-label">Frequency</span>
      <span class="detail-value">${booking.frequency === 'twice' ? 'Twice / day' : 'Once / day'}</span>
    </div>` : ''}
    <div class="detail-row">
      <span class="detail-label">Address</span>
      <span class="detail-value">${booking.address}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Total Price</span>
      <span class="detail-value">₹${booking.totalPrice}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Status</span>
      <span class="detail-value"><span class="badge badge-${booking.status}">${booking.status}</span></span>
    </div>
  </div>
`;

const bookingConfirmationUser = (booking, userName) =>
  baseLayout(`
    <div class="body">
      <div class="greeting">Hi ${userName} 👋</div>
      <p class="subtext">Your booking has been received! We'll review it and confirm shortly. Here's a summary of what you've booked:</p>
      <div class="alert-box alert-success">
        ✅ <strong>Booking Received!</strong> Our team will approve it within 24 hours. You'll get another email once confirmed.
      </div>
      ${bookingDetailsCard(booking)}
      <div class="cta">
        <a href="${process.env.CLIENT_URL}/my-bookings">View My Bookings</a>
      </div>
    </div>
  `);

const newBookingAdmin = (booking, userName, userEmail, userPhone) =>
  baseLayout(`
    <div class="body">
      <div class="greeting">New Booking Alert 🔔</div>
      <p class="subtext">A new booking has just been placed and is waiting for your approval.</p>
      <div class="card">
        <div class="card-title">Customer Info</div>
        <div class="detail-row">
          <span class="detail-label">Name</span>
          <span class="detail-value">${userName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">${userEmail}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone</span>
          <span class="detail-value">${userPhone || 'N/A'}</span>
        </div>
      </div>
      ${bookingDetailsCard(booking)}
      <div class="cta">
        <a href="${process.env.CLIENT_URL}/admin/bookings">Manage Bookings</a>
      </div>
    </div>
  `);

const bookingStatusUpdate = (booking, userName, status) => {
  const configs = {
    approved: {
      alertClass: 'alert-success',
      icon: '✅',
      title: 'Booking Approved!',
      message: 'Great news! Your booking has been approved. Our pet care professional will be there on time.',
    },
    rejected: {
      alertClass: 'alert-danger',
      icon: '❌',
      title: 'Booking Rejected',
      message: 'Unfortunately your booking could not be approved at this time. Please try booking for a different date or contact our support team.',
    },
    completed: {
      alertClass: 'alert-success',
      icon: '🎉',
      title: 'Service Completed!',
      message: 'We hope your pet had a wonderful time! Thank you for choosing Pet Buddy.',
    },
    cancelled: {
      alertClass: 'alert-warning',
      icon: '⚠️',
      title: 'Booking Cancelled',
      message: 'Your booking has been cancelled. If you have any questions, feel free to reach out to us.',
    },
  };

  const config = configs[status] || configs.cancelled;

  return baseLayout(`
    <div class="body">
      <div class="greeting">Hi ${userName} 👋</div>
      <p class="subtext">There's an update on your booking with Pet Buddy.</p>
      <div class="alert-box ${config.alertClass}">
        ${config.icon} <strong>${config.title}</strong> — ${config.message}
      </div>
      ${bookingDetailsCard(booking)}
      <div class="cta">
        <a href="${process.env.CLIENT_URL}/my-bookings">View My Bookings</a>
      </div>
    </div>
  `);
};

const bookingCancelledByUser = (booking, userName) =>
  baseLayout(`
    <div class="body">
      <div class="greeting">Hi ${userName} 👋</div>
      <p class="subtext">You have successfully cancelled your booking. Here are the details of the cancelled booking:</p>
      <div class="alert-box alert-warning">
        ⚠️ <strong>Booking Cancelled</strong> — If this was a mistake, please place a new booking through the app.
      </div>
      ${bookingDetailsCard(booking)}
      <div class="cta">
        <a href="${process.env.CLIENT_URL}/book">Book Again</a>
      </div>
    </div>
  `);

const bookingCancelledAdmin = (booking, userName, userEmail) =>
  baseLayout(`
    <div class="body">
      <div class="greeting">Booking Cancelled by Customer 🚫</div>
      <p class="subtext">A customer has cancelled their booking.</p>
      <div class="card">
        <div class="card-title">Customer Info</div>
        <div class="detail-row">
          <span class="detail-label">Name</span>
          <span class="detail-value">${userName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">${userEmail}</span>
        </div>
      </div>
      ${bookingDetailsCard(booking)}
      <div class="cta">
        <a href="${process.env.CLIENT_URL}/admin/bookings">Manage Bookings</a>
      </div>
    </div>
  `);

module.exports = {
  bookingConfirmationUser,
  newBookingAdmin,
  bookingStatusUpdate,
  bookingCancelledByUser,
  bookingCancelledAdmin,
};
