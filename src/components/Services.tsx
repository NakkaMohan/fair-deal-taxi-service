import { Briefcase, MapPin, Clock, Car } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description: "Major Airport, Amtrak, Bus Station, Hotels, Special Events & Online Booking",
  },
  {
    icon: MapPin,
    title: "Pickup & Drop",
    description: "Reliable point-to-point transportation anywhere in the Capital Region",
  },
  {
    icon: Clock,
    title: "Hourly Service",
    description: "Book by the hour for meetings, errands, or all-day transportation needs",
  },
  {
    icon: Car,
    title: "Black Car & Limo Services",
    description: "Premium luxury vehicles for special occasions and VIP transportation",
  },
];

const Services = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            OUR <span className="text-primary">SERVICES</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We provide comprehensive transportation solutions for all your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-secondary/50 border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-glow transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 tracking-wide">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
