# Quick Reference - Booking Form

## 🚀 Quick Start

### To Run Locally:
```bash
cd "/Users/mohannakka/Documents/Fair Deal Taxi Service"
npm install
npm run dev
```
Open `http://localhost:5173/` and scroll to the booking form.

---

## 📋 Form Structure

```
BOOK YOUR RIDE
├── PASSENGER INFORMATION
│   ├── Full Name (required)
│   ├── Phone Number (required, 10+ digits)
│   └── Email (optional)
│
├── TRIP DETAILS
│   ├── Pickup Location (required)
│   ├── Dropoff Location (required)
│   ├── Date (required, future dates only)
│   ├── Time (required)
│   ├── Vehicle Type (required)
│   └── Baggage (required)
│
├── Get Fare Estimate (shows estimated price)
└── Complete Booking (requires all fields)
```

---

## 🎯 Key Features

| Feature | Status | Notes |
|---------|--------|-------|
| Form UI | ✅ Complete | Fully responsive |
| Validation | ✅ Complete | All fields validated |
| Baggage Column | ✅ Complete | 4 options available |
| Phone Required | ✅ Complete | 10+ digit validation |
| Email Optional | ✅ Complete | Format validation |
| Fare Estimate | ✅ Complete | Shows estimated price |
| Confirmation Screen | ✅ Complete | Shows all booking details |
| Email Notification | ⚠️ Needs Backend | See setup guide |
| SMS Notification | ⚠️ Needs Backend | See setup guide |

---

## 📞 Phone Number Examples

These are all valid:
- `5551234567` ✅
- `555-123-4567` ✅
- `(555) 123-4567` ✅
- `555 123 4567` ✅
- `+15551234567` ✅
- `555` ❌ (too short)

---

## 💼 Baggage Options

```
No Baggage        → No extra luggage
Light             → 1-2 small bags
Moderate          → 2-3 medium bags
Heavy             → 4+ bags or oversized
```

---

## 🚗 Vehicle Types

```
Standard Taxi     → $15 base + $2.50/mile
Premium Sedan     → $25 base + $3.50/mile
SUV              → $35 base + $4.00/mile
7 Seater         → $40 base + $4.50/mile
Limousine        → $50 base + $5.50/mile
```

---

## 🔄 Form Flow

1. **User fills form**
   - Enters name, phone, email
   - Selects pickup/dropoff
   - Chooses date, time, vehicle, baggage

2. **User gets estimate**
   - Clicks "Get Fare Estimate"
   - Sees estimated price
   - Can adjust selections if needed

3. **User books**
   - All fields must be filled
   - Clicks "Complete Booking"
   - Shows confirmation screen
   - Form auto-resets after 3 seconds

---

## 💾 Component Files

| File | Purpose |
|------|---------|
| `src/components/QuoteForm.tsx` | Main booking form component |
| `src/pages/Index.tsx` | Imports and displays form |
| `src/lib/sendBookingEmail.ts` | Email/SMS utilities |

---

## 🔧 API Endpoint

Currently calls: `/api/send-booking-notification`

The endpoint receives:
```json
{
  "passengerName": "John Doe",
  "phoneNumber": "555-123-4567",
  "email": "john@example.com",
  "pickup": "123 Main St",
  "dropoff": "456 Oak Ave",
  "date": "January 15, 2026",
  "time": "2:30 PM",
  "vehicleType": "premium",
  "baggage": "moderate",
  "estimatedFare": 45.50,
  "bookingTime": "2026-01-10T15:30:00Z"
}
```

---

## 🎨 UI Components Used

- Text Input fields
- Select dropdowns
- Calendar date picker
- Toast notifications
- Buttons (primary, outline, CTA)
- Icons (from lucide-react)
- Custom card layout

---

## ✨ User Feedback

| Action | Feedback |
|--------|----------|
| Invalid phone | Error toast: "Please enter valid phone (10+ digits)" |
| Missing name | Error toast: "Please enter your name" |
| Invalid email | Error toast: "Please enter valid email" |
| Booking success | Success toast + confirmation screen |
| Form submitting | Button shows "Processing..." |

---

## 🧪 Testing Checklist

- [ ] Fill form with valid data → Complete Booking works
- [ ] Leave name empty → Error message appears
- [ ] Enter 5-digit phone → Error message appears
- [ ] Enter invalid email → Error message appears
- [ ] Enter valid data → Confirmation screen shows
- [ ] Click "Get Fare Estimate" → Price displays
- [ ] Change vehicle type → Price updates
- [ ] Form resets after success → All fields cleared

---

## 📞 Support

**Questions about:**
- Form setup → See IMPLEMENTATION_SUMMARY.md
- Backend setup → See BOOKING_FORM_SETUP.md
- Code changes → This file

---

## 🔐 Validation Rules Summary

```javascript
Name: Required, non-empty
Phone: Required, 10+ digits, valid format
Email: Optional, must be valid if provided
Pickup: Required, non-empty
Dropoff: Required, non-empty
Date: Required, future dates only
Time: Required, 30-minute intervals
Vehicle: Required, one of 5 types
Baggage: Required, one of 4 options
```

---

## 📊 Booking Data Stored

Nothing is stored locally. Data is sent to backend when user clicks "Complete Booking".

---

## 🎓 To Customize

1. **Change heading text**: Edit `"BOOK YOUR RIDE"` in QuoteForm.tsx
2. **Change phone validation**: Edit `validatePhoneNumber()` function
3. **Add baggage surcharge**: Edit `calculateFare()` function
4. **Change business info**: Edit email/phone in sendBookingNotification()

---

## 🚢 Deployment

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Deploy frontend to Vercel, Netlify, etc.
4. Deploy backend to Heroku, AWS, etc.
5. Update API URL in QuoteForm.tsx

---

Last Updated: January 10, 2026
