const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Pet Buddy" <${process.env.ZOHO_EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendMail };
