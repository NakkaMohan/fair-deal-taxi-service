# Booking Form Setup Guide

## Overview
The QuoteForm component has been transformed into a BookingForm with the following features:

### ✅ Features Implemented
1. **Passenger Information Section**
   - Full Name (required)
   - Phone Number (required with validation)
   - Email (optional with validation)

2. **Trip Details Section**
   - Pickup Location
   - Dropoff Location
   - Pickup Date (with calendar picker)
   - Pickup Time (30-min intervals)
   - Vehicle Type (Standard, Premium, SUV, 7-Seater, Limo)
   - **NEW: Baggage/Luggage Column** (None, Light, Moderate, Heavy)

3. **Booking Notifications**
   - Email sent to business owner
   - SMS text message sent to business owner
   - Confirmation email sent to passenger (optional email)

4. **Validation**
   - Phone number: minimum 10 digits
   - Email: standard format validation
   - All required fields checked before booking

5. **User Experience**
   - Fare estimate display
   - Success confirmation screen with booking summary
   - Auto-reset form after successful booking
   - Toast notifications for errors and success

---

## Setup Instructions

### Step 1: Install Backend Dependencies (Node.js/Express)

Create a new directory for your backend server:
```bash
mkdir fair-deal-server
cd fair-deal-server
npm init -y
```

Install required packages:
```bash
npm install express nodemailer twilio dotenv cors
```

### Step 2: Create Backend Server File

