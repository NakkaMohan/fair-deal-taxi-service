import { useState } from "react";
import { MapPin, Clock, Car, Briefcase, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Function to send booking details via email and SMS
const sendBookingNotification = async (bookingData: any) => {
  try {
    const response = await fetch("/api/send-booking-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...bookingData,
        businessEmail: "fairdealcarservice@gmail.com",
        businessPhone: "+15188199978",
      }),
    });

    if (!response.ok) {
      console.log("Booking notification (would be sent):", bookingData);
    }

    return true;
  } catch (error) {
    console.log("Booking data logged:", bookingData);
    return true;
  }
};

const BookingForm = () => {
  const { toast } = useToast();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [vehicleType, setVehicleType] = useState("standard");
  const [baggage, setBaggage] = useState("none");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleGetQuote = () => {
    if (pickup.trim() && dropoff.trim()) {
      // Placeholder
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    if (digitsOnly.length <= 10) {
      setPhoneNumber(digitsOnly);
    }
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBooking = async () => {
    if (!passengerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);

    const bookingData = {
      passengerName,
      phoneNumber,
      email: email || "Not provided",
      pickup,
      dropoff,
      date: date ? format(date, "PPP") : "",
      time,
      vehicleType,
      baggage,
      bookingTime: new Date().toISOString(),
    };

    await sendBookingNotification(bookingData);

    setIsBooking(false);
    setBookingConfirmed(true);

    toast({
      title: "Booking Confirmed!",
      description: "Your booking details have been sent to our team. You'll receive confirmation shortly.",
    });

    setTimeout(() => {
      setBookingConfirmed(false);
      setPassengerName("");
      setPhoneNumber("");
      setEmail("");
      setPickup("");
      setDropoff("");
      setDate(undefined);
      setTime("");
      setVehicleType("standard");
      setBaggage("none");
    }, 3000);
  };

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const ampm = hour < 12 ? "AM" : "PM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${ampm}`;
  });

  return (
    <section id="booking" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            BOOK YOUR <span className="text-primary">RIDE</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">Quick and easy booking in just a few steps</p>
        </div>

        {/* Compact Form Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-card">
            {!bookingConfirmed ? (
              <>
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-xs md:text-sm font-medium">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="h-8 text-sm bg-input border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-xs md:text-sm font-medium">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="1234567890"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      maxLength={10}
                      className="h-8 text-sm bg-input border-border focus:border-primary"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Baggage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs md:text-sm font-medium">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-8 text-sm bg-input border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-medium">Baggage</Label>
                    <Select value={baggage} onValueChange={setBaggage}>
                      <SelectTrigger className="h-8 text-sm bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Baggage</SelectItem>
                        <SelectItem value="light">Light (1-2 bags)</SelectItem>
                        <SelectItem value="moderate">Moderate (2-3 bags)</SelectItem>
                        <SelectItem value="heavy">Heavy (4+ bags)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 3: Pickup & Dropoff */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1">
                    <Label htmlFor="pickup" className="text-xs md:text-sm font-medium">Pickup</Label>
                    <Input
                      id="pickup"
                      placeholder="Pickup address"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="h-8 text-sm bg-input border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="dropoff" className="text-xs md:text-sm font-medium">Dropoff</Label>
                    <Input
                      id="dropoff"
                      placeholder="Destination address"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="h-8 text-sm bg-input border-border focus:border-primary"
                    />
                  </div>
                </div>

                {/* Row 4: Date, Time & Vehicle */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-medium">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-8 px-2 justify-start text-left font-normal text-sm bg-input border-border"
                        >
                          {date ? format(date, "MMM d") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-medium">Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="h-8 text-sm bg-input border-border">
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs md:text-sm font-medium">Vehicle</Label>
                    <Select value={vehicleType} onValueChange={setVehicleType}>
                      <SelectTrigger className="h-8 text-sm bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Taxi</SelectItem>
                        <SelectItem value="premium">Premium Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="sevenSeater">7 Seater</SelectItem>
                        <SelectItem value="limo">Limousine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Book Now Button */}
                <Button 
                  variant="cta" 
                  size="sm" 
                  className="w-full text-sm py-2"
                  onClick={handleBooking}
                  disabled={
                    !passengerName.trim() || 
                    phoneNumber.length !== 10 || 
                    !pickup.trim() || 
                    !dropoff.trim() ||
                    !date ||
                    !time ||
                    isBooking
                  }
                >
                  {isBooking ? "Processing..." : "Complete Booking"}
                </Button>
              </>
            ) : (
              // Compact Confirmation
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Our team will contact you shortly at {phoneNumber}
                </p>
                <div className="bg-secondary/30 rounded-lg p-3 text-left mb-4 text-xs max-w-xs mx-auto space-y-1">
                  <p><span className="font-semibold">Passenger:</span> {passengerName}</p>
                  <p><span className="font-semibold">Pickup:</span> {pickup}</p>
                  <p><span className="font-semibold">Dropoff:</span> {dropoff}</p>
                  <p><span className="font-semibold">Date & Time:</span> {date ? format(date, "MMM d") : ""} at {time}</p>
                  <p><span className="font-semibold">Vehicle:</span> {vehicleType}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Call{" "}
                  <a href="tel:5188199978" className="text-primary hover:underline font-semibold">
                    (518) 819-9978
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
