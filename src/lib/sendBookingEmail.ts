/**
 * Send booking notification email and SMS to business owner
 * This is a placeholder for integration with email/SMS services
 * You'll need to integrate with services like:
 * - SendGrid, Mailgun, or AWS SES for email
 * - Twilio for SMS
 */

export interface BookingData {
  passengerName: string;
  phoneNumber: string;
  email: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicleType: string;
  baggage: string;
  estimatedFare: number;
  bookingTime: string;
}

export const sendBookingEmailAndSMS = async (bookingData: BookingData) => {
  try {
    // Call your backend API endpoint
    const response = await fetch("/api/send-booking-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to send notification");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending booking notification:", error);
    // Log booking data for manual review
    console.log("Booking data:", bookingData);
    return null;
  }
};

/**
 * Format booking data into a readable email template
 */
export const formatBookingEmail = (booking: BookingData): string => {
  return `
FAIR DEAL TAXI SERVICE - NEW BOOKING

Customer Information:
- Name: ${booking.passengerName}
- Phone: ${booking.phoneNumber}
- Email: ${booking.email}

Trip Details:
- Pickup Location: ${booking.pickup}
- Dropoff Location: ${booking.dropoff}
- Date: ${booking.date}
- Time: ${booking.time}
- Vehicle Type: ${booking.vehicleType}
- Baggage: ${booking.baggage}

Estimated Fare: $${booking.estimatedFare.toFixed(2)}
Booking Time: ${new Date(booking.bookingTime).toLocaleString()}

---
Please confirm this booking with the customer via phone call.
  `;
};

/**
 * Format booking data into SMS message
 */
export const formatBookingSMS = (booking: BookingData): string => {
  return `Fair Deal Taxi: New booking from ${booking.passengerName}. ${booking.pickup} -> ${booking.dropoff}. ${booking.date} at ${booking.time}. Vehicle: ${booking.vehicleType}. Est. fare: $${booking.estimatedFare.toFixed(2)}. Call ${booking.phoneNumber} to confirm.`;
};
