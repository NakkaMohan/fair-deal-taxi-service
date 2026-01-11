import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-taxi.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Always Available • Always On Time</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-none mb-4">
            FAIR DEAL
            <span className="block text-gradient-yellow">CAR SERVICE</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional taxi and car service in the Capital Region. 
            Fast, reliable, and always on time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {/* Call Now button - Direct phone link for immediate booking 
            <Button variant="cta" size="xl" className="animate-pulse-glow" asChild>
              <a href="tel:5188199978" className="flex items-center gap-3">
                <Phone className="w-6 h-6" />
                CALL NOW (518) 819-9978
              </a>
            </Button>
            */}
            
          </div>

          {/* Trust badges 
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Fast & Reliable Service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Professional Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Safe & Comfortable Rides</span>
            </div>
          </div>*/}
        </div>
      </div>

      {/* Bottom stripe */}
      <div className="absolute bottom-0 left-0 right-0 taxi-stripe h-3" />
    </section>
  );
};

export default Hero;
