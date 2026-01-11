import { Phone, Mail, Globe, MapPin, Clock, Star } from "lucide-react";

const Footer = () => {
  // Contact information
  const phoneNumber = "(518) 819-9978";
  const phoneHref = "tel:5188199978";
  const email = "fairdealcarservice@gmail.com";
  const emailHref = `mailto:${email}`;
  const website = "https://www.fairdealtaxi.com";

  // Address information
  const address = {
    line1: "1 Barney Road Suite 246",
    line2: "Clifton Park, NY 12065",
    mapsUrl: "https://www.google.com/maps/search/1+Barney+Road+Suite+246+Clifton+Park+NY+12065",
  };

  // Service area
  const serviceArea = "Albany • Schenectady • Troy • Saratoga Springs";

  // Hours
  const hours = "24/7 Service";

  return (
    <footer className="bg-background border-t border-border">
      {/* Top decorative stripe */}
      <div className="taxi-stripe h-2" />

      <div className="container mx-auto px-4 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-display text-primary-foreground text-xl font-bold">FD</span>
              </div>
              <span className="font-display text-foreground text-2xl tracking-wide">FAIR DEAL CAR SERVICE</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted Car service in the Capital Region
            </p>
            <p className="text-xs text-muted-foreground">
              Serving: {serviceArea}
            </p>
          </div>

          {/* Column 2: Contact Links */}
          <div className="flex flex-col items-center md:items-start gap-3 text-sm">
            <h3 className="font-semibold text-foreground mb-1">Contact Us</h3>
            <a
              href={phoneHref}
              aria-label={`Call Fair Deal Taxi at ${phoneNumber}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              {phoneNumber}
            </a>
            <a
              href={emailHref}
              aria-label={`Email Fair Deal Taxi at ${email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 break-all"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              {email}
            </a>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Fair Deal Taxi website"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              www.fairdealcarservice.com
            </a>
          </div>

          {/* Column 3: Address & Directions */}
          <div className="flex flex-col items-center md:items-start gap-3 text-sm">
            <h3 className="font-semibold text-foreground mb-1">Address</h3>
            <address className="not-italic flex flex-col items-center md:items-start gap-2 text-muted-foreground">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <p>{address.line1}</p>
                  <p>{address.line2}</p>
                </div>
              </div>
            </address>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Fair Deal Taxi"
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors duration-300 font-semibold text-xs mt-1"
            >
              <MapPin className="w-3 h-3" />
              Get Directions
            </a>
          </div>

          {/* Column 4: Hours & Payments */}
          <div className="flex flex-col items-center md:items-start gap-4">
            {/* Hours */}
            <div className="flex flex-col items-center md:items-start gap-2 text-sm w-full">
              <h3 className="font-semibold text-foreground">Hours</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>{hours}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="w-full">
              <p className="text-xs font-semibold text-foreground mb-2">We Accept</p>
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <div className="bg-secondary/50 border border-border rounded px-2 py-1 text-xs font-semibold text-foreground hover:border-primary/50 transition-colors">
                  VISA
                </div>
                <div className="bg-secondary/50 border border-border rounded px-2 py-1 text-xs font-semibold text-foreground hover:border-primary/50 transition-colors">
                  MC
                </div>
                <div className="bg-secondary/50 border border-border rounded px-2 py-1 text-xs font-semibold text-foreground hover:border-primary/50 transition-colors">
                  AMEX
                </div>
                <div className="bg-secondary/50 border border-border rounded px-2 py-1 text-xs font-semibold text-foreground hover:border-primary/50 transition-colors">
                  DISC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} Fair Deal Car Service. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Professional taxi and car service serving the Capital Region of New York
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