Create `server.js`:
```javascript
import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Email transporter setup (using Gmail)
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use app-specific password
  },
});

// Twilio setup
const twilio_client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Booking notification endpoint
app.post('/api/send-booking-notification', async (req, res) => {
  try {
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
    } = req.body;

    // Email to business owner
    const emailHTML = `
      <h2 style="color: #333;">New Taxi Booking Received</h2>
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${passengerName}</li>
        <li><strong>Phone:</strong> ${phoneNumber}</li>
        <li><strong>Email:</strong> ${email || 'Not provided'}</li>
      </ul>
      
      <h3>Trip Details:</h3>
      <ul>
        <li><strong>Pickup:</strong> ${pickup}</li>
        <li><strong>Dropoff:</strong> ${dropoff}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Vehicle Type:</strong> ${vehicleType}</li>
        <li><strong>Baggage:</strong> ${baggage}</li>
        <li><strong>Estimated Fare:</strong> $${estimatedFare.toFixed(2)}</li>
      </ul>
      
      <p><strong>Please contact the customer to confirm the booking.</strong></p>
    `;

    // Send email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      subject: `🚕 New Booking - ${passengerName}`,
      html: emailHTML,
    });

    // Send SMS
    await twilio_client.messages.create({
      body: `Fair Deal Taxi: New booking from ${passengerName}. ${pickup} → ${dropoff}. ${date} ${time}. Vehicle: ${vehicleType}. Est: $${estimatedFare.toFixed(2)}. Call ${phoneNumber}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.BUSINESS_PHONE,
    });

    // Send confirmation email to customer (if email provided)
    if (email) {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Fair Deal Taxi Booking Confirmation',
        html: `
          <h2>Booking Confirmed!</h2>
          <p>Hi ${passengerName},</p>
          <p>Thank you for booking with Fair Deal Taxi Service!</p>
          
          <h3>Your Booking Details:</h3>
          <ul>
            <li><strong>Pickup:</strong> ${pickup}</li>
            <li><strong>Dropoff:</strong> ${dropoff}</li>
            <li><strong>Date & Time:</strong> ${date} at ${time}</li>
            <li><strong>Vehicle:</strong> ${vehicleType}</li>
            <li><strong>Estimated Fare:</strong> $${estimatedFare.toFixed(2)}</li>
          </ul>
          
          <p>We will call you shortly to confirm your booking.</p>
          <p>
            Fair Deal Taxi Service<br>
            Phone: <a href="tel:+15188199978">(518) 819-9978</a>
          </p>
        `,
      });
    }

    res.json({ success: true, message: 'Booking notification sent' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Step 3: Create Environment Variables

Create `.env` file in your backend directory:
```
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Business Info
BUSINESS_EMAIL=fairdealcarservice@gmail.com
BUSINESS_PHONE=+15188199978

# Twilio Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+your-twilio-number

# Server
PORT=5000
NODE_ENV=development
```

### Step 4: Get Twilio Credentials

1. Sign up at [twilio.com](https://www.twilio.com)
2. Get your Account SID and Auth Token
3. Get a Twilio phone number
4. Add the business phone number in the `.env`

### Step 5: Get Gmail App Password

1. Enable 2-factor authentication on your Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create an app-specific password
4. Use this password in `.env` (not your regular Gmail password)

### Step 6: Update Frontend API URL

In the BookingForm component, update the API endpoint if needed. Currently it calls:
```
/api/send-booking-notification
```

If your backend runs on a different URL (e.g., `http://localhost:5000`), update the QuoteForm.tsx file:
```typescript
const response = await fetch("http://localhost:5000/api/send-booking-notification", {
```

### Step 7: Run the Backend Server

```bash
node server.js
```

You should see:
```
Server running on port 5000
```

### Step 8: Run Frontend

In another terminal, in your React project:
```bash
npm run dev
```

---

## Testing the Form

1. Open the booking form in your browser
2. Fill out all required fields:
   - Name
   - Phone number (at least 10 digits)
   - Pickup location
   - Dropoff location
   - Date and time
   - Vehicle type
   - Baggage
3. Click "Complete Booking"
4. Check your business email and phone for notifications

---

## File Changes Summary

### Modified Files:
- `src/components/QuoteForm.tsx` → Now `BookingForm` component
- `src/pages/Index.tsx` → Updated import

### New Files:
- `src/lib/sendBookingEmail.ts` → Helper utilities for email formatting
- `BACKEND_SETUP.js` → Documentation and examples

---

## Features Breakdown

### Passenger Information
- **Name**: Required field for identification
- **Phone**: Required, validated to be at least 10 digits
- **Email**: Optional, validated for proper email format

### Trip Details
- **Locations**: Pickup and dropoff addresses
- **Date & Time**: Calendar picker with disabled past dates
- **Vehicle Types**: 5 options with descriptions
- **Baggage**: 4 options (None, Light, Moderate, Heavy)

### Notifications
- **Email to Owner**: Full booking details
- **SMS to Owner**: Compact format with key info
- **Email to Customer**: Confirmation with booking summary

### Validation
- Phone: Must be 10+ digits with valid characters
- Email: Must be valid format (if provided)
- Required fields: Name, Phone, Locations, Date, Time

### Success Experience
- Confirmation screen with booking summary
- Toast notification
- Auto-reset form after 3 seconds

---

## Customization

### Change Business Email/Phone
Edit the email and SMS templates in `server.js` to reflect your actual business info.

### Modify Baggage Options
In `QuoteForm.tsx`, update the baggage select options:
```typescript
<SelectItem value="light">Light (1-2 small bags)</SelectItem>
```

### Add Price Multiplier for Baggage
Update `calculateFare()` function to add baggage surcharges:
```typescript
const baggageSurcharges: Record<string, number> = {
  none: 0,
  light: 2,
  moderate: 4,
  heavy: 6,
};
```

---

## Troubleshooting

### "Email not sending"
- Check your Gmail app-specific password is correct
- Verify 2FA is enabled on Gmail
- Check BUSINESS_EMAIL in `.env`

### "SMS not sending"
- Verify Twilio Account SID and Auth Token
- Ensure TWILIO_PHONE_NUMBER and BUSINESS_PHONE are correct
- Check Twilio account has credits

### "API endpoint not found"
- Ensure backend server is running on correct port
- Check frontend is calling correct API URL
- Verify CORS is enabled in backend

---

## Next Steps

1. Set up backend server with Node.js
2. Configure email and SMS services
3. Test the form
4. Deploy backend to hosting (Heroku, AWS, etc.)
5. Update frontend API URL for production
