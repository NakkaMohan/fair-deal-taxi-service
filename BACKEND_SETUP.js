/**
 * BACKEND API EXAMPLE - You'll need to set this up in your server
 * This is a guide for creating a backend endpoint to handle booking notifications
 * 
 * Technology: Node.js + Express
 * Required packages:
 * - nodemailer (for email)
 * - twilio (for SMS)
 * 
 * Installation:
 * npm install express nodemailer twilio dotenv
 */

// ============================================
// EXAMPLE: Express.js API Route (server.js)
// ============================================

/*
import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize email service (Nodemailer example with Gmail)
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Initialize SMS service (Twilio)
const twilio_client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// API Endpoint for booking notifications
app.post('/api/send-booking-notification', async (req, res) => {
  try {
    const bookingData = req.body;
    const {
      passengerName,
      phoneNumber,
      email,
      pickup,
      dropoff,
      date,
      time,
      vehicleType,
      baggage,
      estimatedFare,
    } = bookingData;

    // Prepare email content
    const emailContent = `
      <h2>New Taxi Booking Received</h2>
      <h3>Customer Information:</h3>
      <p><strong>Name:</strong> ${passengerName}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      
      <h3>Trip Details:</h3>
      <p><strong>Pickup:</strong> ${pickup}</p>
      <p><strong>Dropoff:</strong> ${dropoff}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Vehicle Type:</strong> ${vehicleType}</p>
      <p><strong>Baggage:</strong> ${baggage}</p>
      <p><strong>Estimated Fare:</strong> $${estimatedFare.toFixed(2)}</p>
      
      <p>Please contact the customer to confirm the booking.</p>
    `;

    // Send email to business owner
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL, // fairdealcarservice@gmail.com
      subject: `New Taxi Booking - ${passengerName}`,
      html: emailContent,
    });

    // Send SMS to business owner
    await twilio_client.messages.create({
      body: `Fair Deal Taxi: New booking from ${passengerName}. ${pickup} → ${dropoff}. ${date} at ${time}. Vehicle: ${vehicleType}. Est. fare: $${estimatedFare.toFixed(2)}. Call ${phoneNumber} to confirm.`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: process.env.BUSINESS_PHONE, // +15188199978
    });

    // Optional: Send confirmation email to customer
    if (email) {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Fair Deal Taxi Booking Confirmation',
        html: `
          <h2>Booking Confirmation</h2>
          <p>Thank you, ${passengerName}! Your booking has been received.</p>
          <p><strong>Pickup:</strong> ${pickup}</p>
          <p><strong>Dropoff:</strong> ${dropoff}</p>
          <p><strong>Date & Time:</strong> ${date} at ${time}</p>
          <p><strong>Vehicle:</strong> ${vehicleType}</p>
          <p><strong>Est. Fare:</strong> $${estimatedFare.toFixed(2)}</p>
          <p>We will call you shortly to confirm your booking.</p>
          <p>Fair Deal Taxi Service<br>Phone: (518) 819-9978</p>
        `,
      });
    }

    res.json({ success: true, message: 'Booking notification sent successfully' });
  } catch (error) {
    console.error('Error sending booking notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ============================================
// REQUIRED ENVIRONMENT VARIABLES (.env file)
// ============================================
/*
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
BUSINESS_EMAIL=fairdealcarservice@gmail.com
BUSINESS_PHONE=+15188199978

TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+your-twilio-number

PORT=5000
*/

